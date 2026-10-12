import { useEffect, useRef, useState } from "react";

import { cn } from "../../utils/cn";

import Checkbox from "../ui/form/Checkbox";
import {
    EditIcon,
    ChevronLeftIcon,
    EyeIcon,
    EyeOffIcon,
    OpenTabIcon,
    ArrowOutwardIcon,
    MailIcon,
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
    className = "",
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
                "text-foreground dark:hover:bg-neutral-950 hover:text-foreground",
                tone === "none" && "",
                className
            )}
        >
            {isLoading ? <Spinner /> : children}
        </button>
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

    const cardRef = useRef(null);
    const [isCompact, setIsCompact] = useState(false);

    useEffect(() => {
        const element = cardRef.current;
        if (!element) return;

        const observer = new ResizeObserver(([entry]) => {
            setIsCompact(entry.contentRect.width < 300);
            console.log("entry.contentRect.width", entry.contentRect.width)
        });

        observer.observe(element);

        return () => observer.disconnect();
    }, []);


    return (
        <li className=""
        // className={cn(
        //     "w-full overflow-hidden  bg-surface shadow-md dark:shadow-[0_4px_12px_rgba(0,0,0,0.2)] mb-4 md:mb-0",
        //     selected &&
        //     "border-electric-violet-400 bg-electric-violet-300 dark:bg-electric-violet-500",

        //     "md:overflow-visible md:rounded-none md:border-0 md:bg-transparent md:shadow-none",
        //     selected && "md:bg-transparent dark:md:bg-transparent",

        //     disabled && "pointer-events-none opacity-60"
        // )}
        >


            {/* className={cn(
    "transition-all duration-200 ease-out",
    "bg-sidebar-item-hover/80 hover:bg-sidebar-item-hover",
    "text-textdim hover:text-heading",
    "border border-transparent hover:border-border",
    className
)} */}

            {/* <div
                className={cn(
                    "min-w-full min-h-10 py-1 rounded-full m-1 ",
                    "flex flex-col  justify-center px-3",
                    "bg-sidebar-item-hover",
                    "hover:border hover:border-[1px]  border-border",
                    "",
                )}
            >
                <div className="flex justify-between w-full items-center">

                    <div className="flex gap-x-4 h-full w-[30%] items-center justify-start">
                        {checkbox}

                        <div className="text-[15px] font-medium text-foreground/80 ">
                            {item?.name && item?.name[0].toUpperCase() + item?.name && item?.name.slice(1)}
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






            </div> */}


            <div
                ref={cardRef}
                className={cn(
                    // "timeline-marker-overlay",
                    "min-w-full min-h-10 p-card-padding rounded-full  ",
                    "flex flex-col  justify-center px-3",
                    "bg-sidebar-item-hover",
                    "hover:border hover:border-[1px]  border-border",
                    "",
                    "p-[16px]",
                    "cursor-pointer rounded-[inherit] border border-[#ffffff0f] transition-[background-color] duration-150 ease-in-out block relative shadow-[inset_0_1px_#ffffff0d]"
                    , "rounded-[12px]",
                    // "bg-[linear-gradient(138deg,#1a1a1bb3_22.83%,#000000b3_82.19%),var(--grey-900)]"
                )}
                style={{
                    // boxShadow:
                    // "0 0 12px 2px #2727290a, inset 0 1px 0 #ffffff12, inset 0 -1px 0 #00000012",
                    // background:
                    // "linear-gradient(138deg, #19191ab3 22.83%, #000000b3 95.19%), rgb(13 24 46)",
                }}
            >
                <div className="flex justify-between w-full items-center">

                    <div className="pl-1.5 flex gap-x-4 h-full w-[30%] items-center justify-between">

                        {checkbox}

                        <div
                            className="flex text-[20px] font-medium text-text"
                        >
                            {item?.name
                                ? item.name.charAt(0).toUpperCase() + item.name.slice(1)
                                : ""}
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
                <div className=" pl-1.5 w-full h-4 mt-2 flex    justify-start text-[12px] font-md text-[#9c9c9d]">
                    {item?.notes
                        ? item.notes.charAt(0).toUpperCase() + item.notes.slice(1)
                        : ""}
                </div>
                <div
                    className={cn(
                        "mt-3 flex items-center text-gray-400",
                        isCompact
                            ? "flex-col items-start gap-y-[5px] w-full mt-5"
                            : "flex-row gap-2"
                    )}
                >
                    {/* Website */}
                    {item?.website && (
                        <div className="flex min-w-0 items-center gap-1">


                            <a
                                href={
                                    /^https?:\/\//i.test(item.website)
                                        ? item.website
                                        : `https://${item.website}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center truncate text-gray-400 underline underline-offset-2 transition-colors duration-150 ease-out hover:text-gray-50 text-[12px]"
                            >
                                <IconButton
                                    tone="quiet"
                                    label="Open website in new tab"
                                    animation={true}
                                    onClick={() =>
                                        window.open(
                                            /^https?:\/\//i.test(item.website)
                                                ? item.website
                                                : `https://${item.website}`,
                                            "_blank",
                                            "noopener,noreferrer"
                                        )
                                    }

                                >
                                    <OpenTabIcon size={10} className="text-gray-400 transition-colors duration-150 ease-out hover:text-gray-50" />
                                </IconButton>
                                {item.website}
                            </a>


                        </div>
                    )}

                    {/* Email */}
                    {item?.email && (
                        <a
                            href={`mailto:${item.email}`}
                            className=" min-w-0  text-[12px] "
                        >
                            <div className="flex  items-center justify-between ">
                                <IconButton
                                    tone="quiet"
                                    label="Open website in new tab"
                                    className=" hover:bg-transparent"
                                    onClick={() =>
                                        window.open(
                                            /^https?:\/\//i.test(item.website)
                                                ? item.website
                                                : `https://${item.website}`,
                                            "_blank",
                                            "noopener,noreferrer"
                                        )
                                    }
                                >
                                    <MailIcon size="10" className="text-gray-400 transition-colors duration-150 ease-out hover:text-gray-50" />
                                </IconButton>
                                {/* <MailIcon size={14} className="h-4 w-4" /> */}
                                {item.email}
                            </div>

                        </a>
                    )}
                </div>








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