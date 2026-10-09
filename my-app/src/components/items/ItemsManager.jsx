import { useEffect, useMemo, useState } from "react";

import Toolbar from "./ToolBaar";
import ItemList from "./ItemList";
import Pagination from "./Pagination";
import { cn } from "../../utils/cn";


const DashedBorder = ({ className }) => {
    return (
        <div className={cn("my-[1rem] w-full border-dashed  border-b-1 border-border", className)}></div>

    )
}


export default function ItemsManager({
    useHook,
    onEdit,
    children,
}) {
    /*
     * Get EVERYTHING from the feature hook in one place.
     *
     * Example:
     * GoogleItems  → useGoogleData()
     * VaultItems   → useVaultData()
     *
     * Toolbar and ItemList receive this same hookData object.
     */
    const hookData = useHook();

    const {
        items,
        pagination,
        fetchItems,
        deleteItem,
        bulkDeleteItems,
        http,
        listconfig,
    } = hookData;


    const [search, setSearch] = useState("");
    // const [page, setPage] = useState(1);
    const [limit] = useState(10);

    const [selectedIds, setSelectedIds] = useState([]);

    const [page, setPage] = useState(1);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };
    /*
     * Decide which item type we are displaying.
     *
     * This is unrelated to hookData.
     */
    const itemType =
        hookData.step === "google"
            ? "google"
            : "vault";


    /*
     * Fetch items whenever page, limit, or search changes.
     */
    useEffect(() => {
        fetchItems({
            page,
            limit,
            search,
        });
    }, [page, limit, search]);


    /*
     * Select / unselect a single item.
     */
    const toggleItemSelection = (id) => {
        setSelectedIds((previous) => {
            if (previous.includes(id)) {
                return previous.filter(
                    (itemId) => itemId !== id
                );
            }

            return [
                ...previous,
                id,
            ];
        });
    };


    /*
     * Check whether every visible item is selected.
     */
    const isAllSelected = useMemo(() => {
        if (!items?.length) {
            return false;
        }

        return items.every((item) =>
            selectedIds.includes(item.id)
        );
    }, [items, selectedIds]);


    /*
     * Select / unselect all visible items.
     */
    const toggleSelectAll = () => {
        if (isAllSelected) {
            setSelectedIds([]);
            return;
        }

        setSelectedIds(
            items.map((item) => item.id)
        );
    };


    /*
     * Clear selected items.
     */
    const removeSelectedItems = () => {
        setSelectedIds([]);
    };


    /*
     * Delete one item.
     */
    const handleDeleteItem = async (id) => {
        const success = await deleteItem(id);

        if (!success) {
            return;
        }

        setSelectedIds((previous) =>
            previous.filter(
                (itemId) => itemId !== id
            )
        );

        await fetchItems({
            page,
            limit,
            search,
        });
    };


    const handleBulkDelete = async () => {
        if (!selectedIds.length) {
            return;
        }

        const success = await bulkDeleteItems(
            selectedIds
        );

        if (!success) {
            return;
        }

        setSelectedIds([]);

        await fetchItems({
            page,
            limit,
            search,
        });
    };


    /*
     * Search handler.
     *
     * Whenever a new search starts, go back to page 1.
     */
    const handleSearchChange = (value) => {
        setSearch(value);
        setPage(1);
    };




    return (
        <div className=" flex flex-col gap-y-2  items-between justify-between h-[100%] pb-[2rem]">

            {/* -----------------------------------------
                Toolbar
                -----------------------------------------
                Pass the COMPLETE hookData object.

                Toolbar can then take whatever it needs
                from hookData and pass it to ItemForm.
            */}

            <div className="relative">

                <div className="w-full text-2xl font-semibold text-start mt-3">Your Digital Vault</div>
                <div className="w-full text-xs  text-start mt-[-1]">safely manage and access your passwords  </div>
                {/* <div className="my-[1rem] w-full border-dashed  border-b-1 border-border"></div> */}

                <DashedBorder />

                <div className="w-full  flex flex-row items-center ">


                    <div />

                    <Toolbar
                        hookData={hookData}

                        itemType={itemType}

                        search={search}
                        onSearchChange={handleSearchChange}

                        selectedCount={selectedIds.length}
                        isAllSelected={isAllSelected}
                        onToggleSelectAll={toggleSelectAll}

                        disabled={http.isLoading}
                    />
                </div>

                {/* <div className="my-[1rem] w-full border-dashed border-b-1 border-border"></div> */}
                <DashedBorder />
                {/* -----------------------------------------
                Item List
                -----------------------------------------
                Again, pass the SAME hookData object.
                ItemList → Item → ItemForm
                No second useHook() call.
            */}

            
                <ItemList

                    itemType={itemType}
                    hookData={hookData}

                    items={items}
                    selectedIds={selectedIds}

                    onSelect={toggleItemSelection}
                    onDelete={handleDeleteItem}

                    disabled={http.isLoading}

                    page={page}
                    limit={limit}

                    listconfig={listconfig}

                    search={search}
                    onSearchChange={handleSearchChange}

                    selectedCount={selectedIds.length}
                    isAllSelected={isAllSelected}
                    onToggleSelectAll={toggleSelectAll}

                    onBulkDelete={handleBulkDelete}
                    removeSelectedItems={removeSelectedItems}

                    isLoading={http.isLoading}
                />
            </div>

            {/* Pagination */}
            <Pagination
                page={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
                disabled={http.isLoading}
            />


            {/* Anything feature-specific can still be
                rendered by the parent. */}
            {children}

        </div>
    );
}