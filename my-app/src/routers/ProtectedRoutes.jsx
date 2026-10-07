import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../context/user/usercontext";
import ROUTES from "./routespath";

const ProtectedRoutes = () => {
    const { token } = useContext(UserContext);
    console.log("token protected  ", token)
    const isAuthenticated = Boolean(token && token != "")

    return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
};


export default ProtectedRoutes;     