import { useNavigate } from "react-router-dom";

import "../styles/sidebar.scss";

export default function LogoutButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        localStorage.removeItem("token");
        navigate("/");
      }}
      className="logout-button"
    >
      Logout
    </button>
  );
}
