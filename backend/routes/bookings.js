const express = require("express");
const router = express.Router();
const connection = require("../config/db");

// Create a booking
router.post("/", (req, res) => {
  const { user_id, hotel_id, check_in, check_out, status } = req.body;
  connection.query(
    "INSERT INTO bookings (user_id, hotel_id, check_in, check_out, status) VALUES (?, ?, ?, ?, ?)",
    [user_id, hotel_id, check_in, check_out, status],
    (err, results) => {
      if (err) res.status(500).json({ error: err.message });
      else res.json({ message: "Booking created successfully" });
    }
  );
});



router.get("/", (req, res) => {
  const hotelId = req.query.hotelId;
  connection.query(
    `SELECT b.id, u.name AS user_name, r.type AS room_type, b.check_in, b.check_out, b.status
     FROM room_bookings b 
     JOIN users u ON b.user_id = u.id
     JOIN rooms r ON b.room_id = r.id
     WHERE r.hotel_id = ?`,
    [hotelId],
    (err, results) => {
      if (err) res.status(500).json({ error: err.message });
      else res.json(results);
    }
  );
});

router.put("/:id", (req, res) => {
  const bookingId = req.params.id;
  const { status } = req.body;
  connection.query("UPDATE room_bookings SET status = ? WHERE id = ?", [status, bookingId], (err, results) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ message: "Booking updated successfully" });
  });
});

router.post("/", (req, res) => {
  const { hotelId, roomId, checkIn, checkOut, userId } = req.body;

  // Check if room is already booked for requested dates
  connection.query(
    "SELECT * FROM room_bookings WHERE room_id = ? AND (check_in <= ? AND check_out >= ?)",
    [roomId, checkOut, checkIn],
    (err, results) => {
      if (err) res.status(500).json({ error: err.message });
      else if (results.length > 0) res.json({ success: false, message: "Room not available on selected dates" });
      else {
        // Proceed with booking
        connection.query(
          "INSERT INTO room_bookings (user_id, room_id, check_in, check_out, status) VALUES (?, ?, ?, ?, 'Booked')",
          [userId, roomId, checkIn, checkOut],
          (err) => {
            if (err) res.status(500).json({ error: err.message });
            else res.json({ success: true, message: "Booking successful!" });
          }
        );
      }
    }
  );
});


module.exports = router;
