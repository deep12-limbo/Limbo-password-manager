import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBaar";
import { useEffect, useState } from "react";
import { cn } from "../utils/cn";

export default function Layout() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    /*
     * Drawer mode below 778px.
     */
    const [isMobile, setIsMobile] = useState(
        window.innerWidth < 778
    );

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 778);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    /*
     * Close drawer automatically when moving
     * back to desktop size.
     */
    useEffect(() => {
        if (!isMobile) {
            setIsDrawerOpen(false);
        }
    }, [isMobile]);

    return (
        <div className="flex min-h-svh w-full">

            {/* Desktop sidebar */}
            {!isMobile && (
                <aside
                    className={cn(
                        "shrink-0",
                        "transition-[width] duration-300 ease-in-out",
                        isCollapsed ? "w-15" : "w-54"
                    )}
                >
                    <Sidebar
                        isCollapsed={isCollapsed}
                        setIsCollapsed={setIsCollapsed}
                        isDrawer={false}
                    />
                </aside>
            )}

            {/* Mobile drawer */}
            {isMobile && isDrawerOpen && (
                <aside
                    className={cn(
                        "fixed inset-y-0 left-0 z-50",
                        "w-54", "sidebar",
                        "transition-transform duration-300 ease-in-out"
                    )}
                >
                    <div className="w-full h-full bg-background">

                        <Sidebar
                            isCollapsed={false}
                            setIsCollapsed={setIsCollapsed}
                            isDrawer={true}
                            setIsDrawerOpen={setIsDrawerOpen}
                        />
                    </div>
                </aside>
            )}

            {/* Drawer overlay */}
            {isMobile && isDrawerOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
                    onClick={() => setIsDrawerOpen(false)}
                />
            )}

            {/* Main content */}
            <div
                className={cn(
                    "min-h-svh min-w-0 flex-1 bg-surface",
                    "flex flex-col",
                    "px-4"
                )}
            >
                {/* Mobile drawer trigger */}
                {isMobile && (
                    <button
                        type="button"
                        onClick={() => setIsDrawerOpen(true)}
                        className="mt-3 flex h-8 w-8 items-center justify-center cursor-pointer"
                    >
                        <span className="flex flex-col gap-[6px]">
                            <span className="h-[2px] w-5 rounded-full bg-foreground" />
                            <span className="h-[2px] w-3.5 rounded-full bg-foreground" />
                        </span>
                    </button>
                )}

                <main className="flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}