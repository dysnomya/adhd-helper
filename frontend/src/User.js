import React, {useEffect, useState} from 'react'
import axios from "axios";

function User() {
    const [user, setUser] = useState([]);

    const res = async () => {
        await axios.get("/user", {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
            .then(res => {setUser(res.data);})
            .catch(err => console.log(err));
    }

    useEffect(() => {
        res()
    })

    return (
        <div>
            <h1>User</h1>
            {user}
        </div>
    )
}
export default User;