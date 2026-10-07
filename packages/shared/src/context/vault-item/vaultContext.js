import { createContext, useContext } from "react";
export const vaultItemContext = createContext();


export function useVaultItems() {
    const context = useContext(vaultItemContext)
    if (!context) throw new Error("useGoogleItems must be used within a VaultProvider")


    return context
}