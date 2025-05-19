import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/HotelSignup.css";

export default function HotelSignup() {
  const [hotel, setHotel] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setHotel({ ...hotel, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/hotels/register", hotel);
      alert("Hotel Signup Successful!");
    } catch (error) {
      alert("Signup Failed!");
    }
  };

  return (
    <div className="hotel-signup-container">
      <div className="glass-form">
        <h2>Hotel Owner Signup</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Hotel Name"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Owner Email"
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
          <input
            type="text"
            name="location"
            placeholder="Hotel Location"
            onChange={handleChange}
            required
          />
          <button type="submit">Signup</button>
        </form>

        <p className="login-text">
          Already have an account?{" "}
          <span className="login-link" onClick={() => navigate("/login/hotel")}>
            Login now
          </span>
        </p>

        <div className="other-signups">
          <button onClick={() => navigate("/signup/user")}>User Signup</button>
          <button onClick={() => navigate("/signup/admin")}>Admin Signup</button>
        </div>
      </div>
    </div>
  );
}
