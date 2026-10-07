import { createContext, useContext } from "react";

export const GoogleItemsContext = createContext(null);

export function useGoogleItems() {
    const context = useContext(GoogleItemsContext);

    if (!context) {
        throw new Error("useGoogleItems must be used within a GoogleProvider");
    }

    return context;
}