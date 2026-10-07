import { useState } from "react";
import { UserContext } from "./usercontext";

export function UserProvider({ children }) {
    const [token, setToken] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState("");

    const [isExtensionAuth , setIsExtensionAuth] = useState(false);

    
    const login = ({ token, email }) => {
        setToken(token);
        setEmail(email);
        setIsLoggedIn(true);
    };

    const logout = () => {
        setToken("");
        setEmail("");
        setIsLoggedIn(false);
    };

    return (
        <UserContext.Provider
            value={{
                token,
                isLoggedIn,
                email,


                login,
                logout,
            }}
        >
            {children}
        </UserContext.Provider>


    );
}

