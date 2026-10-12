import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IconButton } from "./items/Item";
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
    DockToRightIcon,
    DockToLeftIcon,
    ArrowOutwardIcon
} from "./ui/icons";
import UserContext from "../context/user/usercontext";
import withSidebarButton from "./HOC/WithSideBarButton";
import withSidebarIconButton from "./HOC/withSidebarIconButton";


const SidebarIconButton = withSidebarIconButton(IconButton);
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
                "py-3 px-2",

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
                    showCollapseButton ? (
                        <SidebarIconButton onClick={() => setIsCollapsed(false)}>
                            <DockToLeftIcon className="text-textdim hover:text-text transition-colors ease-out" size={16} />
                        </SidebarIconButton>
                    ) : (
                        <div
                            className="
                flex size-8 items-center justify-center
                rounded-lg bg-primary shadow-lg
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
                            <SidebarIconButton
                                onClick={() => setIsDrawerOpen?.(false)}
                                aria-label="Close sidebar"
                            >
                                <CloseIcon
                                    size={16}
                                    className="text-textdim transition-colors ease-out hover:text-text"
                                />
                            </SidebarIconButton>
                        ) : (
                            <SidebarIconButton
                                onClick={() => setIsCollapsed(true)}
                                aria-label="Collapse sidebar"
                            >
                                <DockToRightIcon
                                    size={16}
                                    className="text-textdim transition-colors ease-out hover:text-text"
                                />
                            </SidebarIconButton>
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
            {/* <div className="py-2">
                <SidebarButton
                    active={false}
                    isCollapsed={isCollapsed}
                    icon={isDark ? <SunIcon /> : <MoonIcon />}
                    label={isDark ? "Light mode" : "Dark mode"}
                    onClick={toggleTheme}
                    textClassName="text-[11px]"
                    className="
                        text-text
                        
                        hover:text-text-h
                        active:translate-y-0
                        active:shadow-none
                    "
                />
            </div> */}

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
                     
                        hover:text-text-h
                        active:translate-y-0
                        active:shadow-none
                    "
                />
            </div>
        </div >
    );
}