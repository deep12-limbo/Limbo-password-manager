import { useState } from "react";

import { GoogleItemsContext } from "./googleItems";
import { useGoogleData } from "../../hooks/useGoogleData";

export function GoogleProvider({ children }) {
    const googleData = useGoogleData();

    // UI-only state — not part of useGoogleData, kept here
    const [selectedItems, setSelectedItems] = useState([]);
    const [search, setSearch] = useState("");

    // Modal state
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [formMode, setFormMode] = useState("create");
    const [editingItem, setEditingItem] = useState(null);

    const openCreateModal = () => {
        setFormMode("create");
        setEditingItem(null);
        setIsFormModalOpen(true);
    };

    const openEditModal = (item) => {
        setFormMode("edit");
        setEditingItem(item);
        setIsFormModalOpen(true);
    };

    const closeFormModal = () => {
        setIsFormModalOpen(false);
        setEditingItem(null);
    };

    const value = {
        // Everything from useGoogleData: items, pagination, create, edit,
        // fetchItems, fetchItemById, deleteItem, bulkDeleteItems, listconfig, http
        ...googleData,

        // Selection (UI-only)
        selectedItems,
        setSelectedItems,

        // Search (UI-only)
        search,
        setSearch,

        // Form modal (UI-only)
        isFormModalOpen,
        formMode,
        editingItem,

        openCreateModal,
        openEditModal,
        closeFormModal,
    };

    return (
        <GoogleItemsContext.Provider value={value}>
            {children}
        </GoogleItemsContext.Provider>
    );
}