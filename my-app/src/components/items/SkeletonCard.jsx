import { cn } from "../../utils/cn";
export default function SkeletonCard({ className = "" }) {
    const pulse = "animate-pulse bg-white/10";

    return (
        <div
            className={cn(
                "relative block min-w-full h-28.5 rounded-[12px] border border-[#ffffff0f]",
                "flex flex-col justify-center px-3 p-[16px]",
                "bg-sidebar-item-hover shadow-[inset_0_1px_#ffffff0d]",
                className
            )}
            aria-hidden="true"
        >
            {/* Name row */}
            <div className="flex w-full items-center justify-between">
                <div className="flex h-full w-[30%] items-center gap-x-4 ">
                    <div className={cn("h-3 w-32 rounded-md", pulse)} />
                </div>

                {/* Action icon placeholder */}
                <div className={cn("h-3 w-5 rounded-full", pulse)} />
            </div>

            {/* Notes placeholder */}
            <div className={cn("mt-2 h-3 w-[65%] rounded-md", pulse)} />

            {/* Website and email placeholders */}
            <div className="mt-3 flex items-center gap-3">
                <div className="flex min-w-0 items-center gap-1">
                    <div className={cn("h-3 w-4 shrink-0 rounded-full", pulse)} />
                    <div className={cn("h-3 w-28 max-w-full rounded", pulse)} />
                </div>

                <div className="flex min-w-0 items-center gap-1">
                    <div className={cn("h-4 w-4 shrink-0 rounded-full", pulse)} />
                    <div className={cn("h-3 w-24 max-w-full rounded", pulse)} />
                </div>
            </div>
        </div>
    );
}