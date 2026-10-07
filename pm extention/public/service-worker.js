/* global chrome */

console.log("Password Manager content script loaded");

const WEBSITE_LOGIN_URL =
    "http://localhost:5173/login";



async function getAccessToken() {
    const result = await chrome.storage.local.get(
        "accessToken"
    );

    return result.accessToken || null;
}


const API_BASE_URL = "https://password-management-yiv9.onrender.com/api";
// TEMPORARY


chrome.runtime.onMessage.addListener(
    (message, sender, sendResponse) => {

        if (message.type === "START_LOGIN") {

            startLogin()
                .then((result) => {

                    const response = {
                        success: true,
                        ...result
                    };

                    console.log(
                        "[Auth] Sending response to popup:",
                        response
                    );

                    sendResponse(response);


                })
                .catch((error) => {

                    console.error(
                        "[Auth] Login failed:",
                        error
                    );

                    sendResponse({
                        success: false,
                        error: error.message
                    });

                });

            return true;
        }

        if (message.type === "SAVE_VAULT_ITEM") {

            saveVaultItem(message.item)
                .then((item) => {

                    sendResponse({
                        success: true,
                        item
                    });

                })
                .catch((error) => {

                    console.error(
                        "Failed to save vault item:",
                        error
                    );

                    sendResponse({
                        success: false,
                        error: error.message
                    });

                });

            return true;
        }


        if (message.type === "GET_WEBSITE_CREDENTIALS") {
            const token = getAccessToken();

            if (!token) {

                sendResponse({
                    success: false,
                    authenticated: false,
                    items: []
                });

                return;
            }

            getWebsiteCredentials(message.website)
                .then((credentials) => {
                    sendResponse({
                        success: true,
                        credentials
                    });
                })
                .catch((error) => {
                    console.error(
                        "Failed to get credentials:",
                        error
                    );

                    sendResponse({
                        success: false,
                        credentials: [],
                        error: error.message
                    });
                });

            // Important because getWebsiteCredentials is async
            return true;
        }


        if (message.type === "SET_PENDING_SAVE") {
            // Stashed here (rather than in the content script) because a
            // login submit very often triggers a full page navigation,
            // which tears down the content script before it could show
            // the "save this password?" popup itself.
            chrome.storage.local.set({ pendingSave: message.data }, () => {
                sendResponse({ success: true });
            });

            return true;
        }


        if (message.type === "GET_PENDING_SAVE") {
            chrome.storage.local.get("pendingSave", (result) => {
                const pending = result.pendingSave ?? null;

                const matches =
                    pending &&
                    normalizeHostname(pending.website) === normalizeHostname(message.website);

                sendResponse({
                    success: true,
                    pending: matches ? pending : null
                });
            });

            return true;
        }


        if (message.type === "CLEAR_PENDING_SAVE") {
            chrome.storage.local.remove("pendingSave", () => {
                sendResponse({ success: true });
            });

            return true;
        }
    }
);


async function startLogin() {

    console.log(
        "[Auth] Starting extension login..."
    );

    const redirectUri =
        chrome.identity.getRedirectURL(
            "callback"
        );

    console.log(
        "[Auth] Redirect URI:",
        redirectUri
    );

    const params =
        new URLSearchParams({
            source: "extension",
            redirect_uri: redirectUri
        });

    const loginUrl =
        `${WEBSITE_LOGIN_URL}?${params.toString()}`;

    console.log(
        "[Auth] Opening website:",
        loginUrl
    );

    const responseUrl =
        await chrome.identity.launchWebAuthFlow({
            url: loginUrl,
            interactive: true
        });

    console.log(
        "[Auth] Authentication completed."
    );

    console.log(
        "[Auth] Response URL:",
        responseUrl
    );

    if (!responseUrl) {
        throw new Error(
            "No response received from authentication."
        );
    }

    const callbackUrl =
        new URL(responseUrl);

    const error =
        callbackUrl.searchParams.get(
            "error"
        );

    if (error) {

        const description =
            callbackUrl.searchParams.get(
                "error_description"
            );

        throw new Error(
            description || error
        );
    }

    const code =
        callbackUrl.searchParams.get(
            "code"
        );

    if (!code) {
        throw new Error(
            "Authorization code was not returned."
        );
    }

    console.log(
        "[Auth] Authorization code received."
    );

    const token =
        await exchangeCodeForToken(code);

    await chrome.storage.local.set({
        accessToken: token
    });

    console.log(
        "[Auth] Access token stored."
    );

    return {
        authenticated: true
    };
}

async function exchangeCodeForToken(code) {

    console.log(
        "[Auth] Exchanging authorization code..."
    );

    const response =
        await fetch(
            `${API_BASE_URL}/auth/exchange-code-to-token`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    code
                })
            }
        );

    let result;

    try {
        result =
            await response.json();

    } catch (error) {

        throw new Error(
            "Invalid response from token exchange API.", error?.message
        );
    }

    console.log(
        "[Auth] Exchange response:",
        {
            success: result?.success,
            message: result?.message
        }
    );

    if (
        !response.ok ||
        !result?.success
    ) {

        throw new Error(
            result?.message ||
            "Token exchange failed."
        );
    }

    if (!result?.data) {
        throw new Error(
            "Token was not returned by the server."
        );
    }

    return result.data;
}


async function saveVaultItem(item) {
    const AUTH_TOKEN = await getAccessToken();
    if (!AUTH_TOKEN) {
        throw new Error(
            "Access token is missing. User may not be logged in."
        );
    }
    const response = await fetch(
        `${API_BASE_URL}/vault/create-vault-item`,
        {
            method: "POST",

            headers: {
                Authorization:
                    `Bearer ${AUTH_TOKEN}`,

                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({
                name: item.name,
                website: item.website,
                username: item.username,
                password: item.password,
                two_fa_enabled: false,
                notes: item.notes ?? ""
            })
        }
    );


    if (!response.ok) {

        const errorText =
            await response.text();

        throw new Error(
            `Save failed: ${response.status} ${errorText}`
        );
    }


    return response.json();
}


// get creds for the current website

async function getWebsiteCredentials(website) {
    const AUTH_TOKEN = await getAccessToken();
    if (!AUTH_TOKEN) {
        throw new Error(
            "Access token is missing. User may not be logged in."
        );
    }
    const response = await fetch(
        `${API_BASE_URL}/vault/get-all-vault?page=1&limit=100`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${AUTH_TOKEN}`,
                "Content-Type": "application/json"
            }
        }
    );

    if (!response.ok) {
        throw new Error(
            `Vault API failed: ${response.status}`
        );
    }
    const result = await response.json();

    const items = result?.data?.items ?? [];

    console.log(
        "Vault items received:",
        items
    );


    // Filter credentials for current website
    const matchingItems =
        filterVaultItems(items, website);


    // Only send fields content.js actually needs
    return prepareCredentials(matchingItems);
}


// normalize website
function normalizeHostname(value) {

    if (!value) {
        return "";
    }

    try {

        const url = new URL(
            value.startsWith("http")
                ? value
                : `https://${value}`
        );

        return url.hostname
            .toLowerCase()
            .replace(/^www\./, "");

    } catch {

        return "";
    }
}


// filter vault item
function filterVaultItems(items, website) {

    const currentHostname =
        normalizeHostname(website);

    return items.filter((item) => {

        const savedHostname =
            normalizeHostname(item.website);

        return savedHostname === currentHostname;
    });
}


// remove sensitive fields
function prepareCredentials(items) {

    return items.map((item) => ({
        id: item.id,
        name: item.name,
        username: item.username,
        password: item.password
    }));
}