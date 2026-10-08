import Button from "../ui/Button";

export default function Pagination({
    page,
    totalPages,
    onPageChange,
    disabled = false,
}) {

    //  if (!totalPages || totalPages <= 1) {
    //         return null;
    //     }

    const getPages = () => {
        const pages = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }

            return pages;
        }

        pages.push(1);

        if (page > 4) {
            pages.push("...");
        }

        const start = Math.max(2, page - 1);
        const end = Math.min(totalPages - 1, page + 1);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (page < totalPages - 3) {
            pages.push("...");
        }

        pages.push(totalPages);

        return pages;
    };

    const pages = getPages();

    return (
        <div className="flex  items-center justify-center gap-2">
            <Button.Root
                variant="outline"
                size="sm"
                disabled={disabled || page === 1}
                onClick={() => onPageChange(page - 1)}
            // isLoading={http.isLoading}

            >
                <Button.Text className="text-text">
                    Previous
                </Button.Text>
            </Button.Root>

            <div className="flex items-center gap-1 mx-5">
                {pages.map((item, index) => {
                    if (item === "...") {
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                className="px-2"
                            >
                                ...
                            </span>
                        );
                    }

                    const isActive = item === page;

                    return (
                        <Button.Root
                            key={item}
                            size="sm"
                            variant={isActive ? "primary" : "outline"}
                            disabled={disabled}
                            onClick={() => onPageChange(item)}
                        >
                            <Button.Text>
                                {item}
                            </Button.Text>
                        </Button.Root>
                    );
                })}
            </div>

            <Button.Root
                variant="outline"
                size="sm"
                disabled={disabled || page === totalPages}
                onClick={() => onPageChange(page + 1)}
            >
                <Button.Text className="text-text">
                    Next
                </Button.Text>
            </Button.Root>
        </div>
    );


}
