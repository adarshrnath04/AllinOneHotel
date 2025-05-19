import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ConfirmBooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedRoom, dates } = location.state || {};

  if (!selectedRoom || !dates) {
    return <p>Error: No room or dates selected!</p>;
  }

  const handleBooking = async () => {
    try {
      const response = await axios.post("http://localhost:5000/bookings", {
        hotelId: selectedRoom.hotel_id,
        roomId: selectedRoom.id,
        checkIn: dates.checkIn,
        checkOut: dates.checkOut,
        userId: 1, // Replace with actual user ID
      });

      if (!response.data.success) {
        alert("Room not available for selected dates!");
      } else {
        alert("Booking successful!");
        navigate("/bookings");
      }
    } catch (error) {
      alert("Booking failed.");
    }
  };

  return (
    <div>
      <h2>Confirm Your Booking</h2>
      <p><strong>Room:</strong> {selectedRoom.type} - ₹{selectedRoom.price}</p>
      <p><strong>Check-in:</strong> {dates.checkIn}</p>
      <p><strong>Check-out:</strong> {dates.checkOut}</p>
      <button onClick={handleBooking}>Confirm Booking</button>
    </div>
  );
}
