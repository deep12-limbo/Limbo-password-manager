console.log("%c[PM Content Script] Initializing...", "color: #0088cc; font-weight: bold;");

/* global chrome */

// ----------------------------------------
// State
// ----------------------------------------

let currentCredentials = [];
let currentLoginForm = null;
let submitListenerAttached = false;
let stylesInjected = false;

// ----------------------------------------
// Styles (namespaced so we don't collide with host page CSS)
// ----------------------------------------

function injectStyles() {
    if (stylesInjected) return;
    stylesInjected = true;

    const style = document.createElement("style");
    style.id = "pmext-styles";
    style.textContent = `
        .pmext-suggestion-box {
            position: absolute;
            z-index: 2147483647;
            background: #ffffff;
            border: 1px solid #d9dde3;
            border-radius: 8px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.15);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            font-size: 13px;
            color: #1f2430;
            overflow: hidden;
            min-width: 220px;
            max-width: 320px;
        }
        .pmext-suggestion-header {
            padding: 8px 12px;
            font-size: 11px;
            font-weight: 600;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.03em;
            border-bottom: 1px solid #eef0f3;
            background: #f9fafb;
        }
        .pmext-suggestion-item {
            display: flex;
            flex-direction: column;
            gap: 2px;
            padding: 10px 12px;
            cursor: pointer;
        }
        .pmext-suggestion-item:hover {
            background: #f2f5ff;
        }
        .pmext-suggestion-item + .pmext-suggestion-item {
            border-top: 1px solid #eef0f3;
        }
        .pmext-suggestion-name {
            font-weight: 600;
            color: #1f2430;
        }
        .pmext-suggestion-username {
            color: #6b7280;
            font-size: 12px;
        }
        .pmext-tooltip {
            position: absolute;
            z-index: 2147483647;
            background: #1f2430;
            color: #ffffff;
            padding: 6px 10px;
            border-radius: 6px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            font-size: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .pmext-save-prompt {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 2147483647;
            width: 300px;
            background: #ffffff;
            border: 1px solid #d9dde3;
            border-radius: 10px;
            box-shadow: 0 12px 32px rgba(0,0,0,0.2);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            color: #1f2430;
            overflow: hidden;
        }
        .pmext-save-prompt-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 14px 4px 14px;
        }
        .pmext-save-prompt-title {
            font-weight: 600;
            font-size: 14px;
        }
        .pmext-save-prompt-close {
            cursor: pointer;
            border: none;
            background: transparent;
            font-size: 16px;
            line-height: 1;
            color: #9aa1ac;
            padding: 2px 4px;
        }
        .pmext-save-prompt-close:hover {
            color: #1f2430;
        }
        .pmext-save-prompt-body {
            padding: 4px 14px 12px 14px;
            font-size: 13px;
            color: #4b5563;
        }
        .pmext-save-prompt-user {
            font-weight: 600;
            color: #1f2430;
            word-break: break-all;
        }
        .pmext-save-prompt-actions {
            display: flex;
            gap: 8px;
            padding: 0 14px 14px 14px;
        }
        .pmext-btn {
            flex: 1;
            padding: 8px 10px;
            border-radius: 6px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            border: 1px solid transparent;
            text-align: center;
        }
        .pmext-btn-primary {
            background: #2563eb;
            color: #ffffff;
        }
        .pmext-btn-primary:hover {
            background: #1d4ed8;
        }
        .pmext-btn-secondary {
            background: #ffffff;
            color: #374151;
            border-color: #d9dde3;
        }
        .pmext-btn-secondary:hover {
            background: #f3f4f6;
        }
        .pmext-save-prompt-error {
            padding: 0 14px 12px 14px;
            font-size: 12px;
            color: #dc2626;
        }
        .pmext-btn[disabled] {
            opacity: 0.6;
            cursor: default;
        }
    `;
    document.head.appendChild(style);
}

// ----------------------------------------
// Popup cleanup helpers
// ----------------------------------------

function removeSuggestionBox() {
    const el = document.getElementById("pmext-suggestion-box");
    if (el) el.remove();
}

function removeTooltip() {
    const el = document.getElementById("pmext-tooltip");
    if (el) el.remove();
}

function removeSavePrompt() {
    const el = document.getElementById("pmext-save-prompt");
    if (el) el.remove();
}


function positionBelow(anchorEl, boxEl) {
    const rect = anchorEl.getBoundingClientRect();
    boxEl.style.top = `${window.scrollY + rect.bottom + 6}px`;
    boxEl.style.left = `${window.scrollX + rect.left}px`;
}


// ----------------------------------------
// Find login form
// ----------------------------------------

