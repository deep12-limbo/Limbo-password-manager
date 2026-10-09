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

    className = "",buttonClassName =""
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
                    "text-[12px] text-white dark:text-black",
                    "whitespace-nowrap",
                    "max-[419px]:w-full",
                    className
                )}
            >
                <Button.Icon>
                    <CreateIcon size={14} />
                </Button.Icon>

                <Button.Text className={buttonClassName}>
                    Create {itemType} Item
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