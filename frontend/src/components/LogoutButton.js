import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

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
