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
import SkeletonCard from "./SkeletonCard";


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
        <div className="  flex w-full flex-col  h-[100%] ">




            {/* -----------------------------------------
                Selection toolbar
                ----------------------------------------- */}
            <div className="flex w-full flex-row items-center  h-[27px] my-2 ">


                {!showEmpty && <Button.Root onClick={onToggleSelectAll}
                    variant="outline"
                    className="mr-3 flex items-center justify-center px-2 text-[10px] text-neutral-100 bg-sidebar-item-hover  min-w-22 h-6  rounded-sm"
                >
                    <span>Select All </span>


                </Button.Root>}

                {selectedCount !== 0 && !showEmpty && (

                    <div className=" flex flex-row w-full justify-between items-center">



                        <Button.Root
                            variant="outline"
                            className="flex items-center justify-center  text-[10px] text-neutral-100 bg-sidebar-item-hover h-6  rounded-sm px-2"
                        >
                            <div className="flex gap-2">

                                <span>Selected</span>

                                <span className="relative   ml-0.5 mr-1.5">
                                    {selectedCount}
                                </span>
                            </div>

                            <div
                                className=" relative  flex h-4 w-4 cursor-pointer items-center justify-center rounded-full sm:h-5 sm:w-5"
                                onClick={removeSelectedItems}
                            >
                                <CloseIcon size={15} />
                            </div>
                        </Button.Root>
                        <IconButton
                            tone="danger"
                            label="Delete"
                            disabled={isLoading}
                            onClick={onBulkDelete}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </div>
                )}
            </div>

            {/* -----------------------------------------
                List
                ----------------------------------------- */}
            <div className={cn(showEmpty ? "h-full flex items-center " : "")}>
                <div className={cn("w-full  overflow-y-scroll overflow-x-hidden")}>



                    {showEmpty && (
                        <div className="flex h-[45vh] w-full flex-col items-center justify-center gap-3 px-4  text-center border-border border-1 rounded-xl bg-[linear-gradient(138deg,#1a1a1bb3_22.83%,#000000b3_82.19%),var(--grey-900)]">
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

                                <div className=" ">


                                    <CreateItemButton itemType={itemType}
                                        disabled={disabled}
                                        hookData={hookData}
                                        className="rounded-full text-white  w-[50%] py-2 h-auto"
                                        buttonVariant="outline"
                                        buttonClassName="text-text text-[15px] font-md"
                                        iconClassName="text-text"
                                        iconSize={16}
                                        themed={true}
                                    />
                                </div>

                            </div>
                        </div>
                    )}



                    {isLoading ? (
                        <ul className="grid w-full grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <li
                                    key={index}
                                    className={
                                        index === 1
                                            ? "hidden xs:block"
                                            : index >= 2
                                                ? "hidden md:block"
                                                : ""
                                    }
                                >
                                    <SkeletonCard />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        hasItems && (
                            <ul className="grid w-full grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3">
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
                        )
                    )}
                </div>

            </div>

        </div>
    );
}