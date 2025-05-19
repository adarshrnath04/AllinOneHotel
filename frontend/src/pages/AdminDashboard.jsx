import React from "react";
import { Link } from "react-router-dom";
import "../styles/AdminDashboard.css";

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <div className="dashboard-options">
        <Link className="dashboard-card" to="/admin/hotels">
          🏨 Manage Hotels
        </Link>
        <Link className="dashboard-card" to="/admin/view-bookings">
          📋 View Bookings
        </Link>
        <Link className="dashboard-card" to="/admin/users">
          👥 Manage Users
        </Link>
        <Link className="dashboard-card" to="/admin/revenue">
          💰 Revenue & Payments
        </Link>
      </div>
    </div>
  );
}
