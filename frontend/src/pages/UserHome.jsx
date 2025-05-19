import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/UserHome.css";

export default function UserHome() {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/hotels")
      .then((response) => setHotels(response.data))
      .catch((error) => console.error("Error fetching hotels:", error));
  }, []);

  return (
   <div className="dashboard-container">
  <h1 className="dashboard-title">Welcome to Your Dashboard</h1>
  <p className="dashboard-description">
    Explore hotels, manage your bookings, and share reviews.
  </p>

  <h2 className="hotel-section-title">Available Hotels</h2>
  {hotels.length === 0 ? (
    <p>Loading hotels...</p>
  ) : (
    <ul className="hotel-list">
      {hotels.map((hotel) => (
        <li className="hotel-card" key={hotel.id}>
          <div>
            <div className="hotel-name">{hotel.name}</div>
            <div className="hotel-info">{hotel.location} - ₹{hotel.price}</div>
          </div>
          <button
            className="book-button"
            onClick={() => navigate(`/bookings/${hotel.id}`)}
          >
            Book Now
          </button>
        </li>
      ))}
    </ul>
  )}

  <div className="action-buttons">
    <button className="secondary-button" onClick={() => navigate("/bookings")}>
      View My Bookings
    </button>
    <button className="secondary-button" onClick={() => navigate("/reviews")}>
      Leave a Review
    </button>
  </div>
</div>

  );
}
