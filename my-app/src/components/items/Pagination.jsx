import { cn } from "../../utils/cn";
import Button from "../ui/Button";




function PaginationButton({
    children,
    active = false,
    disabled = false,
    onClick,
    className = "",
    textClassName = "",
    type = "button",
}) {
    const baseClasses =
        "group transition-colors focus:ring-gray-800 shadow-inner  bg-gray-900 "
    const inactiveClasses =
        "text-text hover:text-heading border border-gray-50 dark:border-gray-800   dark:focus:ring-gray-600 opacity-70 hover:opacity-100 transition-colors easy-out duration-1000";

    const activeClasses =
        " text-white border border-gray-900 dark:bg-white dark:text-gray-900 dark:border-white";

    return (
        <Button.Root
            type={type}
            variant="none"
            size="sm"
            disabled={disabled}
            onClick={onClick}
            className={cn(
                baseClasses,
                active ? activeClasses : inactiveClasses,
                className
            )}
        >
            <Button.Text
                className={cn(
                    "transition-colors",
                    active
                        ? "text-white dark:text-gray-900 group-hover:text-white dark:group-hover:text-gray-900"
                        : "text-text-dim group-hover:text-text-heading",
                    textClassName
                )}
            >
                {children}
            </Button.Text>
        </Button.Root>
    );
}


export default function Pagination({
    page,
    onPageChange,
    disabled = false,
}) {

    const totalPages = 9;



    const getPages = () => {
        if (page <= 1) {
            return [1, 2, 3];
        }

        if (page >= totalPages) {
            return [totalPages - 2, totalPages - 1, totalPages];
        }

        return [page - 1, page, page + 1];
    };
    const pages = getPages()

    return (
        <div className="flex items-center justify-center gap-2 mt-[2rem]">
            <PaginationButton
                className="w-20"
                disabled={disabled || page === 1}
                onClick={() => onPageChange(page - 1)}
            >
                Previous
            </PaginationButton>

            <div className="mx-5 flex items-center gap-2">
                {pages.map((item, index) => {
                    if (item === "...") {
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                className={cn(
                                    "inline-flex h-[29.34px] w-[31.99px] shrink-0 cursor-default items-center justify-center rounded-sm border border-gray-300 px-0 py-0 text-xs text-text-dim transition-colors dark:border-gray-700 lg:h-[32.84px] lg:w-[35.80px]"
                                )}
                            >
                                ···
                            </span>
                        );
                    }

                    const isActive = item === page;

                    return (
                        <PaginationButton
                            key={index}
                            active={isActive}
                            disabled={disabled}
                            onClick={() => onPageChange(item)}
                        >
                            {item}
                        </PaginationButton>
                    );
                })}
            </div>

            <PaginationButton
                className="w-20"
                disabled={disabled || page === totalPages}
                onClick={() => onPageChange(page + 1)}
            >
                Next
            </PaginationButton>
        </div>
    );
}