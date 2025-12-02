import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import User from "./pages/User";
import Login from "./pages/Login";
import LoginLayout from "./layouts/LoginLayout";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./wrappers/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Todo from "./pages/Todo";
import Calendar from "./pages/Calendar";
import "./styles/_themes.scss";

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className={theme} style={{ minHeight: '100vh', overflow: 'auto' }}>
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        style={{ position: "fixed", bottom: 10, right: 10, zIndex: 200 }}
      >
        Toggle Theme
      </button>

      <Router>
        <Routes>
          <Route element={<LoginLayout />}>
            <Route path="/" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/todo" element={<Todo />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/adhdUser" element={<User />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
