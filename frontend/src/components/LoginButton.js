import { GoogleLogin } from "@react-oauth/google";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginButton({ user, setUser }) {
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

  return <GoogleLogin onSuccess={handleSuccess} onError={handleError} />;
}

export default LoginButton;
