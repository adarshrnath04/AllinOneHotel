import React, { useEffect, useState } from "react";
import axios from "axios";

export default function HotelRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/admin/hotel-requests")
      .then((response) => setRequests(response.data))
      .catch((error) => console.error("Error fetching hotel requests:", error));
  }, []);

  const handleApproval = async (hotelId, status) => {
    try {
      await axios.put(`http://localhost:5000/admin/hotel-requests/${hotelId}`, { status });
      setRequests(requests.filter(hotel => hotel.id !== hotelId)); // Remove after approval/rejection
    } catch (error) {
      alert("Failed to update hotel status.");
    }
  };

  return (
    <div>
      <h2>Hotel Approval Requests</h2>
      {requests.length === 0 ? <p>No pending requests.</p> : (
        <ul>
          {requests.map((hotel) => (
            <li key={hotel.id}>
              <p><strong>Name:</strong> {hotel.name}</p>
              <p><strong>Location:</strong> {hotel.location}</p>
              <button onClick={() => handleApproval(hotel.id, "Approved")}>Approve</button>
              <button onClick={() => handleApproval(hotel.id, "Rejected")}>Reject</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
