import axios from "axios";
import { apis_urls } from "./api";
import { getLocalStorage } from "../utils/localstorage";

const axios_instance = axios.create({
    baseURL: apis_urls.base,
});

axios_instance.interceptors.request.use(
    (config) => {
        // Add ngrok bypass header
        config.headers["ngrok-skip-browser-warning"] = "true";

        // Add authentication token
        const token = getLocalStorage("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        console.log("Final headers:", config.headers);

        return config;
    },
    (error) => Promise.reject(error)
);

export default axios_instance;