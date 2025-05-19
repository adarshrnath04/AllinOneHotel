import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/UserSignup.css";

export default function UserSignup() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users/register", user);
      alert("Signup Successful!");
      navigate("/login");
    } catch (error) {
      alert("Signup Failed!");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h1>User Signup</h1>
        <form onSubmit={handleSubmit} className="signup-form">
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit" className="submit-button">Create Account</button>
        </form>

        <p className="login-text">
          Already have an account?{" "}
          <span className="login-link" onClick={() => navigate("/login/user")}>
            Login now
          </span>
        </p>

        <div className="alt-signup-buttons">
          <button onClick={() => navigate("/signup/hotel")}>Signup as Hotel Owner</button>
          <button onClick={() => navigate("/signup/admin")}>Signup as Admin</button>
        </div>
      </div>
    </div>
  );
}
