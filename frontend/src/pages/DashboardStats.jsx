import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardStats() {
  const [stats, setStats] = useState({ totalBookings: 0, revenue: 0, availableRooms: 0 });

  useEffect(() => {
    axios.get("http://localhost:5000/admin/dashboard")
      .then((response) => setStats(response.data))
      .catch((error) => console.error("Error fetching stats:", error));
  }, []);

  return (
    <div>
      <h2>Dashboard Overview</h2>
      <p><strong>Total Bookings:</strong> {stats.totalBookings}</p>
      <p><strong>Total Revenue:</strong> ₹{stats.revenue}</p>
      <p><strong>Available Rooms:</strong> {stats.availableRooms}</p>
    </div>
  );
}
