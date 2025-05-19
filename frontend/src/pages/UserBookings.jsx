import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/bookings?userId=1") // Replace with actual user ID
      .then((response) => setBookings(response.data))
      .catch((error) => console.error("Error fetching bookings:", error));
  }, []);

  const handleCancel = async (bookingId) => {
    try {
      await axios.put(`http://localhost:5000/bookings/${bookingId}`, { status: "Cancelled" });
      setBookings(bookings.map(b => (b.id === bookingId ? { ...b, status: "Cancelled" } : b)));
    } catch (error) {
      alert("Cancellation Failed!");
    }
  };

  return (
    <div className="user-bookings-container">
    <h1 className="user-bookings-heading">My Bookings</h1>
    {bookings.length === 0 ? (
      <p className="no-bookings">No bookings found.</p>
    ) : (
      <ul className="bookings-list">
        {bookings.map((booking) => (
          <li className="booking-item" key={booking.id}>
            <span className="booking-info">
              {booking.hotel_name} | Check-in: {booking.check_in} |{" "}
              <span
                className={
                  booking.status === "Cancelled"
                    ? "booking-status cancelled"
                    : "booking-status"
                }
              >
                {booking.status}
              </span>
            </span>
            {booking.status !== "Cancelled" && (
              <button
                className="cancel-button"
                onClick={() => handleCancel(booking.id)}
              >
                Cancel
              </button>
            )}
          </li>
        ))}
      </ul>
    )}
  </div>
);

}
