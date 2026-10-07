import { useState } from "react";

import vaultItemContext from "./vaultContext";

export default function VaultItemProvider({ children }) {
    const [items, setItems] = useState([]);

    const [selectedItems, setSelectedItems] = useState([]);

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        totalItems: 0,
        totalPages: 1,
    });

    const [search, setSearch] = useState("");

    // Modal
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
        items,
        setItems,

        selectedItems,
        setSelectedItems,

        pagination,
        setPagination,

        search,
        setSearch,

        isFormModalOpen,
        formMode,
        editingItem,

        openCreateModal,
        openEditModal,
        closeFormModal,
    };

    return (
        <vaultItemContext.Provider value={value}>
            {children}
        </vaultItemContext.Provider>
    );
}