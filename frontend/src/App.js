import { useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./login/Login";
import User from "./user/User";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <nav />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Login user={user} setUser={setUser} />} />
          <Route
            path="/user"
            element={
              localStorage.getItem("token") ? (
                <User />
              ) : (
                <Navigate to="/" user={user} setUser={setUser} />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
