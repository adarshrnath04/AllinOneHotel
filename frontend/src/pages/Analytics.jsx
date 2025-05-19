import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Analytics.css";  // import your CSS here

export default function Analytics() {
  const [stats, setStats] = useState({ revenue: 0, occupancy: 0, bookings: [] });

  useEffect(() => {
    axios.get("http://localhost:5000/hotel/analytics")
      .then((response) => setStats(response.data))
      .catch((error) => console.error("Error fetching analytics:", error));
  }, []);

  return (
    <div className="analytics-container">
      <h1 className="title">Sales & Revenue Analytics</h1>

      <div className="stats-cards">
        <div className="card revenue-card">
          <h3>Total Revenue</h3>
          <p className="amount">₹{stats.revenue.toLocaleString()}</p>
        </div>

        <div className="card occupancy-card">
          <h3>Occupancy Rate</h3>
          <p className="amount">{stats.occupancy}%</p>
        </div>
      </div>

      <h2 className="section-title">Booking Trends</h2>
      <div className="booking-trends">
        {stats.bookings.length === 0 ? (
          <p>No booking data available.</p>
        ) : (
          stats.bookings.map((booking, index) => (
            <div key={index} className="booking-item">
              <span className="month">{booking.month}</span>
              <span className="total">₹{booking.total.toLocaleString()}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
