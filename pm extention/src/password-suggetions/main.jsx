import { createRoot } from "react-dom/client";
import App from "./App";

let root = null;
let container = null;

function createContainer() {
    if (container) {
        return;
    }

    container = document.createElement("div");

    container.id = "password-manager-suggestions-root";

    container.style.position = "fixed"; 
    container.style.zIndex = "2147483647";
    container.style.display = "none";

    document.body.appendChild(container);

    root = createRoot(container);
}

function show(credentials, anchorElement) {
    createContainer();

    container.style.display = "block";

    root.render(
        <App
            credentials={credentials}
            anchorElement={anchorElement}
            onClose={hide}
        />
    );
}

function hide() {
    if (!container) {
        return;
    }

    container.style.display = "none";

    root.render(null);
}

window.PasswordManagerUI = {
    show,
    hide,
};

console.log("[PM Password Suggestions] React UI loaded");