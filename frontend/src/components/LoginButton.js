import "../styles/login.scss";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

function LoginButton() {
  const navigate = useNavigate();
  const handleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential; // Google ID token
    localStorage.setItem("token", token);
    console.log(token);
    navigate("/dashboard");
  };

  const handleError = () => {
    console.log("Login failed");
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
      text="signin_with"
      shape="circle"
      theme="filled_black"
    />
  );
}

export default LoginButton;
