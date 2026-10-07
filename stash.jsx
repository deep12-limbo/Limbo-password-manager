import { useState } from "react";

import { cn } from "../../utils/cn";

import Checkbox from "../ui/form/Checkbox";
import {
    EditIcon,
    ChevronLeftIcon,
} from "../ui/icons";

import Modal from "../ui/Modal";
import ItemForm from "../../pages/ItemForm";
import Spinner from "../ui/Spinner";


function StatusBadge({ enabled }) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium sm:px-2.5 sm:py-1 sm:text-xs",

                enabled
                    ? "bg-green-500/10 text-green-500"
                    : "bg-foreground/5 text-foreground/50"
            )}
        >
            <span
                className={cn(
                    "mr-1 h-1.5 w-1.5 rounded-full sm:mr-1.5",

                    enabled
                        ? "bg-green-500"
                        : "bg-foreground/40"
                )}
            />

            {enabled
                ? "Enabled"
                : "Disabled"}
        </span>
    );
}


function ItemDetails({ item, listconfig }) {
    const detailFields = listconfig?.detailFields || [];

    const rows = [];

    for (let i = 0; i < detailFields.length; i += 2) {
        rows.push(detailFields.slice(i, i + 2));
    }

    return (
        <div className="border-t border-border bg-accent-50/30 px-3 py-2 md:px-4">

            {/* 1 column in card, 2 columns from md up (row) */}
            <div className="grid grid-cols-1 md:grid-cols-2">

                {rows.map((row, rowIndex) => (
                    <div
                        key={rowIndex}
                        className="contents"
                    >
                        {row.map((detail) => {
                            const rawValue = item?.[detail.key];

                            const value = detail.format
                                ? detail.format(rawValue)
                                : rawValue;

                            const isEmpty =
                                rawValue === null ||
                                rawValue === undefined ||
                                rawValue === "";

                            return (
                                <div
                                    key={detail.key}
                                    className="
                                        grid
                                        grid-cols-[5.5rem_minmax(0,1fr)]
                                        items-start
                                        gap-x-3
                                        py-1.5
                                        text-left
                                        text-xs
                                        md:grid-cols-[9rem_minmax(0,1fr)]
                                        md:items-center
                                        md:gap-x-0
                                        md:py-1
                                        md:pl-6
                                        lg:pl-20
                                    "
                                >
                                    {/* Label */}
                                    <span className="text-left text-foreground/50">
                                        {detail.label}:
                                    </span>

                                    {/* Value (wraps in card, truncates in row) */}
                                    <span
                                        className={cn(
                                            "min-w-0 break-words text-left md:truncate",
                                            isEmpty
                                                ? "text-foreground/30"
                                                : "text-foreground/80"
                                        )}
                                    >
                                        {isEmpty ? "—" : value}
                                    </span>
                                </div>
                            );
                        })}

                        {/* Keep the 2-column grid aligned when there is an odd number */}
                        {row.length === 1 && (
                            <div className="hidden md:block" />
                        )}
                    </div>
                ))}

            </div>
        </div>
    );
}


/*
 * Desktop row grid (md and up only).
 * Below md the header is hidden and items render as cards.
 */
export const ROW_GRID =
    "md:grid md:grid-cols-[2rem_2.25rem_minmax(11rem,1.6fr)_minmax(8rem,1fr)_7.5rem] md:items-center md:gap-x-4 md:px-4 md:py-2";


export function IconButton({
    tone = "accent",
    onClick,
    disabled,
    label,
    children,
    isLoading,
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            aria-label={label}
            title={label}
            className={cn(
                "inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors",
                "disabled:cursor-not-allowed disabled:opacity-40",
                "[&>svg]:h-3.5 [&>svg]:w-3.5",

                tone === "accent" &&
                "text-accent-700 hover:bg-electric-violet-100",

                tone === "danger" &&
                "text-red-400 hover:bg-red-100",

                tone === "quiet" &&
                "text-foreground hover:bg-electric-violet-50 hover:text-foreground"
            )}
        >
            {isLoading ? (
                <Spinner />
            ) : (
                children
            )}
        </button>
    );
}


function Cell({
    children,
    muted,
    selected,
    className = "",
}) {
    return (
        <span
            className={cn(
                "block w-full truncate text-[15px]",

                selected
                    ? muted
                        ? "text-primary-foreground/75"
                        : "text-primary-foreground"
                    : muted
                        ? "text-foreground/65"
                        : "text-heading",

                className
            )}
        >
            {children || "—"}
        </span>
    );
}


/*
 * One "Label | Value" line inside the mobile card.
 */
/*
 * One "Label | Value" line inside the mobile card.
 * Renders two grid cells; the parent grid owns the columns.
 */
function CardField({ label, value, selected, muted }) {
    return (
        <>
            <span
                className={cn(
                    "truncate text-left text-sm leading-5",
                    selected
                        ? "text-primary-foreground/70"
                        : "text-foreground/50"
                )}
            >
                {label}
            </span>

            <span
                className={cn(
                    "min-w-0 break-words text-left text-sm leading-5",
                    selected
                        ? "text-primary-foreground"
                        : muted
                            ? "text-foreground/65"
                            : "text-heading"
                )}
            >
                {value || "—"}
            </span>
        </>
    );
}


