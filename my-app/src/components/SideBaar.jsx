import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ThemeContext } from "../context/themeContext";
import ROUTES from "../routers/routespath";
import Button from "./ui/Button";
import { cn } from "../utils/cn";
import {
    BankIcon,
    CloseIcon,
    CollapseSideBarIcon,
    DocumentsIcon,
    GoogleIcon,
    LogoutIcon,
    MoonIcon,
    NotesIcon,
    SunIcon,
    VaultIcon,
} from "./ui/icons";
import UserContext from "../context/user/usercontext";
import withSidebarButton from "./HOC/WithSideBarButton";

const SidebarButton = withSidebarButton(Button);

export default function Sidebar({
    isCollapsed,
    setIsCollapsed,
    isDrawer = false,
    setIsDrawerOpen,
}) {
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

        // Close drawer after navigation on mobile
        if (isDrawer) {
            setIsDrawerOpen?.(false);
        }
    };

    const handleAuthClick = () => {
        if (isLoggedIn) {
            logout();

            const login = ROUTES.LOGIN;

            if (location.pathname !== login) {
                navigate(login);
            }

            if (isDrawer) {
                setIsDrawerOpen?.(false);
            }
        }
    };
    const [showCollapseButton, setShowCollapseButton] = useState(false);

    return (
        <div
            onMouseOver={() => setShowCollapseButton(true)}
            onMouseLeave={() => setShowCollapseButton(false)}
            className={cn(
                "sidebar",
                "flex h-full w-full flex-col",
                "border-r border-border bg-surface shadow-sm",
                "py-3 px-2"
            )}
        >
            {/* Header */}
            <div
                className={cn(
                    "flex h-8 w-full items-center",
                    isCollapsed
                        ? "justify-center"
                        : "justify-between"
                )}
            >
                {isCollapsed ? (
                    /*
                     * Collapsed: show the "P" logo by default,
                     * swap to the expand button on hover (the
                     * hover state is tracked on the whole sidebar
                     * via showCollapseButton above).
                     */
                    showCollapseButton ? (
                        <button
                            type="button"
                            onClick={() => setIsCollapsed(false)}
                            className="
                                flex size-8 items-center justify-center
                                rounded-lg bg-surface-hover text-text
                            "
                            aria-label="Expand sidebar"
                        >
                            <CollapseSideBarIcon size={14} />
                        </button>
                    ) : (
                        <div
                            className="
                                flex size-8 items-center justify-center
                                rounded-lg bg-electric-violet-400
                                text-sm font-bold text-white
                            "
                        >
                            P
                        </div>
                    )
                ) : (
                    <>
                        <span className="text-[14px] font-semibold text-text-h">
                            Passwords
                        </span>

                        {isDrawer ? (
                            <button
                                type="button"
                                onClick={() => setIsDrawerOpen?.(false)}
                                className="
                                    flex size-7 items-center justify-center
                                    rounded-md text-text
                                    hover:bg-surface-hover hover:text-text-h
                                "
                                aria-label="Close sidebar"
                            >
                                <CloseIcon size={14} />
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setIsCollapsed(true)}
                                className="
                                    flex size-7 items-center justify-center
                                    rounded-md text-text
                                    hover:bg-surface-hover hover:text-text-h
                                "
                                aria-label="Collapse sidebar"
                            >
                                <CollapseSideBarIcon size={14} />
                            </button>
                        )}
                    </>
                )}
            </div>

            {/* Categories */}
            <div
                className={cn(
                    "h-5 text-start text-[11px] text-text-h",
                    isCollapsed && "invisible"
                )}
            >
                Categories
            </div>


            {/* Navigation */}
            <nav className="flex-1 space-y-[4px] py-4">

                <SidebarButton
                    active={isGoogleRoute}
                    isCollapsed={isCollapsed}
                    icon={<GoogleIcon size={3} />}
                    label="Google Items"
                    onClick={() =>
                        handleNavigation(ROUTES.GOOGLE_ITEMS)
                    }
                />

                <SidebarButton
                    active={isVaultRoute}
                    isCollapsed={isCollapsed}
                    icon={<VaultIcon size={4} />}
                    label="Vault Items"
                    onClick={() =>
                        handleNavigation(ROUTES.VAULT_ITEMS)
                    }
                />

                <SidebarButton
                    isCollapsed={isCollapsed}
                    icon={
                        <BankIcon
                            size={4}
                            className="text-textdim"
                        />
                    }
                    label="Bank Passwords"
                    textClassName="text-textdim"
                />

                <SidebarButton
                    isCollapsed={isCollapsed}
                    icon={
                        <DocumentsIcon
                            size={4}
                            className="text-textdim"
                        />
                    }
                    label="Documents"
                    textClassName="text-textdim"
                />

                <SidebarButton
                    isCollapsed={isCollapsed}
                    icon={
                        <NotesIcon
                            size={4}
                            className="text-textdim"
                        />
                    }
                    label="Notes"
                    textClassName="text-textdim"
                />
            </nav>

            {/* Theme */}
            <div className="py-2">
                <SidebarButton
                    active={false}
                    isCollapsed={isCollapsed}
                    icon={isDark ? <SunIcon /> : <MoonIcon />}
                    label={isDark ? "Light mode" : "Dark mode"}
                    onClick={toggleTheme}
                    textClassName="text-[11px]"
                    className="
                        text-text
                        hover:bg-surface-hover
                        hover:text-text-h
                        active:translate-y-0
                        active:shadow-none
                    "
                />
            </div>

            {/* Logout */}
            <div className="border-t border-border py-2">
                <SidebarButton
                    active={false}
                    isCollapsed={isCollapsed}
                    icon={<LogoutIcon />}
                    label="Logout"
                    onClick={handleAuthClick}
                    textClassName="text-[11px]"
                    className="
                        text-text
                        hover:bg-surface-hover
                        hover:text-text-h
                        active:translate-y-0
                        active:shadow-none
                    "
                />
            </div>
        </div>
    );
}