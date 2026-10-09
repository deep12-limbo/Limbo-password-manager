import { cn } from "../../utils/cn";

function Spinner({ className = "" }) {
    return (
        <div
            role="status"
            aria-label="Loading"
            className={cn(
                "h-5 w-5 animate-spin rounded-full border-2 border-spinner  border-t-border",
                className
            )}
        />
    );
}


export default Spinner;