function findLoginForm() {
    console.groupCollapsed("%c[PM Content Script] Running findLoginForm()", "color: #e67e22;");

    const passwordInput = document.querySelector(
        'input[name="password"], input[type="password"]'
    );
    console.log("-> Querying for input[name=\"password\"]:", passwordInput);

    if (!passwordInput) {
        console.warn("❌ [findLoginForm] Password input not found.");
        console.groupEnd();
        return null;
    }

    const form = passwordInput.closest("form");
    console.log("-> Looking up closest <form> container:", form);

    if (!form) {
        console.warn("❌ [findLoginForm] Password field is not wrapped inside a <form> element.");
        console.groupEnd();
        return null;
    }

    const usernameSelectors = [
        'input[type="email"]',
        'input[type="text"]',
        'input[name*="user" i]',
        'input[name*="email" i]',
        'input[name*="login" i]',
        'input[autocomplete="username"]'
    ].join(",");

    const usernameInput = form.querySelector(usernameSelectors);

    if (!usernameInput) {
        console.warn("❌ [findLoginForm] No matching username/email field found.");
        console.groupEnd();
        return null;
    }

    console.log("🎉 [findLoginForm] Success! Full form target captured.");
    console.groupEnd();

    return { form, usernameInput, passwordInput };
}

// ----------------------------------------
// Ask service worker for credentials
// ----------------------------------------

function getWebsiteCredentials() {
    const website = window.location.origin;
    console.group("%c[PM Content Script] getWebsiteCredentials()", "color: #2980b9;");
    console.log("Target Origin:", website);

    chrome.runtime.sendMessage({ type: "GET_WEBSITE_CREDENTIALS", website }, (response) => {

        if (chrome.runtime.lastError) {
            console.error("❌ Extension communication error:", chrome.runtime.lastError.message);
            console.groupEnd();
            return;
        }
        // User is not logged in
        if (response?.authenticated === false) {

            showLoginPopup();

            return;
        }


        if (!response?.success) {
            console.error("❌ Service worker responded with unfulfilled request:", response);
            console.groupEnd();
            return;
        }


        console.log("✅ Credentials received:", response.credentials);
        handleCredentials(response.credentials);
        console.groupEnd();
    });
}


function showLoginPopup() {

    // Don't create multiple popups
    if (document.getElementById(
        "password-manager-login-popup"
    )) {
        return;
    }


    const popup =
        document.createElement("div");

    popup.id =
        "password-manager-login-popup";


    popup.innerHTML = `
        <div class="pm-login-popup-content">

            <div class="pm-login-popup-title">
                Password Manager
            </div>

            <div class="pm-login-popup-message">
                Please log in to your Password Manager
                to use saved credentials.
            </div>

        

        </div>
    `;


    document.body.appendChild(popup);


    const loginButton =
        popup.querySelector(
            "#pm-login-button"
        );


    loginButton.addEventListener(
        "click",
        () => {

            chrome.runtime.sendMessage({
                type: "OPEN_LOGIN"
            });

            popup.remove();
        }
    );


    setTimeout(() => {

        if (popup.isConnected) {
            popup.remove();
        }

    }, 5000);
}


// ----------------------------------------
// Fill form from a credential
// ----------------------------------------

function fillCredential(credential) {
    if (!currentLoginForm) return;

    const { usernameInput, passwordInput } = currentLoginForm;

    usernameInput.value = credential.username;
    passwordInput.value = credential.password;

    usernameInput.dispatchEvent(new Event("input", { bubbles: true }));
    usernameInput.dispatchEvent(new Event("change", { bubbles: true }));
    passwordInput.dispatchEvent(new Event("input", { bubbles: true }));
    passwordInput.dispatchEvent(new Event("change", { bubbles: true }));

    console.log("✅ Credentials autofilled:", credential.username);

    removeSuggestionBox();
    removeTooltip();
}

// Keep supporting the custom-event fill mechanism too, in case anything
// else in the extension wants to trigger a fill this way.
window.addEventListener("password-manager-fill", (event) => {
    fillCredential(event.detail);
});

// ----------------------------------------
// Suggestion / tooltip UI on username focus
// ----------------------------------------

