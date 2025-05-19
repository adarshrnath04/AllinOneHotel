import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Hotels() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/hotels")
      .then((response) => setHotels(response.data))
      .catch((error) => console.error("Error fetching hotels:", error));
  }, []);

  return (
    <div>
      <h1>Hotels</h1>
      <ul>
        {hotels.map((hotel) => (
          <li key={hotel.id}>{hotel.name} - {hotel.location}</li>
        ))}
      </ul>
    </div>
  );
}
