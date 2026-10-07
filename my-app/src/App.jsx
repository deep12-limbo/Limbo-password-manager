import { Routes, Route } from "react-router-dom";

import AuthPage from "./auth/login/AuthPage";
import GoogleForm from "./pages/googleItem/GoogleIForm";
import VaultForm from "./pages/vault/VaultForm";
import Home from "./pages/Home";
import AppRoutes from "./routers/routes";

function App() {

  return (
    // <div>hi</div>


    <AppRoutes />

  );
}

export default App;