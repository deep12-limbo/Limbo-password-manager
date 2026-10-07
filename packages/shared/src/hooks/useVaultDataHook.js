import { useState } from "react";
import { useHttp } from "../hooks"
import { apis_urls } from "../apis";

import { vaultFormConfig, vaultFormDefaultValues } from "../utils/config";

export function useVaultData() {
    const http = useHttp();


    // --------------------------------------------------
    // LIST STATE
    // --------------------------------------------------

    /*
     * This is the SINGLE source of truth for Vault items.
     *
     * Toolbar and ItemList both ultimately use this same
     * state through the hookData object.
     */
    const [items, setItems] = useState([]);

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        totalItems: 0,
        totalPages: 1,
    });


    // --------------------------------------------------
    // LIST CONFIG
    // --------------------------------------------------

    const vaultListConfig = {
        columns: [
            {
                key: "name",
                label: "Name",
            },
            {
                key: "username",
                label: "Username",
                muted: true,
            },
        ],

        detailFields: [
            {
                key: "website",
                label: "Website",
            },
            {
                key: "username",
                label: "Username",
            },
            {
                key: "two_fa_enabled",
                label: "2FA",
                format: (value) =>
                    value
                        ? "Enabled"
                        : "Disabled",
            },
            {
                key: "two_fa_type",
                label: "2FA Type",
            },
            {
                key: "two_fa_email",
                label: "2FA Backup Email",
            },
            {
                key: "two_fa_phone",
                label: "2FA Phone",
            },
            {
                key: "notes",
                label: "Notes",
            },
            {
                key: "password",
                label: "Password",
            },
        ],
    };


    // --------------------------------------------------
    // CREATE
    // --------------------------------------------------

    /*
     * Default values used when creating a new Vault item.
     */
    const createDefaultValues = {
        ...vaultFormDefaultValues,
    };


    const createVaultItem = async (formData) => {
        const response = await http.sendRequest(
            apis_urls.createVaultItem,
            "POST",
            formData
        );

        if (response?.success !== true) {
            return false;
        }

        return true;
    };


    // --------------------------------------------------
    // EDIT
    // --------------------------------------------------

    /*
     * ItemForm calls this when it needs the default
     * values for a particular item being edited.
     *
     * We keep this as a function because every item
     * has different values.
     */
    const getEditDefaultValues = (item) => ({
        ...vaultFormDefaultValues,
        ...item,

        name: item?.name ?? "",
        password: item?.password ?? "",
        website: item?.website ?? "",
        username: item?.username ?? "",

        two_fa_enabled:
            item?.two_fa_enabled ?? false,

        two_fa_type:
            item?.two_fa_type ?? "",

        two_fa_email:
            item?.two_fa_email ?? "",

        two_fa_phone:
            item?.two_fa_phone ?? "",

        two_fa_secret:
            item?.two_fa_secret ?? "",

        notes:
            item?.notes ?? "",
    });


    const updateVaultItem = async (
        item,
        formData
    ) => {
        if (!item?.id) {
            return false;
        }

        /*
         * Do not send the local id as part of the
         * update body.
         */
        const {
            id,
            ...updatedFields
        } = formData;


        const response =
            await http.sendRequest(
                apis_urls.updateVaultItem(item.id),
                "PUT",
                updatedFields
            );


        if (response?.success !== true) {
            return false;
        }


        /*
         * Update the same shared items state.
         *
         * The API does not need to return the complete
         * item for us to update the list.
         */
        const updatedItem = {
            ...item,
            ...updatedFields,
            id: item.id,
        };


        setItems((previous) =>
            previous.map((existing) =>
                existing.id === item.id
                    ? updatedItem
                    : existing
            )
        );


        return true;
    };


    // --------------------------------------------------
    // FETCH ALL ITEMS
    // --------------------------------------------------

    const fetchItems = async ({
        page = 1,
        limit = 10,
        search = "",
    } = {}) => {
        console.log("inside fetch items , fetching vault")
        const params =
            new URLSearchParams();


        params.set("page", page);
        params.set("limit", limit);


        if (search) {
            params.set("name", search);
        }


        const url =
            `${apis_urls.getAllVaultItems}?${params.toString()}`;


        const response =
            await http.sendRequest(
                url,
                "GET"
            );


        if (!response?.success) {
            return false;
        }


        const responseData =
            response.data || {};


        setItems(
            responseData.items || []
        );

        console.log("response vault", response.data.items, items)
        const responsePagination =
            responseData.pagination || {};


        setPagination({
            page:
                responsePagination.page || 1,

            limit:
                responsePagination.limit || 10,

            totalItems:
                responsePagination.total_items || 0,

            totalPages:
                responsePagination.total_pages || 1,
        });


        return true;
    };


    // --------------------------------------------------
    // FETCH ONE ITEM
    // --------------------------------------------------

    const fetchItemById = async (id) => {
        const response =
            await http.sendRequest(
                apis_urls.getVaultItem(id),
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
        const response =
            await http.sendRequest(
                apis_urls.deleteVaultItem,
                "DELETE",
                {
                    ids: [id],
                }
            );


        if (response?.success !== true) {
            return false;
        }


        /*
         * Remove the deleted item from the same
         * shared list state.
         */
        setItems((previous) =>
            previous.filter(
                (existing) =>
                    existing.id !== id
            )
        );


        setPagination((previous) => {
            const totalItems =
                Math.max(
                    0,
                    previous.totalItems - 1
                );


            return {
                ...previous,

                totalItems,

                totalPages:
                    Math.max(
                        1,
                        Math.ceil(
                            totalItems /
                            previous.limit
                        )
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


        const response =
            await http.sendRequest(
                apis_urls.deleteVaultItem,
                "DELETE",
                {
                    ids,
                }
            );


        if (response?.success !== true) {
            return false;
        }


        /*
         * Remove all deleted items from the
         * shared list state.
         */
        setItems((previous) =>
            previous.filter(
                (existing) =>
                    !ids.includes(existing.id)
            )
        );


        setPagination((previous) => {
            const totalItems =
                Math.max(
                    0,
                    previous.totalItems -
                    ids.length
                );


            return {
                ...previous,

                totalItems,

                totalPages:
                    Math.max(
                        1,
                        Math.ceil(
                            totalItems /
                            previous.limit
                        )
                    ),
            };
        });


        return true;
    };


    // --------------------------------------------------
    // RETURN
    // --------------------------------------------------

    return {

        /*
         * CREATE FORM
         *
         * ItemForm will use:
         *
         * hookData.create.formConfig
         * hookData.create.defaultValues
         * hookData.create.onSubmit
         */
        create: {
            formConfig:
                vaultFormConfig,

            defaultValues:
                createDefaultValues,

            onSubmit:
                createVaultItem,
        },


        /*
         * EDIT FORM
         *
         * ItemForm will use:
         *
         * hookData.edit.formConfig
         * hookData.edit.getDefaultValues(item)
         * hookData.edit.onSubmit(item, formData)
         */
        edit: {
            formConfig:
                vaultFormConfig,

            getDefaultValues:
                getEditDefaultValues,

            onSubmit:
                updateVaultItem,
        },


        /*
         * LIST DATA
         */
        items,

        setItems,

        pagination,

        listconfig:
            vaultListConfig,


        /*
         * API OPERATIONS
         */
        fetchItems,

        fetchItemById,

        deleteItem,

        bulkDeleteItems,


        /*
         * HTTP STATE
         */
        http,
    };
}