import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    // Some other way to check if logged in??
    return localStorage.getItem("token") ? <Outlet /> : <Navigate to="/" replace />;
}