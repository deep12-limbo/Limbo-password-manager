
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import Button from "../ui/Button";
import FormField from "../ui/form/FormField";
import Modal from "../ui/Modal";
import ItemForm from "../../pages/ItemForm";
import { cn } from "../../utils/cn";
import { CloseIcon, CreateIcon, SearchIcon } from "../ui/icons";

export default function Toolbar({
    search,
    onSearchChange,
    selectedCount,
    isAllSelected,
    onToggleSelectAll,
    onBulkDelete,
    disabled,
    itemType,
    /*
     * Complete hook data coming from ItemsManager.
     */
    hookData,
}) {
    const [isCreateModalOpen, setIsCreateModalOpen] =
        useState(false);

    /*
     * Search form.
     */
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
    } = useForm({
        defaultValues: {
            search: search ?? "",
        },
    });

    const searchValue = watch("search");

    /*
     * Keep the input synchronized with the external search value.
     */
    useEffect(() => {
        setValue("search", search ?? "");
    }, [search, setValue]);

    /*
     * Open create modal.
     */
    const createItemHandler = () => {
        setIsCreateModalOpen(true);
    };

    /*
     * Search submit.
     */
    const onSubmit = (data) => {
        onSearchChange(data.search);
    };

    /*
     * Clear search input and trigger the search/API flow.
     */
    const cancelSearch = () => {
        reset({ search: "" });
        onSearchChange("");
    };

    // lg:w-[85%]
    // xl:w-[70%]

    return (
        <div className="flex w-full min-w-0 items-center justify-between gap-2">
            {/* -----------------------------------------
                Search
                ----------------------------------------- */}
            <form
                className="flex w-[50%]  items-center gap-2"
                onSubmit={handleSubmit(onSubmit)}
            >
                {/* <div className="relative h-4 min-w-0 flex-1 sm:h-9 sm:w-56 sm:flex-none md:w-64"> */}

                <div className="relative w-full ">
                    <FormField.Input
                        name="search"
                        register={register}
                        placeholder="Search item"
                        disabled={disabled}
                        className={cn(
                            "h-7 min-w-[230px] text-[12px] ",
                            searchValue && "pr-9"
                        )}
                    />

                    {searchValue ? (
                        <button
                            type="button"
                            onClick={cancelSearch}
                            disabled={disabled}
                            className={cn(
                                "absolute right-1.5 top-1/2",
                                "-translate-y-1/2",
                                "flex h-5 w-5 items-center justify-center",
                                "rounded-full text-foreground/50",
                                "transition-colors duration-150",
                                "hover:bg-foreground/10 hover:text-foreground",
                                "disabled:pointer-events-none disabled:opacity-50",
                                "cursor-pointer"
                            )}
                            aria-label="Clear search"
                            title="Clear search"
                        >
                            <CloseIcon size={14} />
                        </button>
                    ) :

                        (
                            <button
                                type="button"
                                onClick={cancelSearch}
                                disabled={disabled}
                                className={cn(
                                    "absolute right-1.5 top-1/2",
                                    "-translate-y-1/2",
                                    "flex h-5 w-5 items-center justify-center",
                                    "rounded-full text-foreground/50",
                                    "transition-colors duration-150",
                                    // "hover:bg-foreground/10 hover:text-foreground",
                                    "disabled:pointer-events-none disabled:opacity-50",
                                    // "cursor-pointer"
                                )}
                                aria-label="Clear search"
                                title="Clear search"
                            >
                                <SearchIcon size={14} />
                            </button>
                        )}
                </div>

                {/* </div> */}

                {/* <Button.Root
                    className="h-8 shrink-0 px-3 py-0 text-xs sm:h-9 sm:px-4 sm:text-sm md:h-10"
                    variant="outline"
                    disabled={disabled}
                    type="submit"
                >
                    <Button.Text>
                        Search
                    </Button.Text>
                </Button.Root> */}
            </form>

            {/* -----------------------------------------
                Create button
                ----------------------------------------- */}
            <Button.Root
                type="button"
                variant="primary"
                onClick={createItemHandler}
                disabled={disabled}
                className={cn(
                    "h-7 shrink-0 gap-1.5 px-3 py-0 ",
                    "bg-neutral-900 dark:bg-neutral-50",
                    "text-[12px] text-white dark:text-black   whitespace-nowrap"
                )}
            >
                <Button.Icon>
                    <CreateIcon size={14} />
                </Button.Icon>

                <Button.Text>
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

                <Modal.Container className="w-[calc(100%-1.5rem)] max-w-2xl max-h-[85vh] overflow-y-auto sm:w-full sm:max-h-[80vh]">
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
        </div>
    );
}

