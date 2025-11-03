import {useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';

export default function LogoutButton() {
    const navigate = useNavigate();
    return (
        <Button
            onClick={() => {
                localStorage.clear();
                navigate("/");
            }}
             className="mt-auto"
        >
            Logout
        </Button>
    );
}