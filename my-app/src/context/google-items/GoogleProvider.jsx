import { useState } from "react";

import GoogleItemsContext from "./googleItems";

export default function GoogleProvider({ children }) {
    const [items, setItems] = useState([]);

    const [selectedItems, setSelectedItems] = useState([]);

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        totalItems: 0,
        totalPages: 1,
    });

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
        // Items
        items,
        setItems,

        // Selection
        selectedItems,
        setSelectedItems,

        // Pagination
        pagination,
        setPagination,

        // Search
        search,
        setSearch,

        // Form modal
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