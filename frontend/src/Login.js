import {GoogleLogin, googleLogout, GoogleOAuthProvider} from "@react-oauth/google";
import React, {useState} from "react";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

function Login() {
    const handleSuccess = async (credentialResponse) => {
        const token = credentialResponse.credential; // Google ID token
        // Send to backend
        await axios.post('/auth/verify', { token });
        localStorage.setItem('token', token);
    };

    const handleError = () => {
        console.log('Login Failed');
    };

    return (
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    );
}

export default Login;