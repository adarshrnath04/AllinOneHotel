import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AdminLogin.css"; // Use the same styles as AdminSignup.css or reuse the file

export default function AdminLogin() {
  const [admin, setAdmin] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/admins/login", admin);
      if (response.data.success) {
        alert("Login Successful!");
        navigate("/admin/dashboard");
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      alert("Login Failed!");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-form">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </form>

        <p className="login-text">
          Don't have an account?{" "}
          <span className="login-link" onClick={() => navigate("/signup/admin")}>
            Signup now
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
