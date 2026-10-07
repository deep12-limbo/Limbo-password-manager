import { cn } from "../../utils/cn";

export default function withSidebarButton(ButtonComponent) {
    return function SidebarButton({
        active = false,
        isCollapsed,
        icon,
        label,
        onClick,
        className = "",
        textClassName = "",
        ...rest
    }) {
        return (
            <ButtonComponent.Root
                variant={active ? "primary" : "ghost"}
                onClick={onClick}
                title={isCollapsed ? label : undefined}
                className={cn(
                    "w-full rounded-sm px-3 py-[5px]",
                    "transition-all duration-200 ease-out",
                    "hover:bg-sidebar-item-hover",

                    "hover:text-sidebar-text",
                    "hover:border border-transparent",
                    "hover:border-r-overlay-08",
                    "hover:border-b-[rgba(129,129,129,0.05)]",
                    // "hover:border-l-3 border-l-white",
                    "hover:shadow-sidebar-item-hover",
                    // "hover:font-medium",
                    "hover:rounded-lg",

                    active && cn(
                        "bg-sidebar-item-hover",
                        "text-sidebar-text",
                        "border border-transparent",
                        "border-r-overlay-08",
                        "border-b-[rgba(129,129,129,0.05)]",
                        "border-l-3 border-l-white",
                        "shadow-sidebar-item-hover",
                        "font-medium",
                        "rounded-lg",
                        "hover:border-l-3 border-l-white"

                    ),


                    // ,!active && "hover:bg-surface-hover",


                    isCollapsed ? "justify-center px-0" : "justify-start",
                    className
                )}
                {...rest}
            >
                <ButtonComponent.Icon>
                    {icon}
                </ButtonComponent.Icon>

                {!isCollapsed && (
                    <ButtonComponent.Text
                        className={cn(
                            "text-[10px] font-sans tracking-wide text-start",
                            active
                                ? "text-sidebar-item-active font-bold"
                                : "text-text",
                            textClassName
                        )}
                    >
                        {label}
                    </ButtonComponent.Text>
                )}
            </ButtonComponent.Root>
        );
    };
}
