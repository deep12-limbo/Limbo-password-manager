import { useState } from "react";

import { cn } from "../../utils/cn";

import Checkbox from "../ui/form/Checkbox";
import {
    EditIcon,
    ChevronLeftIcon,
    EyeIcon,
    EyeOffIcon,
    OpenTabIcon,
    ArrowOutwardIcon,
} from "../ui/icons";

import Modal from "../ui/Modal";
import ItemForm from "../../pages/ItemForm";
import Spinner from "../ui/Spinner";
import Button from "../ui/Button";
import { Link, useLocation } from "react-router-dom";
import ROUTES from "../../routers/routespath";


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
                "inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-colors",
                "disabled:cursor-not-allowed disabled:opacity-40",
                "[&>svg]:h-3.5 [&>svg]:w-3.5",

                tone === "accent" &&
                "text-accent-700 hover:bg-electric-violet-100",

                tone === "danger" &&
                "text-red-400 hover:bg-red-100",

                tone === "quiet" &&
                "text-foreground dark:hover:bg-neutral-950 hover:text-foreground"
            )}
        >
            {isLoading ? <Spinner /> : children}
        </button>
    );
}


function ItemDetails({
    item,
    listconfig,
    onDelete,
    disabled,
    setIsEditModalOpen,
}) {
    const [showPassword, setShowPassword] = useState(false);

    const detailFields = listconfig?.detailFields || [];
    const fields = detailFields.filter((field) => field.key !== "name");
    console.log("fields", fields);

    return (
        <div className="mt-2 px-1 pb-3">
            <div className="w-full rounded-xs border border-border px-3 py-2.5">
                <div className="flex w-full flex-wrap justify-start gap-x-6 gap-y-3">
                    {fields.map((field) => {
                        const rawValue = item?.[field.key];
                        const value = field.format ? field.format(rawValue) : rawValue;

                        const isEmpty =
                            rawValue === null ||
                            rawValue === undefined ||
                            rawValue === "";

                        const isPassword = field.key === "password";
                        const isWebsite = field.key === "website"

                        if (isPassword) {
                            return (
                                <div
                                    key={field.key}
                                    className="flex  min-w-0 items-center gap-2 text-left"
                                >
                                    <span className="shrink-0 text-[11px] text-foreground/40">
                                        {field.label}:
                                    </span>

                                    <div className="flex flex-1 items-center justify-between gap-2 rounded-xs  p-1">
                                        <span
                                            className={cn(
                                                "truncate text-xs font-medium w-[120px]",
                                                isEmpty ? "text-foreground/30" : "text-foreground/90"
                                            )}
                                        >
                                            {isEmpty ? "—" : showPassword ? value : "••••••••"}
                                        </span>

                                        {!isEmpty && (
                                            <IconButton
                                                tone="quiet"
                                                label={showPassword ? "Hide password" : "Show password"}
                                                disabled={disabled}
                                                onClick={() => setShowPassword((prev) => !prev)}
                                            >
                                                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                            </IconButton>
                                        )}
                                    </div>
                                </div>
                            );
                        }
                        if (isWebsite) {
                            return <div
                                key={field.key}
                                className="w-full min-w-0 text-left text-xs leading-5 sm:w-[calc(50%-0.75rem)] flex flex-row"
                            >
                                <span className="mr-1 text-[11px] text-foreground/40">
                                    {field.label}:
                                </span>
                                <div>


                                    <a
                                        href={
                                            value.startsWith("http://") || value.startsWith("https://")
                                                ? value
                                                : `https://${value}`
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={cn(
                                            "flex flex-row font-medium",
                                            isEmpty
                                                ? "text-foreground/30"
                                                : field.muted
                                                    ? "text-foreground/60"
                                                    : "text-foreground/90"
                                        )}

                                    >

                                        {isEmpty ? "N/A" : <span className="flex flex-row gap-x-1 items-center text-blue-300  underline decoration-blue-300">
                                            {value} <OpenTabIcon className="text-blue-300" size={17} />
                                        </span>}
                                    </a>
                                </div>
                            </div>
                        }
                        return (
                            <div
                                key={field.key}
                                className="w-full min-w-0 text-left text-xs leading-5 sm:w-[calc(50%-0.75rem)]"
                            >
                                <span className="mr-1 text-[11px] text-foreground/40">
                                    {field.label}:
                                </span>

                                <span
                                    className={cn(
                                        "font-medium",
                                        isEmpty
                                            ? "text-foreground/30"
                                            : field.muted
                                                ? "text-foreground/60"
                                                : "text-foreground/90"
                                    )}
                                >
                                    {isEmpty ? "N/A" : value}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Actions */}
            <div className="mt-3 flex w-full gap-2">
                <button
                    type="button"
                    disabled={disabled}
                    onClick={() => onDelete?.(item?.id)}
                    className={cn(
                        "h-8 flex-1 rounded-xs",
                        "border border-border",
                        "text-xs font-medium",
                        "text-foreground/80",
                        "transition-colors",
                        "hover:bg-surface-hover",
                        "hover:text-danger",
                        "disabled:pointer-events-none",
                        "disabled:opacity-50"
                    )}
                >
                    Delete
                </button>

                <Button.Root
                    type="button"
                    disabled={disabled}
                    variant="primary"
                    onClick={() => setIsEditModalOpen((prev) => !prev)}
                    className={cn(
                        "h-8 flex-1 rounded-xs",
                        // "bg-primary",
                        "text-xs font-medium",
                        "text-primary-foreground",
                        "transition-colors",
                        "hover:opacity-90",
                        "disabled:pointer-events-none",
                        "disabled:opacity-50"
                    )}
                >
                    <Button.Text>

                        Edit
                    </Button.Text>
                </Button.Root>
            </div>
        </div>
    );
}


export default function Item({
    item,
    index,
    selected,
    onSelect,
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


    console.log("item", item, "hookdata", hookData)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);



    const checkbox = (
        <Checkbox
            checked={selected}
            disabled={disabled}
            onChange={() => onSelect(item?.id)}
            aria-label={`Select ${item?.name}`}
            boxClassName={
                selected
                    ? "border-primary-foreground bg-primary-foreground/25"
                    : ""
            }
        />
    );



    // modal design controller 
    const location = useLocation();

    const isGoogleRoute =
        location.pathname === ROUTES.GOOGLE_ITEMS;

    const modalWidthClass = isGoogleRoute
        ? "w-[90%] sm:w-[80%] md:w-[65%] lg:w-[50%]"
        : "w-[90%] sm:w-[90%] md:w-[75%] lg:w-[70%]";

    // const fieldsWrapperClass = isGoogleRoute
    //     ? "grid grid-cols-1 gap-4 md:grid-cols-2"
    //     : "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3";

    // console.log("fieldsWrapperClass", fieldsWrapperClass)
    return (
        <li
        // className={cn(
        //     "w-full overflow-hidden  bg-surface shadow-md dark:shadow-[0_4px_12px_rgba(0,0,0,0.2)] mb-4 md:mb-0",
        //     selected &&
        //     "border-electric-violet-400 bg-electric-violet-300 dark:bg-electric-violet-500",

        //     "md:overflow-visible md:rounded-none md:border-0 md:bg-transparent md:shadow-none",
        //     selected && "md:bg-transparent dark:md:bg-transparent",

        //     disabled && "pointer-events-none opacity-60"
        // )}
        >

            <div
                className={cn(
                    "min-w-full min-h-10 py-1 rounded-xs border border-[1px] border-border",
                    "flex flex-col  justify-center px-3",
                    "transition-colors",

                )}
            >
                <div className="flex justify-between w-full items-center">

                    <div className="flex gap-x-4 h-full w-[30%] items-center justify-start">
                        {checkbox}

                        <div className="text-[15px] font-medium text-foreground/80 truncate">
                            {item.name[0].toUpperCase() + item.name.slice(1)}
                        </div>
                    </div>

                    <IconButton
                        tone="quiet"
                        label={expanded ? "Hide details" : "Show details"}
                        disabled={disabled}
                        onClick={() => setIsEditModalOpen(prev => !prev)}
                    >
                        <ArrowOutwardIcon
                            // className={cn(
                            //     "transition-transform duration-200",
                            //     expanded ? "rotate-90" : "-rotate-90"
                            // )}
                            className="text-textdim hover:text-text transition-colors ease-out"
                        />
                    </IconButton>
                </div>

                {/* {expanded && (

                    // <ItemDetails
                    //     item={item}
                    //     listconfig={listconfig}
                    //     onDelete={onDelete}
                    //     disabled={disabled}
                    //     setIsEditModalOpen={setIsEditModalOpen}
                    // />
                )} */}

            </div>


            {/* Edit modal */}
            <Modal.Root
                open={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                className="p-1"
            >
                <Modal.Overlay onClick={() => setIsEditModalOpen(false)} />

                <Modal.Container
                    className={`${modalWidthClass} max-w-none max-h-[85vh] overflow-y-auto p-1`}
                >
                    <Modal.Title></Modal.Title>
                    {/* <Modal.Close onClick={() => setIsEditModalOpen(false)} /> */}

                    <ItemForm
                        item={item}
                        hookData={hookData}
                        isEditMode={true}


                        titleClassName="text-[14px] font-semibold "
                        formClassName="gap-3"
                        errorClassName="mt-2 text-sm text-red-500"

                        FormclassName="border-0 p-0"
                        fieldsWrapperClassName=""
                        showSubmit={true}
                        submitLabel="Save"
                        submitVariant="primary"
                        submitSize="md"
                        onlyDirtyFields

                        readOnly={true}
                        disabled={false}

                        // if inside modal , close the modal using this ...
                        closeModal={() => setIsEditModalOpen(false)}

                    />
                </Modal.Container>
            </Modal.Root>

        </li >
    );
}