import {GoogleLogin, googleLogout, GoogleOAuthProvider} from "@react-oauth/google";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {tokenVerify} from "./api/tokenVerify";

function Login({user, setUser}) {
    const navigate = useNavigate();
    const handleSuccess = async (credentialResponse) => {
        const token = credentialResponse.credential; // Google ID token
        localStorage.setItem('token', token);
        console.log(token);
        setUser(tokenVerify(token));
        navigate("/user");

    };

    const handleError = () => {
        console.log('Login Failed');
    };

    useEffect(() => {
        if (!user) return;
        navigate('/user');
    }, [user]);

    return (
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    );
}

export default Login;