function showCredentialSuggestions(usernameInput, credentials) {
    removeSuggestionBox();
    removeTooltip();
    injectStyles();

    const box = document.createElement("div");
    box.id = "pmext-suggestion-box";
    box.className = "pmext-suggestion-box";

    const header = document.createElement("div");
    header.className = "pmext-suggestion-header";
    header.textContent = credentials.length > 1 ? "Choose an account" : "Saved login";
    box.appendChild(header);

    credentials.forEach((credential) => {
        const item = document.createElement("div");
        item.className = "pmext-suggestion-item";

        const name = document.createElement("div");
        name.className = "pmext-suggestion-name";
        name.textContent = credential.name || credential.username;

        const username = document.createElement("div");
        username.className = "pmext-suggestion-username";
        username.textContent = credential.username;

        item.appendChild(name);
        item.appendChild(username);

        item.addEventListener("mousedown", (e) => {
            // mousedown (not click) fires before the input's blur wipes the box
            e.preventDefault();
            fillCredential(credential);
        });

        box.appendChild(item);
    });

    document.body.appendChild(box);
    positionBelow(usernameInput, box);
}

function showNoCredentialsTooltip(usernameInput) {
    removeSuggestionBox();
    removeTooltip();
    injectStyles();

    const tooltip = document.createElement("div");
    tooltip.id = "pmext-tooltip";
    tooltip.className = "pmext-tooltip";
    tooltip.textContent = "No saved login for this site";

    document.body.appendChild(tooltip);
    positionBelow(usernameInput, tooltip);

    // Auto-dismiss after a few seconds so it doesn't linger.
    setTimeout(() => {
        if (tooltip.isConnected) tooltip.remove();
    }, 3000);
}

function handleUsernameFocus() {
    console.log("Username field focused");

    if (currentCredentials.length) {
        showCredentialSuggestions(currentLoginForm.usernameInput, currentCredentials);
    } else {
        showNoCredentialsTooltip(currentLoginForm.usernameInput);
    }
}



function setupCredentialFocusListener() {
    if (!currentLoginForm) return;

    const { usernameInput } = currentLoginForm;

    if (usernameInput.dataset.passwordManagerListener === "true") return;
    usernameInput.dataset.passwordManagerListener = "true";

    usernameInput.addEventListener("focus", handleUsernameFocus);
}

document.addEventListener("mousedown", (e) => {
    const suggestion = document.getElementById("pmext-suggestion-box");
    const tooltip = document.getElementById("pmext-tooltip");

    if (suggestion && !suggestion.contains(e.target) && e.target !== currentLoginForm?.usernameInput) {
        suggestion.remove();
    }
    if (tooltip && !tooltip.contains(e.target) && e.target !== currentLoginForm?.usernameInput) {
        tooltip.remove();
    }
});

// ----------------------------------------
// Handle returned credentials
// ----------------------------------------

function handleCredentials(credentials) {
    console.group("%c[PM Content Script] handleCredentials()", "color: #27ae60;");
    console.log("Evaluating received credentials:", credentials);

    currentCredentials = credentials ?? [];

    if (!currentCredentials.length) {
        console.log("No saved credentials for this website.");
    } else {
        console.log(`Found ${currentCredentials.length} credentials`);
    }

    setupCredentialFocusListener();
    console.groupEnd();
}

// ----------------------------------------
// Save-prompt: shown after a form submit that isn't already saved
// ----------------------------------------

function showSavePrompt(pending) {
    removeSavePrompt();
    injectStyles();

    let hostname = pending.website;
    try {
        hostname = new URL(pending.website).hostname;
    } catch {
        /* keep raw value */
    }

    const prompt = document.createElement("div");
    prompt.id = "pmext-save-prompt";
    prompt.className = "pmext-save-prompt";

    prompt.innerHTML = `
        <div class="pmext-save-prompt-header">
            <div class="pmext-save-prompt-title">Save password?</div>
            <button class="pmext-save-prompt-close" type="button" aria-label="Dismiss">&times;</button>
        </div>
        <div class="pmext-save-prompt-body">
            Save login for <span class="pmext-save-prompt-user">${escapeHtml(hostname)}</span> as
            <span class="pmext-save-prompt-user">${escapeHtml(pending.username)}</span>?
        </div>
        <div class="pmext-save-prompt-actions">
            <button type="button" class="pmext-btn pmext-btn-secondary" data-action="never">Never</button>
            <button type="button" class="pmext-btn pmext-btn-primary" data-action="save">Save</button>
        </div>
    `;

    document.body.appendChild(prompt);

    const closeBtn = prompt.querySelector(".pmext-save-prompt-close");
    const neverBtn = prompt.querySelector('[data-action="never"]');
    const saveBtn = prompt.querySelector('[data-action="save"]');

    const dismiss = () => {
        chrome.runtime.sendMessage({ type: "CLEAR_PENDING_SAVE" });
        removeSavePrompt();
    };

    closeBtn.addEventListener("click", dismiss);
    neverBtn.addEventListener("click", dismiss);

    saveBtn.addEventListener("click", () => {
        saveBtn.disabled = true;
        neverBtn.disabled = true;
        saveBtn.textContent = "Saving...";

        const existingError = prompt.querySelector(".pmext-save-prompt-error");
        if (existingError) existingError.remove();

        chrome.runtime.sendMessage(
            {
                type: "SAVE_VAULT_ITEM",
                item: {
                    name: hostname,
                    website: pending.website,
                    username: pending.username,
                    password: pending.password,
                    notes: ""
                }
            },
            (response) => {
                if (chrome.runtime.lastError || !response?.success) {
                    saveBtn.disabled = false;
                    neverBtn.disabled = false;
                    saveBtn.textContent = "Save";

                    const error = document.createElement("div");
                    error.className = "pmext-save-prompt-error";
                    error.textContent = response?.error || "Something went wrong. Try again.";
                    prompt.appendChild(error);
                    return;
                }

                chrome.runtime.sendMessage({ type: "CLEAR_PENDING_SAVE" });
                // Refresh the credential list so this site is now recognized as saved.
                getWebsiteCredentials();

                saveBtn.textContent = "Saved ✓";
                setTimeout(() => removeSavePrompt(), 900);
            }
        );
    });
}

