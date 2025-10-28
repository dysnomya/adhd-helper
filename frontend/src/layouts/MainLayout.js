import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../components/Sidebar";

export default function LoginLayout() {
    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            <Sidebar />
            <main className="flex-1 p-10 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
}