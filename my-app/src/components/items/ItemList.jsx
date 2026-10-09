import { useState } from "react";

import { cn } from "../../utils/cn";
import Item, { IconButton } from "./Item";

import Checkbox from "../ui/form/Checkbox";
import {
    CloseIcon,
    DeleteIcon,
    LockKeyholeIcon,
} from "../ui/icons";

import Spinner from "../ui/Spinner";
import Button from "../ui/Button";
import CreateItemButton from "./CreateItemButton";


export default function ItemList({
    items = [],
    selectedIds = [],

    onSelect,
    onDelete,

    disabled,

    page = 1,
    limit = 10,

    emptyMessage =
    "Nothing here yet. Create an item to get started.",

    className = "",
    listconfig,

    selectedCount,
    isAllSelected,
    onToggleSelectAll,

    removeSelectedItems,
    onBulkDelete,

    isLoading,

    /*
     * complete hook data received from ItemsManager.
     */
    hookData,

    itemType,
}) {

    const [
        primaryCol,
        secondaryCol,
    ] = listconfig.columns;


    const [expandedItemId, setExpandedItemId] =
        useState(null);


    const hasItems = items.length > 0;

    const showOverlaySpinner =
        isLoading && hasItems;

    const showFullSpinner =
        isLoading && !hasItems;

    const showEmpty =
        !isLoading && !hasItems;



    const handleToggleExpand = (id) => {
        setExpandedItemId((previousId) =>
            previousId === id
                ? null
                : id
        );
    };


    return (
        <div className="  flex w-full flex-col   ">


            {/* -----------------------------------------
                Selection toolbar
                ----------------------------------------- */}
            <div className="flex h-7 w-full flex-row items-center justify-end gap-x-2 mt-1">

                {selectedCount !== 0 ? (
                    <Button.Root variant="outline" className="flex h-5 items-center justify-center  px-2 py-1 text-[10px] text-neutral-100 sm:h-6 sm:px-3 sm:py-2 sm:text-[12px] ">

                        <span>
                            Selected
                        </span>

                        <span className="ml-1 mr-2 sm:mr-3">
                            {selectedCount}
                        </span>

                        <div
                            className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full sm:h-5 sm:w-5"
                            onClick={removeSelectedItems}
                        >
                            <CloseIcon size={15} />
                        </div>

                    </Button.Root>
                ) : (
                    <div />
                )}


                {selectedCount !== 0 && (
                    <IconButton
                        tone="danger"
                        label="Delete"
                        disabled={isLoading}
                        onClick={onBulkDelete}
                    >
                        <DeleteIcon />
                    </IconButton>
                )}

            </div>

            {/* -----------------------------------------
                List
                ----------------------------------------- */}
            <div className="relative">
                <div className={cn("w-full h-[45vh] overflow-y-scroll overflow-x-hidden")}>



                    {showEmpty && (
                        <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-4  text-center border-border border-1 rounded-xl bg-surface-background/50">
                            <LockKeyholeIcon
                                size={36}
                                className="text-text-dim"
                            />

                            <div className="flex flex-col space-y-[1rem]">
                                <h3 className="text-sm font-medium text-heading sm:text-base">
                                    No items yet
                                </h3>

                                <p className="text-xs text-foreground/60 sm:text-sm mb-8">
                                    Your saved items will appear here. Create your first item to get started.
                                </p>

                                <CreateItemButton itemType={itemType}
                                    disabled={disabled}
                                    hookData={hookData}
                                    className="rounded-full text-white"
                                    buttonVariant="outline"
                                    buttonClassName="text-text text-[12px] font-md"
                                />

                            </div>
                        </div>
                    )}




                    {hasItems && (
                        <ul className="  w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-5   ">
                            {items.map((item, i) => (
                                <Item
                                    key={item.id}
                                    item={item}
                                    index={(page - 1) * limit + i + 1}
                                    selected={selectedIds.includes(item.id)}
                                    onSelect={onSelect}
                                    onDelete={onDelete}
                                    disabled={disabled}
                                    listconfig={listconfig}
                                    expanded={expandedItemId === item.id}
                                    onToggleExpand={handleToggleExpand}
                                    hookData={hookData}
                                />
                            ))}
                        </ul>
                    )}
                </div>

            </div>

        </div>
    );
}