const express = require("express");
const router = express.Router();
const connection = require("../config/db");

// Get all rooms for a hotel
router.get("/", (req, res) => {
  const hotelId = req.query.hotelId;
  connection.query("SELECT * FROM rooms WHERE hotel_id = ? AND availability = TRUE", [hotelId], (err, results) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(results);
  });
});
// Get available dates for a room

router.get("/available", (req, res) => {
  const { hotelId, checkIn, checkOut } = req.query;

  console.log("Checking availability for:", hotelId, checkIn, checkOut); // Debug log

  connection.query(
    `SELECT * FROM rooms WHERE hotel_id = ? 
     AND id NOT IN (SELECT room_id FROM room_bookings WHERE check_in <= ? AND check_out >= ?)`,
    [hotelId, checkOut, checkIn],
    (err, results) => {
      if (err) {
        console.error("Error fetching rooms:", err);
        res.status(500).json({ error: err.message });
      } else {
        console.log("Available rooms:", results); // Debug log
        res.json(results);
      }
    }
  );
});

// Add a new room for a particular hotel
router.post("/", (req, res) => {
  const { hotelId, type, price } = req.body;

  if (!hotelId || !type || !price) {
    return res.status(400).json({ error: "hotelId, type, and price are required" });
  }

  const query = "INSERT INTO rooms (hotel_id, type, price, availability) VALUES (?, ?, ?, TRUE)";

  connection.query(query, [hotelId, type, price], (err, result) => {
    if (err) {
      console.error("Error adding room:", err);
      return res.status(500).json({ error: err.message });
    }
    // Return the inserted room id and data
    res.status(201).json({ id: result.insertId, hotel_id: hotelId, type, price, availability: true });
  });
});






module.exports = router;
