import { Routes, Route, Navigate } from "react-router-dom";

import AuthPage from "../auth/login/AuthPage";

import Home from "../pages/Home";
import GoogleForm from "../pages/googleItem/GoogleIForm";
import { GoogleItems } from "../pages/googleItem/GoogleItems";
import VaultForm from "../pages/vault/VaultForm";
import { VaultItems } from "../pages/vault/VaultItems";

import ProtectedRoutes from "./ProtectedRoutes";
import ROUTES from "./routespath";

import AuthLayout from "../layouts/AuthLayout";
import Layout from "../layouts/ProtectedLayout";

import UserContext from "../context/user/usercontext";
import { useContext } from "react";

function AppRoutes() {
  const auth = useContext(UserContext);
  console.log("auth", auth)
  const { isLoggedIn } = auth;
  return (
    <Routes>

      {/* Public */}
      <Route element={<AuthLayout />}>


        <Route
          path={ROUTES.LOGIN}
          element={<AuthPage />}
        />

        <Route
          path={ROUTES.REGISTER}
          element={<AuthPage />}
        />
        <Route
          path="/"
          elemen={<AuthPage />}
        >

          <Route
            path="/"
            element={isLoggedIn ? <Navigate to={ROUTES.GOOGLE_ITEMS} replace /> : <Navigate to={ROUTES.LOGIN} replace />}
          />

        </Route>
      </Route>


      {/* Protected */}
      <Route element={<ProtectedRoutes />}>

        <Route element={<Layout />}>

          {/* unused */}
          {/* <Route
            path={ROUTES.HOME}
            element={<Home />}
          /> */}

          <Route
            path={ROUTES.GOOGLE_ITEMS}
            element={<GoogleItems />}
          />

          <Route
            path={ROUTES.VAULT_ITEMS}
            element={<VaultItems />}
          />


        </Route>

      </Route>

    </Routes>
  );
}

export default AppRoutes;