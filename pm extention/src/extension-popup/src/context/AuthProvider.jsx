import { useEffect, useState } from "react";
import { AuthContext } from "./auth";
import {
    parseJwt,
    removeFromLocalStorage,
} from "@pm/shared";

async function getAccessToken() {
    // For testing purposes, return a hardcoded token
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3OTEyNjk1MDAsImlhdCI6MTc5MTE4MzEwMCwidXNlcl9pZCI6ImVlYjYzOGZmLTkwNjItNGNjMy1hYjVjLWM3NjNmYTlkNTllYSJ9.CkFEmwi53-bQ3PYeiqkygrgNIrjMEFy86YnZFmlVNC0"
    // return token;

    const result = await chrome.storage.local.get(
        "accessToken"
    );
    console.log("result", result);

    return result.accessToken || null;
}

export function AuthProvider({ children }) {

    const [isLoading, setIsLoading] = useState(true);

    const [isAuthenticated, setIsAuthenticated] =
        useState(false);

    const [token, setToken] = useState(null);

    const [isLoggedIn, setIsLoggedIn] =
        useState(false);

    const [email, setEmail] = useState("");

    const [jwt, setJwt] = useState(null);


    // --------------------------------
    // Load token when popup starts
    // --------------------------------

    useEffect(() => {

        async function initializeAuth() {

            try {

                const accessToken =
                    await getAccessToken();

                // No token
                if (!accessToken) {

                    setToken(null);
                    setJwt(null);
                    setIsAuthenticated(false);
                    setIsLoggedIn(false);

                    return;
                }


                // Parse JWT
                const parsedJwt =
                    parseJwt(accessToken);

                console.log(
                    "[Auth] Parsed JWT:",
                    parsedJwt
                );


                // Invalid JWT
                if (parsedJwt.error) {

                    console.error(
                        "[Auth]",
                        parsedJwt.error
                    );

                    await logout();

                    return;
                }


                // Expired JWT
                if (parsedJwt.isExpired) {

                    console.log(
                        "[Auth] Token expired"
                    );

                    await logout();

                    return;
                }


                // Valid token
                setToken(accessToken);
                setJwt(parsedJwt);

                setIsAuthenticated(true);
                setIsLoggedIn(true);

            } catch (error) {

                console.error(
                    "[Auth] Failed to initialize:",
                    error
                );

                setToken(null);
                setJwt(null);
                setIsAuthenticated(false);
                setIsLoggedIn(false);

            } finally {

                // VERY IMPORTANT
                setIsLoading(false);
            }
        }


        initializeAuth();

    }, []);


    // --------------------------------
    // Login
    // --------------------------------

    const login = () => {

        // Mark authentication as in progress
        setIsLoading(true);

        return new Promise((resolve, reject) => {

            chrome.runtime.sendMessage(
                {
                    type: "START_LOGIN"
                },
                async (response) => {
                    console.log("[Auth] Login response check:", response);
                    console.log(
                        "[Auth] FULL RESPONSE:",
                        response
                    );

                    console.log(
                        "[Auth] TYPE:",
                        typeof response
                    );

                    console.log(
                        "[Auth] SUCCESS:",
                        response?.success
                    );

                    console.log(
                        "[Auth] AUTHENTICATED:",
                        response?.authenticated
                    );

                    console.log(
                        "[Auth] LAST ERROR:",
                        chrome.runtime.lastError
                    );


                    // Chrome messaging error
                    if (chrome.runtime.lastError) {

                        const error =
                            new Error(
                                chrome.runtime.lastError.message
                            );

                        console.error(
                            "[Extension Auth]",
                            error
                        );

                        setIsAuthenticated(false);
                        setIsLoggedIn(false);

                        setIsLoading(false);

                        reject(error);

                        return;
                    }


                    // Service worker returned an error
                    if (!response?.success) {

                        const error =
                            new Error(
                                response?.error ||
                                "Login failed"
                            );

                        console.error(
                            "[Extension Auth]",
                            error
                        );

                        setIsAuthenticated(false);
                        setIsLoggedIn(false);

                        setIsLoading(false);

                        reject(error);

                        return;
                    }


                    try {
                        console.log("check : ", response, "response?.accessToken : ", response?.accessToken);

                        console.log(
                            "[Auth] Login successful."
                        );


                        // --------------------------------
                        // Get token from Chrome storage
                        // --------------------------------

                        const accessToken =
                            await getAccessToken();


                        if (!accessToken) {

                            throw new Error(
                                "Access token was not stored."
                            );
                        }


                        console.log(
                            "[Auth] Access token retrieved."
                        );


                        // --------------------------------
                        // Parse JWT
                        // --------------------------------

                        const parsedJwt =
                            parseJwt(accessToken);


                        if (parsedJwt.error) {

                            throw new Error(
                                parsedJwt.error
                            );
                        }


                        // --------------------------------
                        // Check expiry
                        // --------------------------------

                        if (parsedJwt.isExpired) {

                            throw new Error(
                                "Received token is already expired."
                            );
                        }


                        // --------------------------------
                        // Update React Auth Context
                        // --------------------------------

                        setToken(accessToken);

                        setJwt(parsedJwt);

                        setIsAuthenticated(true);

                        setIsLoggedIn(true);


                        console.log(
                            "[Auth] React auth state updated."
                        );


                        // --------------------------------
                        // Login complete
                        // --------------------------------

                        setIsLoading(false);

                        resolve(accessToken);

                    } catch (error) {

                        console.error(
                            "[Auth] Failed after login:",
                            error
                        );


                        setToken(null);

                        setJwt(null);

                        setIsAuthenticated(false);

                        setIsLoggedIn(false);

                        setIsLoading(false);

                        reject(error);
                    }
                }
            );
        });
    };


    // --------------------------------
    // Logout
    // --------------------------------

    async function logout() {

        await chrome.storage.local.remove(
            "accessToken"
        );

        setToken(null);
        setJwt(null);
        setEmail("");
        setIsLoggedIn(false);
        setIsAuthenticated(false);

        removeFromLocalStorage("token");
    }


    return (
        <AuthContext.Provider
            value={{
                token,
                jwt,
                email,

                isLoggedIn,
                isAuthenticated,

                isLoading,

                login,
                logout,

                setIsAuthenticated
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}