export default function Item({
    item,

    index,

    selected,

    onSelect,
    onEdit,
    onDelete,

    disabled,

    listconfig,

    /*
     * Complete hook data.
     */
    hookData,

    /*
     * Expansion is controlled by ItemList.
     */
    expanded,
    onToggleExpand,
}) {
    const [
        primaryCol,
        secondaryCol,
    ] = listconfig.columns;


    const [
        isEditModalOpen,
        setIsEditModalOpen,
    ] = useState(false);


    /*
     * Shared buttons, used by both the card and the row.
     */
    const editButton = (
        <IconButton
            tone="accent"
            label="Edit"
            disabled={disabled}
            onClick={() =>
                setIsEditModalOpen(true)
            }
        >
            <EditIcon />
        </IconButton>
    );

    const expandButton = (
        <IconButton
            tone="quiet"
            label={
                expanded
                    ? "Hide details"
                    : "Show details"
            }
            disabled={disabled}
            onClick={() =>
                onToggleExpand(item.id)
            }
        >
            <ChevronLeftIcon
                className={cn(
                    "transition-transform duration-200",

                    expanded
                        ? "rotate-90"
                        : "-rotate-90"
                )}
            />
        </IconButton>
    );

    const checkbox = (
        <Checkbox
            checked={selected}
            disabled={disabled}
            onChange={() =>
                onSelect(item?.id)
            }
            aria-label={`Select ${item?.name}`}
            boxClassName={
                selected
                    ? "border-primary-foreground bg-primary-foreground/25"
                    : ""
            }
        />
    );

    const indexBadge = (
        <span
            aria-hidden="true"
            className={cn(
                "inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-semibold tabular-nums opacity-75",

                selected
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-accent-50 text-accent-700"
            )}
        >
            {index}
        </span>
    );

    console.log("listconfig ", listconfig)


    return (
        <li
            className={cn(
                /* Card (below md) */
                "w-full overflow-hidden rounded-xl border border-border bg-surface shadow-sm mb-4 md:mb-0",

                selected &&
                "border-electric-violet-400 bg-electric-violet-300 dark:bg-electric-violet-500",

                /* Plain row (md and up): no card styling at all */
                "md:overflow-visible md:rounded-none md:border-0 md:bg-transparent md:shadow-none",
                selected && "md:bg-transparent dark:md:bg-transparent",

                disabled &&
                "pointer-events-none opacity-60"
            )}
        >

            {/* =========================================
                CARD  (visible below md only)

                ┌──────────────────────────────┐
                │ ☑ #1                    ✎  ˅ │
                │ Name        Gmail            │
                │ Website     google.com       │
                └──────────────────────────────┘
                ========================================= */}
            <div className="md:hidden pb-6  md:mt-0 pb-0">

                {/* Top bar: checkbox + index  |  edit + chevron */}
                <div className="flex items-center justify-between px-3 py-2">

                    <div className="flex items-center gap-3">
                        {checkbox}
                        {indexBadge}
                    </div>

                    <div className="flex items-center gap-1">
                        {editButton}
                        {expandButton}
                    </div>

                </div>

                {/* Label / value lines */}
                <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-start gap-x-3 gap-y-1.5  px-3  border-l-3   border-primary ml-6 md:border-l-0 md:ml-0 md:px-4 md:pb-4">

                    <CardField
                        label={primaryCol.label}
                        value={item?.[primaryCol.key]}
                        selected={selected}
                    />

                    <CardField
                        label={secondaryCol.label}
                        value={item?.[secondaryCol.key]}
                        selected={selected}
                        muted={secondaryCol.muted}
                    />

                </div>

            </div>


            {/* =========================================
                ROW  (visible from md up, unchanged style)
                ========================================= */}
            <div
                className={cn(
                    "hidden items-center",
                    ROW_GRID,
                    "transition-colors",

                    selected
                        ? "bg-electric-violet-300 dark:bg-electric-violet-500"
                        : ""
                )}
            >

                {checkbox}

                {indexBadge}

                <Cell selected={selected}>
                    {item?.[primaryCol.key]}
                </Cell>

                <Cell
                    selected={selected}
                    muted={secondaryCol.muted}
                >
                    {item?.[secondaryCol.key]}
                </Cell>

                <div className="flex items-center justify-end gap-3.5">
                    {editButton}
                    {expandButton}
                </div>

            </div>


            {/* -----------------------------------------
                Detail panel (card grows with its content)
                ----------------------------------------- */}
            {expanded && (
                <ItemDetails
                    item={item}
                    listconfig={listconfig}
                />
            )}


            {/* -----------------------------------------
                Edit modal
                ----------------------------------------- */}
            <Modal.Root
                open={isEditModalOpen}
                onClose={() =>
                    setIsEditModalOpen(false)
                }
            >

                <Modal.Overlay
                    onClick={() =>
                        setIsEditModalOpen(false)
                    }
                />

                <Modal.Container
                    className="w-[calc(100%-1.5rem)] max-h-[85vh] max-w-2xl overflow-y-auto sm:w-full sm:max-h-[80vh]"
                >

                    <Modal.Close
                        onClick={() =>
                            setIsEditModalOpen(false)
                        }
                    />

                    <ItemForm
                        item={item}

                        /*
                         * Same hookData from ItemsManager.
                         */
                        hookData={hookData}

                        isEditMode={true}

                        closeModal={() =>
                            setIsEditModalOpen(false)
                        }
                    />

                </Modal.Container>

            </Modal.Root>

        </li>
    );
}