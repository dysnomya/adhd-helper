import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


export default function LoginLayout() {
    return (
        <div className="d-flex align-items-start">
            <Outlet />
        </div>
    );
}