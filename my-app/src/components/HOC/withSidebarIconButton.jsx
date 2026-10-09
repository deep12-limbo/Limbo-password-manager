import { cn } from "../../utils/cn";

export default function withSidebarIconButton(IconButtonComponent) {
    return function SidebarIconButton({ className = "", ...props }) {
        return (
            <IconButtonComponent
                tone="none"
                className={cn(
                    "transition-all duration-200 ease-out",
                    "hover:bg-sidebar-item-hover hover:text-sidebar-text",
                    // "hover:border hover:border-transparent",
                    "hover:border-r-overlay-08",
                    "hover:border-b-[rgba(129,129,129,0.05)]",
                    "hover:shadow-sidebar-item-hover",
                    "hover:rounded-full",
                    className
                )}
                {...props}
            />
        );
    };
}