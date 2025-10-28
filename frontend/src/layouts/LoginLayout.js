import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


export default function LoginLayout() {
    return (
        <div className="flex h-screen items-center">
            <Outlet />
        </div>
    );
}