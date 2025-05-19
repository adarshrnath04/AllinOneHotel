import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/HotelLogin.css";

export default function HotelLogin() {
  const [hotel, setHotel] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setHotel({ ...hotel, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/hotels/login", hotel);
      if (response.data.success) {
        alert("Login Successful!");
        navigate("/hotel/dashboard");
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      alert("Login Failed!");
    }
  };

  return (
    <div className="hotel-login-container">
      <div className="glass-form">
        <h2>Hotel Owner Login</h2>
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
          <span className="login-link" onClick={() => navigate("/signup/hotel")}>
            Signup here
          </span>
        </p>

        <div className="other-signups">
          <button onClick={() => navigate("/login/user")}>User Login</button>
          <button onClick={() => navigate("/login/admin")}>Admin Login</button>
        </div>
      </div>
    </div>
  );
}
