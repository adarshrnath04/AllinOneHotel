import React, { useEffect, useState } from "react";
import axios from "axios";

export default function RoomAvailability({ hotelId }) {
  const [rooms, setRooms] = useState([]);
  const [selectedDates, setSelectedDates] = useState({ checkIn: "", checkOut: "" });
  const [availableRooms, setAvailableRooms] = useState([]);

  useEffect(() => {
    if (hotelId) {
      axios.get(`http://localhost:5000/rooms?hotelId=${hotelId}`)
        .then((response) => setRooms(response.data))
        .catch((error) => console.error("Error fetching rooms:", error));
    }
  }, [hotelId]);

  const checkAvailability = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/rooms/available`, {
        params: {
          hotelId,
          checkIn: selectedDates.checkIn,
          checkOut: selectedDates.checkOut,
        },
      });

      setAvailableRooms(response.data);
    } catch (error) {
      console.error("Error checking room availability:", error);
    }
  };

  return (
    <div>
      <h2>Select Date Range</h2>
      <label>Check-in:</label>
      <input type="date" onChange={(e) => setSelectedDates({ ...selectedDates, checkIn: e.target.value })} />
      
      <label>Check-out:</label>
      <input type="date" onChange={(e) => setSelectedDates({ ...selectedDates, checkOut: e.target.value })} />
      
      <button onClick={checkAvailability}>Check Available Rooms</button>

      <h2>Available Rooms</h2>
      {availableRooms.length === 0 ? <p>No rooms available for selected dates.</p> : (
        <ul>
          {availableRooms.map((room) => (
            <li key={room.id}>
              <strong>{room.type}</strong> - ₹{room.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
