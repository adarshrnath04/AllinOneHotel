import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/HotelDashboard.css";

export default function HotelDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ revenue: 0, occupancy: 0 });

  useEffect(() => {
    axios.get("http://localhost:5000/hotel/analytics")
      .then(response => setStats(response.data))
      .catch(error => console.error("Error fetching analytics:", error));
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome, Hotel Owner</h1>

      {/* Analytics summary front and center */}
      <div className="analytics-summary">
        <h2>Sales & Revenue Analytics</h2>
        <p><strong>Total Revenue:</strong> ₹{stats.revenue.toLocaleString()}</p>
        <p><strong>Occupancy Rate:</strong> {stats.occupancy}%</p>
      </div>

      {/* Navigation buttons below */}
      <div className="button-group">
        <button className="dashboard-btn" onClick={() => navigate("/manage-rooms")}>
          Manage Rooms
        </button>
        <button className="dashboard-btn" onClick={() => navigate("/view-bookings")}>
          View Bookings
        </button>
        <button className="dashboard-btn" onClick={() => navigate("/reviews")}>
          Guest Reviews
        </button>
        <button className="dashboard-btn analytics-btn" onClick={() => navigate("/analytics")}>
          Full Analytics
        </button>
      </div>
    </div>
  );
}
