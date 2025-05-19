import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ManageUsers.css";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/admin/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="manage-users-container">
      <h2 className="title">Registered Users</h2>

      {loading ? (
        <p className="loading">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="no-users">No users found.</p>
      ) : (
        <div className="user-list">
          {users.map((user) => (
            <div className="user-card" key={user.id}>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Status:</strong> {user.status || "Active"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
