import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ViewBookings.css";

export default function ViewBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/hotel/bookings")
      .then((response) => setBookings(response.data))
      .catch((error) => console.error("Error fetching bookings:", error));
  }, []);

  const handleStatusChange = async (bookingId, status) => {
    try {
      await axios.put(`http://localhost:5000/bookings/${bookingId}`, { status });
      setBookings(bookings.map(b => (b.id === bookingId ? { ...b, status } : b)));
    } catch (error) {
      alert("Failed to update booking status.");
    }
  };

  return (
    <div className="bookings-container">
      <h2>Hotel Bookings</h2>
      {bookings.length === 0 ? (
        <p className="no-bookings">No bookings yet.</p>
      ) : (
        <ul className="booking-list">
          {bookings.map((booking) => (
            <li key={booking.id} className="booking-item">
              <div className="booking-info">
                <p><strong>Guest:</strong> {booking.user_name}</p>
                <p><strong>Room:</strong> {booking.room_type}</p>
                <p><strong>Check-in:</strong> {new Date(booking.check_in).toLocaleDateString()}</p>
                <p><strong>Check-out:</strong> {new Date(booking.check_out).toLocaleDateString()}</p>
                <p>
                  <strong>Status:</strong> <span className={`status ${booking.status.toLowerCase()}`}>{booking.status}</span>
                </p>
              </div>
              {booking.status === "Pending" && (
                <div className="booking-actions">
                  <button className="btn confirm-btn" onClick={() => handleStatusChange(booking.id, "Confirmed")}>Confirm</button>
                  <button className="btn cancel-btn" onClick={() => handleStatusChange(booking.id, "Cancelled")}>Cancel</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
