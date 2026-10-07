import useHttp from "../../hooks/useHttp";
import { apis_urls } from "../../apis/api";

import {
    googleFormConfig,
    googleFormDefaultValues,
} from "./google-item-form-config";

import { useState } from "react";

export function useGoogleData() {
    const http = useHttp();

    const [items, setItems] = useState([]);

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        totalItems: 0,
        totalPages: 1,
    });

    const googleListConfig = {
        columns: [
            { key: "name", label: "Name" },
            { key: "email", label: "Email", muted: true },
        ],
        detailFields: [
            { key: "email", label: "Email" },
            { key: "website", label: "Website" },
            { key: "notes", label: "Notes" },
        ],
    };

    const recomputeTotalPages = (totalItems, limit) =>
        Math.max(1, Math.ceil(totalItems / limit));

    const normalizeGoogleItem = (raw) => ({
        id: raw.ID ?? raw.id,
        name: raw.Name ?? raw.name ?? "",
        website: raw.Website ?? raw.website ?? "",
        email: raw.Email ?? raw.email ?? "",
        notes: raw.Notes ?? raw.notes ?? "",
    });

    // --------------------------------------------------
    // CREATE
    // --------------------------------------------------

    const createDefaultValues = {
        ...googleFormDefaultValues,
    };

    const createGoogleItem = async (formData) => {
        const response = await http.sendRequest(
            apis_urls.createGoogleItem,
            "POST",
            formData
        );

        if (response?.success !== true) {
            return false;
        }

        const createdItem = response.data?.ID
            ? normalizeGoogleItem(response.data)
            : null;

        if (createdItem?.id) {
            setItems((prev) => {
                const next = [createdItem, ...prev];

                return next.length > pagination.limit
                    ? next.slice(0, pagination.limit)
                    : next;
            });

            setPagination((prev) => {
                const totalItems = prev.totalItems + 1;

                return {
                    ...prev,
                    totalItems,
                    totalPages: recomputeTotalPages(
                        totalItems,
                        prev.limit
                    ),
                };
            });
        }

        return true;
    };

    // --------------------------------------------------
    // EDIT
    // --------------------------------------------------

    const getEditDefaultValues = (item) => ({
        ...googleFormDefaultValues,
        ...item,
        name: item?.name ?? "",
        website: item?.website ?? "",
        email: item?.email ?? "",
        notes: item?.notes ?? "",
    });

    const updateGoogleItem = async (item, formData) => {
        if (!item?.id) {
            return false;
        }

        const { id, ...updatedFields } = formData;

        const response = await http.sendRequest(
            apis_urls.updateGoogleItem(item.id),
            "PUT",
            updatedFields
        );

        if (response?.success !== true) {
            return false;
        }

        const updatedItem = {
            ...item,
            ...updatedFields,
            id: item.id,
        };

        setItems((prev) =>
            prev.map((existing) =>
                existing.id === item.id
                    ? updatedItem
                    : existing
            )
        );

        return true;
    };

    // --------------------------------------------------
    // FETCH LIST
    // --------------------------------------------------

    const fetchItems = async ({
        page = 1,
        limit = 10,
        search = "",
    } = {}) => {
        const params = new URLSearchParams();

        params.set("page", page);
        params.set("limit", limit);

        if (search) {
            params.set("name", search);
        }

        const url =
            `${apis_urls.getAllGoogleItems}?${params.toString()}`;

        const response = await http.sendRequest(
            url,
            "GET"
        );

        if (!response?.success) {
            return false;
        }

        const responseData = response.data || {};

        setItems(responseData.items || []);

        const responsePagination =
            responseData.pagination || {};

        setPagination({
            page: responsePagination.page || 1,
            limit: responsePagination.limit || 10,
            totalItems:
                responsePagination.total_items || 0,
            totalPages:
                responsePagination.total_pages || 1,
        });

        return true;
    };

    // --------------------------------------------------
    // FETCH SINGLE ITEM
    // --------------------------------------------------

    const fetchItemById = async (id) => {
        const response = await http.sendRequest(
            apis_urls.getGoogleItem(id),
            "GET"
        );

        if (!response?.success) {
            return null;
        }

        return response.data;
    };

    // --------------------------------------------------
    // DELETE
    // --------------------------------------------------

    const deleteItem = async (id) => {
        const response = await http.sendRequest(
            apis_urls.deleteGoogleItem,
            "DELETE",
            {
                ids: [id],
            }
        );

        if (response?.success !== true) {
            return false;
        }

        setItems((prev) =>
            prev.filter(
                (existing) => existing.id !== id
            )
        );

        setPagination((prev) => {
            const totalItems = Math.max(
                0,
                prev.totalItems - 1
            );

            return {
                ...prev,
                totalItems,
                totalPages: recomputeTotalPages(
                    totalItems,
                    prev.limit
                ),
            };
        });

        return true;
    };

    // --------------------------------------------------
    // BULK DELETE
    // --------------------------------------------------

    const bulkDeleteItems = async (ids) => {
        if (!ids?.length) {
            return false;
        }

        const response = await http.sendRequest(
            apis_urls.deleteGoogleItem,
            "DELETE",
            {
                ids,
            }
        );

        if (response?.success !== true) {
            return false;
        }

        setItems((prev) =>
            prev.filter(
                (existing) => !ids.includes(existing.id)
            )
        );

        setPagination((prev) => {
            const totalItems = Math.max(
                0,
                prev.totalItems - ids.length
            );

            return {
                ...prev,
                totalItems,
                totalPages: recomputeTotalPages(
                    totalItems,
                    prev.limit
                ),
            };
        });

        return true;
    };

    return {
        // -------------------------
        // CREATE
        // -------------------------
        create: {
            formConfig: googleFormConfig,
            defaultValues: createDefaultValues,
            onSubmit: createGoogleItem,
        },

        // -------------------------
        // EDIT
        // -------------------------
        edit: {
            formConfig: googleFormConfig,
            getDefaultValues: getEditDefaultValues,
            onSubmit: updateGoogleItem,
        },

        // -------------------------
        // LIST
        // -------------------------
        listconfig: googleListConfig,
        items,
        setItems,
        pagination,

        // -------------------------
        // OPERATIONS
        // -------------------------
        fetchItems,
        fetchItemById,
        deleteItem,
        bulkDeleteItems,

        http,
    };
}