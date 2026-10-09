import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex flex-col">

            {/* <Navbar /> */}

            <main className="flex-1 h-[100vh]">
                <Outlet />
            </main>

        </div>
    );
}