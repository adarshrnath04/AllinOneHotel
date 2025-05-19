import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AdminSignup.css";

export default function AdminSignup() {
  const [admin, setAdmin] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/admins/register", admin);
      alert("Admin Signup Successful!");
    } catch (error) {
      alert("Signup Failed!");
    }
  };

  return (
    <div className="admin-signup-container">
      <div className="admin-signup-form">
        <h2>Create Admin Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Admin Name"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit">Signup</button>
        </form>

        <p className="login-text">
          Already have an account?{" "}
          <span className="login-link" onClick={() => navigate("/login/admin")}>
            Login now
          </span>
        </p>

        <div className="other-signups">
          <button onClick={() => navigate("/signup/user")}>User Signup</button>
          <button onClick={() => navigate("/signup/hotel")}>Hotel Signup</button>
        </div>
      </div>
    </div>
  );
}
