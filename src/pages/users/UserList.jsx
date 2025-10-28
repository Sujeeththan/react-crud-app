import React, { useEffect, useState } from "react";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res = await axios.get(
        "https://express-mongo-connection-sigma.vercel.app/api/users"
      );
      const userData = res.data.users
      console.log(userData);
      setUsers(userData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="content-container">
        <h1>All Users</h1>
      </div>

      <table border={1} cellPadding={5} cellSpacing={0} align="center" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>isActive</th>
            <th>CreatedAt</th>
            <th>UpdatedAt</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isActive ? "Yes" : "No"}</td>
              <td>{new Date(user.createdAt).toLocaleString("en-US" , {
                day: "numeric",
                month:"2-digit",
                year:"numeric",
                hour:"numeric",
                minute:"numeric",
                weekday:"long"
              })}</td>
               <td>{new Date(user.createdAt).toLocaleString("en-US" , {
                day: "numeric",
                month:"2-digit",
                year:"numeric",
                hour:"numeric",
                minute:"numeric",
                weekday:"long"
              })}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default UserList;
