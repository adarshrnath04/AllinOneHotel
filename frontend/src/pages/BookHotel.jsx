import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import '../styles/BookHotel.css'
export default function BookHotel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dates, setDates] = useState({ checkIn: "", checkOut: "" });
  const [rooms, setRooms] = useState([]);

  const checkAvailability = async () => {
    if (!dates.checkIn || !dates.checkOut) {
      alert("Please select both check-in and check-out dates.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/rooms/available`, {
        params: { hotelId: id, checkIn: dates.checkIn, checkOut: dates.checkOut },
      });

      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching available rooms:", error);
    }
  };

  return (
   <div className="book-hotel-container">
  <h1 className="heading">Book Your Stay</h1>

  <div className="date-picker">
    <div className="date-field">
      <label>Check-in Date:</label>
      <input type="date" value={dates.checkIn} onChange={(e) => setDates({ ...dates, checkIn: e.target.value })} />
    </div>

    <div className="date-field">
      <label>Check-out Date:</label>
      <input type="date" value={dates.checkOut} onChange={(e) => setDates({ ...dates, checkOut: e.target.value })} />
    </div>

    <button className="check-btn" onClick={checkAvailability}>Check Available Rooms</button>
  </div>

  <h2 className="sub-heading">Available Rooms</h2>
  {rooms.length === 0 ? (
    <p className="no-rooms-msg">No rooms available for selected dates.</p>
  ) : (
    <ul className="room-list">
      {rooms.map((room) => (
        <li key={room.id} className="room-card">
          <div>
            <strong>{room.type}</strong> - ₹{room.price}
          </div>
          <button
            className="select-btn"
            onClick={() => navigate("/confirm-booking", { state: { selectedRoom: room, dates } })}
          >
            Select Room
          </button>
        </li>
      ))}
    </ul>
  )}
</div>

  );
}
