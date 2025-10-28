import {GoogleLogin} from "@react-oauth/google";
import {useNavigate} from "react-router-dom";

export default function LogoutButton() {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => {
                localStorage.clear();
                navigate("/");
            }}
            className="mt-auto bg-red-600 hover:bg-red-700 py-2 rounded"
        >
            Logout
        </button>
    );
}