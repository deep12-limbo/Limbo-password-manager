// components/CreateItemButton.jsx

import { useState } from "react";
import { useLocation } from "react-router-dom";

import Button from "../ui/Button";
import Modal from "../ui/Modal";
import ItemForm from "../../pages/ItemForm";
import { cn } from "../../utils/cn";
import { CreateIcon } from "../ui/icons";
import ROUTES from "../../routers/routespath";

export default function CreateItemButton({
    itemType,
    disabled,
    buttonVariant = "primary",
    /*
     * Complete hook data coming from ItemsManager.
     * Passed straight through to ItemForm.
     */
    hookData,
    themed = false,
    className = "", buttonClassName = "", iconClassName = "", iconSize = 14


}) {
    const [isCreateModalOpen, setIsCreateModalOpen] =
        useState(false);

    const location = useLocation();

    const isGoogleRoute =
        location.pathname === ROUTES.GOOGLE_ITEMS;

    const modalWidthClass = isGoogleRoute
        ? "w-[90%] sm:w-[80%] md:w-[65%] lg:w-[50%]"
        : "w-[90%] sm:w-[90%] md:w-[75%] lg:w-[70%]";

    const createItemHandler = () => {
        setIsCreateModalOpen(true);
    };

    return (
        <>
            {/* Create */}

            <Button.Root
                type="button"
                variant={buttonVariant}
                onClick={createItemHandler}
                disabled={disabled}
                className={cn(
                    "h-7 shrink-0 gap-1.5 px-3 py-0",
                    "text-[12px] whitespace-nowrap",
                    "max-[419px]:w-full",

                    themed && [
                        "text-white",
                        "bg-[linear-gradient(#ffffff04_0%,#ffffff10_100%)]",
                        "shadow-[inset_0_1px_#ffffff0d,0_0_0_1px_#ffffff40,inset_0_-1px_#0003]",
                        "transition-[background-image,background-color,box-shadow,transform] duration-200 ease-in-out",
                        "hover:brightness-110",
                        "hover:shadow-[inset_0_1px_#ffffff15,0_0_0_1px_#ffffff60,inset_0_-1px_#0003,0_0_12px_#ffffff18]",
                        "active:scale-[0.98]",
                        "[&_svg]:text-white",
                    ],

                    !themed && [
                        "bg-white text-black",
                        "hover:bg-gray-100",
                        "active:scale-[0.98]",
                    ],

                    className
                )}
            >
                <Button.Icon
                    className={cn(
                        "transition-colors duration-200 ease-in-out",
                        themed ? "text-white" : "text-black",
                        iconClassName
                    )}
                >
                    <CreateIcon size={iconSize} />
                </Button.Icon>

                <Button.Text
                    className={cn(
                        "text-[12px] font-medium leading-4 tracking-[0.2px]",
                        "transition-colors duration-200 ease-in-out",
                        themed ? "text-white" : "text-black",
                        buttonClassName
                    )}
                >
                    Create {itemType} Account
                </Button.Text>
            </Button.Root>

            {/* -----------------------------------------
                Create Modal
                ----------------------------------------- */}
            <Modal.Root
                open={isCreateModalOpen}
                setOpen={setIsCreateModalOpen}
            >
                <Modal.Overlay
                    onClick={() =>
                        setIsCreateModalOpen(false)
                    }
                />

                <Modal.Container
                    className={`${modalWidthClass} max-w-none max-h-[85vh] overflow-y-auto p-1`}
                >
                    <Modal.Close
                        onClick={() =>
                            setIsCreateModalOpen(false)
                        }
                    />

                    <ItemForm
                        /*
                         * Pass the COMPLETE hookData.
                         *
                         * ItemForm can now take the create
                         * portion from it.
                         */
                        hookData={hookData}
                        isEditMode={false}
                        closeModal={() =>
                            setIsCreateModalOpen(false)
                        }
                    />
                </Modal.Container>
            </Modal.Root>
        </>
    );
}