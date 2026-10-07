

import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBaar";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { cn } from "../utils/cn";

export default function Layout() {
    const [isCollapsed, setIsCollapsed] = useState(false)
    return (
        <div className="w-full min-h-svh flex">
            <aside
                className={cn(
                    "shrink-0 transition-[width] duration-300 ease-in-out",
                    isCollapsed ? "w-15" : "w-54"
                )}
            >
                <Sidebar
                    isCollapsed={isCollapsed}
                    setIsCollapsed={setIsCollapsed}
                />
            </aside>

            <div className="bg-surface min-h-svh min-w-0 flex-1 flex flex-col px-4">
                <main className="flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}