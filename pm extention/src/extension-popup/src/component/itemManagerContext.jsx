import { createContext, useContext, } from "react";

export const ItemManagerContext = createContext(null);



export function useItemManager() {
    const context = useContext(ItemManagerContext);

    if (!context) {
        throw new Error("useItemManager must be used within an ItemManagerProvider");
    }

    return context;
}
// export { ItemManagerPovider }