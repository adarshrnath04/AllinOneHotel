import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/UserLogin.css"; // link the CSS file

export default function UserLogin() {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/users/login", user);
      if (response.data.success) {
        alert("Login Successful!");
        navigate("/home");
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      alert("Login Failed!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>User Login</h2>
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
        <p className="signup-text">
          Don't have an account?{" "}
          <span className="signup-link" onClick={() => navigate("/signup/user")}>
            Signup now
          </span>
        </p>
      </div>
    </div>
  );
}
