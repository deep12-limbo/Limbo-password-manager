import { useForm } from "react-hook-form";
import { useEffect } from "react";

import Button from "../ui/Button";
import FormField from "../ui/form/FormField";
import { cn } from "../../utils/cn";
import { CloseIcon, SearchIcon } from "../ui/icons";
import CreateItemButton from "./CreateItemButton";

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

    return (
        <div className="flex w-full min-w-0 items-center justify-between gap-2 max-[419px]:flex-col max-[419px]:items-stretch">
            {/* -----------------------------------------
                Search
                ----------------------------------------- */}
            <form
                className="flex w-full max-w-[400px] min-w-0 flex-1 items-center gap-2 max-[419px]:max-w-none" onSubmit={handleSubmit(onSubmit)}
            >
                <div className="relative w-full min-w-0">
                    <FormField.Input
                        name="search"
                        register={register}
                        placeholder="Search item"
                        disabled={disabled}
                        className={cn(
                            "h-7 w-full min-w-0 text-[12px] bg-sidebar-item-hover rounded-md h-8",
                            searchValue && "pr-9 "
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
                                "rounded-md text-foreground/50",
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
                    ) : (
                        <button
                            type="button"
                            disabled={disabled}
                            className={cn(
                                "absolute right-1.5 top-1/2",
                                "-translate-y-1/2",
                                "flex h-5 w-5 items-center justify-center",
                                "rounded-full text-foreground/50",
                                "disabled:pointer-events-none disabled:opacity-50"
                            )}
                            aria-label="Search"
                            title="Search"
                        >
                            <SearchIcon size={14} />
                        </button>
                    )}
                </div>
            </form>

            <CreateItemButton
                itemType={itemType}
                disabled={disabled}
                hookData={hookData}
                className="bg-neutral-900 dark:bg-neutral-50 h-[33px]"
            />
        </div>
    );
}