import React from "react";
import "../styles/RevenueAnalytics.css";

export default function BookingSoon() {
  return (
    <div className="revenue-container">
      <div className="revenue-card">
        <h2 className="title"> View Bookings</h2>
        <p className="coming-soon">💰 Coming Soon – We’re working on this feature!</p>
        <div className="loader"></div>
      </div>
    </div>
  );
}
