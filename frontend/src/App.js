import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from "./Dashboard";
import Login from "./Login";
import Banans from "./Banans";
function App() {
    return (
        <Router>
            <nav />
            <div className="container mt-3">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/banans" element={<Banans />} />
                </Routes>
            </div>
        </Router>
    );
}
export default App;