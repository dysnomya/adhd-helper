import { useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import User from "./pages/User";
import Login from "./pages/Login";
import LoginLayout from "./layouts/LoginLayout";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./wrappers/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Todo from "./pages/Todo";
import Calendar from "./pages/Calendar";

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route element={<LoginLayout />}>
            <Route path="/" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard/>} />
              <Route path="/todo" element={<Todo/>} />
              <Route path="/calendar" element={<Calendar/>} />
              <Route path="/user" element={<User/>} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
export default App;
