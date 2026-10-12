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
                        "transition-[width] duration-300 ease-in-out h-[100vh] sticky top-0",
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
                <main className="flex min-w-0 flex-1 flex-col">
                    {isMobile ? (
                        <div className="phone-navbar mt-4 flex w-full shrink-0 items-center justify-between gap-3">
                            <button
                                type="button"
                                onClick={() => setIsDrawerOpen(true)}
                                aria-label="Open navigation drawer"
                                className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center"
                            >
                                <span className="flex flex-col gap-[6px]">
                                    <span className="h-[2px] w-5 rounded-full bg-foreground" />
                                    <span className="h-[2px] w-3.5 rounded-full bg-foreground" />
                                </span>
                            </button>

                            <div className="min-w-0 flex-1 text-end">
                                <div className="bg-gradient-to-l from-[#64748b] via-[#e2e8f0] to-[#94a3b8] bg-clip-text text-2xl font-semibold text-transparent">
                                    Your Digital Vault
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className=" min-w-0 text-start mt-[.5rem]">
                            <div className="bg-gradient-to-l from-[#64748b] via-[#e2e8f0] to-[#94a3b8] bg-clip-text text-2xl font-semibold text-transparent">
                                Your Digital Vault
                            </div>
                            <div className="mt-.5 1 text-xs">
                                Safely manage nd access your passwords
                            </div>
                        </div>
                    )}

                    <div className="min-w-0 flex-1">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}