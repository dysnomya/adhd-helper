import React, { useEffect, useState } from "react";
import axios from "axios";

function User() {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get("/user", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(res.data);
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <h1>This is a test page that fetches user info</h1>
      {user === null ? (
          <p>Loading...</p>
      ) : typeof user === "string" ? (
          <p>{user}</p>
      ) : (
          <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
      )}
    </div>
  );
}
export default User;
