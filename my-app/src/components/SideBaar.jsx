import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ThemeContext } from "../context/themeContext";
import ROUTES from "../routers/routespath";
import Button from "./ui/Button";
import { cn } from "../utils/cn";
import { BankIcon, ChevronLeftIcon, ChevronRightIcon, DocumentsIcon, GoogleIcon, LogoutIcon, MoonIcon, NotesIcon, SunIcon, VaultIcon } from "./ui/icons";
import UserContext from "../context/user/usercontext";
import withSidebarButton from "./HOC/WithSideBarButton";




// .sidebar-item--active {
//   background: var(--sidebar-item-hover-bg);
//   color: var(--sidebar-text);
//   border: 1px solid transparent;
//   border-right: 1px solid var(--overlay-08);
//   border-bottom: 1px solid rgba(129, 129, 129, 0.05);
//   box-shadow: var(--sidebar-item-hover-shadow);
//   font-weight: 500;
// }

// .sidebar-item--active .sidebar-item-label {
//   color: var(--sidebar-item-active);
// }
// /* Remove the blue left border — not needed with this style */
// .sidebar-item--active::before {
//   display: none;
// }




const SidebarButton = withSidebarButton(Button);

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
    const navigate = useNavigate();
    const location = useLocation();

    const { toggleTheme, isDark } = useContext(ThemeContext);
    const { isLoggedIn, logout } = useContext(UserContext);


    const isGoogleRoute =
        location.pathname === ROUTES.GOOGLE_ITEMS;

    const isVaultRoute =
        location.pathname === ROUTES.VAULT_ITEMS;

    const handleNavigation = (route) => {
        navigate(route);
    };


    const handleAuthClick = () => {
        if (isLoggedIn) {
            logout();
            const login = ROUTES.LOGIN;

            if (location.pathname !== login) {
                navigate(login);
            }

            return;
        }

    };

    return (
        <aside
            className={cn(
                "sidebar",
                "fixed  flex h-screen shrink-0 flex-col",
                "border-r border-border bg-surface shadow-sm border-r-1 border-border",
                "transition-[width] duration-300 ease-in-out z-[1] py-5 px-3",
                isCollapsed ? "w-15" : "w-54"
            )}
        >
            {/* Header */}
            <div
                className={cn(
                    "flex h-10 items-start",
                    isCollapsed
                        ? "justify-center "
                        : "justify-between "
                )}
            >
                {/* Logo / App Icon */}

                {isCollapsed ? (
                    <div
                        className="
                            flex size-10 items-center justify-center
                            rounded-lg bg-electric-violet-400 text-white
                            text-xl font-bold
                        "
                    >
                        P
                    </div>
                ) : (
                    <div className="flex items-center gap-3">

                        {/* logo */}
                        {/* <div
                            className="
                                flex size-9 items-center justify-center
                                rounded-lg bg-electric-violet-400 text-white
                                font-bold
                            "
                        >
                            P
                        </div> */}

                        <span className="font-semibold text-text-h text-[16x]  ">
                            Passwords
                        </span>

                    </div>
                )}



                {/* Collapse button */}
                {/* <button
                    type="button"
                    onClick={() => {
                        setIsCollapsed((prev) => !prev);
                    }

                    }
                    className={cn(
                        "flex size-9 items-center justify-center rounded-md",
                        "text-text transition-colors",
                        "hover:bg-accent-bg hover:text-text-h",
                        isCollapsed && "hidden"
                    )}
                    aria-label="Collapse sidebar"
                >
                    <ChevronLeftIcon />
                </button> */}
            </div>


            {/* Collapsed expand button */}

            {/* removing the feature of collapsing the sidebar date- 05-10    */}

            {/* {isCollapsed && (
                <div className="flex justify-center py-3">
                    <button
                        type="button"
                        onClick={() => setIsCollapsed(false)}
                        className="
                            flex size-9 items-center justify-center
                            rounded-md text-text
                            hover:bg-accent-bg hover:text-text-h
                            transition-colors
                        "
                        aria-label="Expand sidebar"
                    >
                        <ChevronRightIcon />
                    </button>
                </div>
            )} */}




            <div className="text-start text-[12px] text-text-h ">
                Categories
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-[4px] py-4">

                {/* Google */}
                <SidebarButton
                    active={isGoogleRoute}
                    isCollapsed={isCollapsed}
                    icon={<GoogleIcon size={3} />}
                    label="Google Items"
                    onClick={() => handleNavigation(ROUTES.GOOGLE_ITEMS)}
                />

                <SidebarButton
                    active={isVaultRoute}
                    isCollapsed={isCollapsed}
                    icon={<VaultIcon size={4} />}
                    label="Vault Items"
                    onClick={() => handleNavigation(ROUTES.VAULT_ITEMS)}
                />

                <SidebarButton
                    isCollapsed={isCollapsed}
                    icon={<BankIcon size={4} />}
                    label="Bank Passwords"
                    onClick={() => handleNavigation(ROUTES.VAULT_ITEMS)}
                />

                <SidebarButton
                    isCollapsed={isCollapsed}
                    icon={<DocumentsIcon size={4} />}
                    label="Documents"
                    onClick={() => handleNavigation(ROUTES.VAULT_ITEMS)}
                />

                <SidebarButton
                    isCollapsed={isCollapsed}
                    icon={<NotesIcon size={4} />}
                    label="Notes"
                    onClick={() => handleNavigation(ROUTES.VAULT_ITEMS)}
                />

            </nav>




            {/* Bottom theme toggle */}



            <div className="py-2">
                <SidebarButton
                    active={false}
                    isCollapsed={isCollapsed}
                    icon={isDark ? <SunIcon /> : <MoonIcon />}
                    label={isDark ? "Light mode" : "Dark mode"}
                    onClick={toggleTheme}
                    textClassName="text-[11px]"
                    className="text-text hover:bg-surface-hover hover:text-text-h active:translate-y-0 active:shadow-none"
                />
            </div>

            <div className="border-t border-border py-2">
                <SidebarButton
                    active={false}
                    isCollapsed={isCollapsed}
                    icon={<LogoutIcon />}
                    label="Logout"
                    onClick={handleAuthClick}
                    textClassName="text-[11px]"
                    className="text-text hover:bg-surface-hover hover:text-text-h active:translate-y-0 active:shadow-none"
                />
            </div>
        </aside>
    );
}
