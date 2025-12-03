import { Navigate, Outlet } from "react-router-dom";
import isTokenValid from "../functions/AuthenticationFunctions";

export default function LoginRoute() {
    const token = localStorage.getItem("token");
    return isTokenValid(token) ? <Navigate to="/dashboard" replace /> : <Outlet />;
}