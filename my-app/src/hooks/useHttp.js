import { useState } from "react";
import axios_instance from "../apis/axios";

export default function useHttp() {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = async (
        url,
        method = "GET",
        body = null,
        headers = {},
        rawHeader = null
    ) => {
        setLoading(true);
        setError(null);


        try {
            const response = await axios_instance({
                url,
                method,
                data: body,
                headers: {
                    "Content-Type": "application/json",
                    ...headers,
                },
            });

            // Axios response body
            const responseData = response.data;
            // console.log("FULL AXIOS RESPONSE:", response);
            // console.log("RESPONSE.DATA:", response?.data);
            // console.log("RESPONSE.DATA.DATA:", response?.data?.data) ;

            if (responseData.success === true) {
                setData(responseData.data ?? null);
            }

            // IMPORTANT:
            // Return the API response so handlers can use it immediately.
            return responseData;
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "An error occurred while fetching data.";

            setError(message);

            // Optional but useful for your handlers
            return error.response?.data || null;
        } finally {
            setLoading(false);
        }


    };

    return {
        data,
        isLoading,
        error,
        setData,
        setLoading,
        setError,
        sendRequest,
    };
}
