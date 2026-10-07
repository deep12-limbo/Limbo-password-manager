import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ThemeContext } from "../context/themeContext";
import UserContext from "../context/user/usercontext";
import ROUTES from "../routers/routespath";
import Button from "./ui/Button";
import { LoginIcon, LogoutIcon } from "./ui/icons";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const { isLoggedIn, logout } = useContext(UserContext);
    const { toggleTheme, isDark } = useContext(ThemeContext);



    return (
        <nav className="navbar w-full bg-base-100 h-[80px] flex items-center   justify-between px-10"
        >
            <div className="flex justify-start gap-x-20">
            </div>
        </nav>

    );
}