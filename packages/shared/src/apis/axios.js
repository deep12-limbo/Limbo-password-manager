import axios from "axios";
import { apis_urls } from "./api";

export async function getAccessToken() {
    const result = await chrome.storage.local.get(
        "accessToken"
    );

    console.log("[Axios] Storage result:", result);

    return result.accessToken || null;
}

const axios_instance = axios.create({
    baseURL: apis_urls.base,
});

axios_instance.interceptors.request.use(
    async (config) => {

        console.log("[Axios] Request interceptor running");

        config.headers["ngrok-skip-browser-warning"] = "true";

        const token = await getAccessToken();

        console.log("[Axios] Access token:", token);

        if (token) {
            config.headers.Authorization =
                `Bearer ${token}`;
        }

        console.log(
            "[Axios] Final headers:",
            config.headers
        );

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

export default axios_instance;