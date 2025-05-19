import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/ManageRooms.css";

export default function ManageRooms() {
  const { hotelId } = useParams(); // get hotel id from URL
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({ type: "", price: "" });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/hotels/${hotelId}/rooms`) // get rooms for this hotel
      .then((response) => setRooms(response.data))
      .catch((error) => console.error("Error fetching rooms:", error));
  }, [hotelId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoom({ ...newRoom, [name]: value });
  };

  const addRoom = async (e) => {
    e.preventDefault();

    if (!newRoom.type || !newRoom.price) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/hotels/${hotelId}/rooms`,
        { type: newRoom.type, price: Number(newRoom.price) }
      );

      // Append new room to rooms list
      setRooms([...rooms, response.data]);
      setNewRoom({ type: "", price: "" });
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding room:", error);
      alert("Failed to add room");
    }
  };

  return (
    <div className="manage-rooms-container">
      <h2>Manage Rooms</h2>

      {rooms.length === 0 ? (
        <p className="no-rooms">No rooms added yet.</p>
      ) : (
        <ul className="rooms-list">
          {rooms.map((room) => (
            <li key={room.id} className="room-item">
              <div className="room-info">
                <strong>{room.type}</strong> - ₹{room.price} / night
              </div>
              <div className="room-actions">
                <button className="btn edit-btn">Edit</button>
                <button className="btn delete-btn">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {showAddForm ? (
        <form className="add-room-form" onSubmit={addRoom}>
          <input
            type="text"
            name="type"
            placeholder="Room Type"
            value={newRoom.type}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price per night"
            value={newRoom.price}
            onChange={handleInputChange}
          />
          <button type="submit" className="btn add-btn">
            Add Room
          </button>
          <button
            type="button"
            className="btn cancel-btn"
            onClick={() => setShowAddForm(false)}
          >
            Cancel
          </button>
        </form>
      ) : (
        <button className="btn add-btn" onClick={() => setShowAddForm(true)}>
          Add New Room
        </button>
      )}
    </div>
  );
}
