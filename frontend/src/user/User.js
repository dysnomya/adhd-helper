import React, { useEffect, useState } from "react";
import axios from "axios";

function User() {
  const [user, setUser] = useState(null); // initialize with null or empty object

  const fetchUser = async () => {
    try {
      const res = await axios.get("/user", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(res.data);
      setUser(res.data); // update state correctly
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []); // empty dependency array → runs once on mount

  return (
    <div>
      <h1>User</h1>
      {user}
    </div>
  );
}
export default User;
