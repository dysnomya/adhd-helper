import { Navigate, Outlet } from "react-router-dom";

function isTokenValid(token) {
    if (!token) return false;
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    try {
        const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
        if (!payload.exp) return false;
        // exp is in seconds since epoch
        const now = Math.floor(Date.now() / 1000);
        return payload.exp > now;
    } catch (e) {
        return false;
    }
}

export default function ProtectedRoute() {
    const token = localStorage.getItem("token");
    return isTokenValid(token) ? <Outlet /> : <Navigate to="/" replace />;
}