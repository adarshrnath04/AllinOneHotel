import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ManageHotels.css";

export default function ManageHotels() {
  const [hotels, setHotels] = useState([]);
  const [editing, setEditing] = useState(null);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/admin/hotels")
      .then((response) => {
        setHotels(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching hotels:", error);
        setLoading(false);
      });
  }, []);

  const handleNameChange = async (hotelId) => {
    try {
      await axios.put(`http://localhost:5000/admin/hotels/${hotelId}`, { name: newName });
      setHotels(hotels.map(h => h.id === hotelId ? { ...h, name: newName } : h));
      setEditing(null);
    } catch (error) {
      alert("Failed to update hotel name.");
    }
  };

  return (
    <div className="manage-hotels-container">
      <h2 className="title">Manage Hotels</h2>

      {loading ? (
        <p className="loading">Loading hotels...</p>
      ) : hotels.length === 0 ? (
        <p className="no-hotels">No hotels found.</p>
      ) : (
        <div className="hotel-list">
          {hotels.map((hotel) => (
            <div className="hotel-card" key={hotel.id}>
              {editing === hotel.id ? (
                <div className="edit-section">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                  <div className="button-group">
                    <button className="save" onClick={() => handleNameChange(hotel.id)}>Save</button>
                    <button className="cancel" onClick={() => setEditing(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <p><strong>Name:</strong> {hotel.name}</p>
                  <button className="edit" onClick={() => {
                    setEditing(hotel.id);
                    setNewName(hotel.name);
                  }}>
                    Edit Name
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