function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str ?? "";
    return div.innerHTML;
}

// ----------------------------------------
// Submit detection -> stash pending save (survives navigation)
// ----------------------------------------

function attachSubmitListener() {
    if (!currentLoginForm || submitListenerAttached) return;

    currentLoginForm.form.addEventListener("submit", handleFormSubmit, true);
    submitListenerAttached = true;
}

function handleFormSubmit() {
    if (!currentLoginForm) return;

    const username = currentLoginForm.usernameInput.value;
    const password = currentLoginForm.passwordInput.value;

    if (!username || !password) return;

    const alreadySaved = currentCredentials.some(
        (c) => c.username === username && c.password === password
    );

    if (alreadySaved) {
        console.log("[PM Content Script] Credentials already saved, skipping save prompt.");
        return;
    }

    const pending = {
        website: window.location.origin,
        username,
        password
    };

    // Stored on the background side because the page is very likely about
    // to navigate/reload as part of the login, which destroys this content
    // script instance before we could show a popup here.
    chrome.runtime.sendMessage({ type: "SET_PENDING_SAVE", data: pending });
}

function checkPendingSave() {
    chrome.runtime.sendMessage(
        { type: "GET_PENDING_SAVE", website: window.location.origin },
        (response) => {
            if (chrome.runtime.lastError) return;
            if (response?.success && response.pending) {
                showSavePrompt(response.pending);
            }
        }
    );
}

// ----------------------------------------
// Detect login form
// ----------------------------------------

function checkForLoginForm() {
    const loginForm = findLoginForm();

    if (!loginForm) {
        console.log("ℹ️ [checkForLoginForm] No valid login form detected on current check.");
        return;
    }

    currentLoginForm = loginForm;
    console.log("%c✅ [checkForLoginForm] Login form successfully detected!", "color: #2ecc71; font-weight: bold;");

    attachSubmitListener();
    getWebsiteCredentials();
}

// ----------------------------------------
// Initial checks
// ----------------------------------------

injectStyles();
checkForLoginForm();
checkPendingSave();

window.addEventListener("pmext:route-change", checkPendingSave);

// ----------------------------------------
// Detect dynamically created forms 
// ----------------------------------------

let mutationCheckCount = 0;

const observer = new MutationObserver(() => {
    mutationCheckCount++;

    const loginForm = findLoginForm();
    if (!loginForm) return;

    const isNewForm = loginForm.form !== currentLoginForm?.form;
    currentLoginForm = loginForm;

    if (isNewForm) {
        submitListenerAttached = false;

    }

    if (isNewForm) {
        console.log(`%c[MutationObserver #${mutationCheckCount}] Dynamic login form detected!`, "color: #2ecc71; font-weight: bold;");
        // console.log(`%c[checking pending state inside mutation ovserver`, "color: #2ecc71; font-weight: bold;");
        getWebsiteCredentials();
        // checkPendingSave();

    }
    attachSubmitListener();

    // if (isNewForm) {
    //     console.log(`%c[MutationObserver #${mutationCheckCount}] Dynamic login form detected!`, "color: #2ecc71; font-weight: bold;");
    //     getWebsiteCredentials();
    // }
});

if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
    console.log("✅ [MutationObserver] Attached and actively watching document.body.");
} else {
    console.error("❌ [MutationObserver] document.body is missing! Observer could not be attached.");
}