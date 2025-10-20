import { GoogleLogin } from "@react-oauth/google";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login({ user, setUser }) {
  const navigate = useNavigate();
  const handleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential; // Google ID token
    localStorage.setItem("token", token);
    console.log(token);

    navigate("/user");
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  useEffect(() => {
    if (!user) return;
    navigate("/user");
  }, [user]);

  return <GoogleLogin onSuccess={handleSuccess} onError={handleError} />;
}

export default Login;
