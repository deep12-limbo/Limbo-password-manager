import { useState } from "react";
import { ItemManagerContext } from "./itemManagerContext";


export function ItemManagerProvider({ children }) {
    const [activeTab, setActiveTab] = useState("vault"); // "vault" | "google"
    const [selectedItem, setSelectedItem] = useState(null);
    const [mode, setMode] = useState("idle"); // "idle" | "view" | "create" | "edit"

    const openItem = (item) => {
        setSelectedItem(item);
        setMode("view");
    };

    const openCreate = () => {
        setSelectedItem(null);
        setMode("create");
    };

    const openEdit = (item) => {
        setSelectedItem(item);
        setMode("edit");
    };

    const closeAll = () => {
        setSelectedItem(null);
        setMode("idle");
    };

    const switchTab = (tab) => {
        if (tab === activeTab) return;
        setActiveTab(tab);
        setSelectedItem(null);
        setMode("idle");
    };

    const value = {
        activeTab,
        switchTab,
        selectedItem,
        mode,
        openItem,
        openCreate,
        openEdit,
        closeAll,
    };

    return (
        <ItemManagerContext.Provider value={value}>
            {children}
        </ItemManagerContext.Provider>
    );
}