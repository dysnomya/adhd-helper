import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from "./Dashboard";
import Login from "./Login";
import Banans from "./Banans";
import {tokenVerify} from "./api/tokenVerify";
import User from "./User";
function App() {
    const [user, setUser] = useState(null);

    // useEffect(() => {
    //     const initLogin = async () => {
    //         const res = await tokenVerify(localStorage.getItem('token'));
    //         setUser(!!res);
    //     };
    //     initLogin();
    // }, []);

    return (
        <Router>
            <nav />
            <div className="container mt-3">
                <Routes>
                    <Route path="/" element={<Login user={user} setUser={setUser} />} />
                    <Route path="/user" element={localStorage.getItem('token') ? <User /> : <Navigate to="/"  user={user} setUser={setUser} />} />
                </Routes>
            </div>
        </Router>
    );
}
export default App;