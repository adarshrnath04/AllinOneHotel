const express = require("express");
const router = express.Router();
const connection = require("../config/db");

// Hotel Owner signup
router.post("/register", (req, res) => {
  console.log("Hotel signup data:", req.body); // see if data received

  const { name, email, password, location } = req.body;

  connection.query(
    "INSERT INTO hotels (name, email, password, location) VALUES (?, ?, ?, ?)",
    [name, email, password, location],
    (err, results) => {
      if (err) {
        console.error("Signup DB error:", err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Hotel Owner Signup successful" });
    }
  );
});


// Hotel owner login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  connection.query("SELECT * FROM hotels WHERE email = ? AND password = ?", [email, password], (err, results) => {
    if (err) res.status(500).json({ error: err.message });
    else if (results.length > 0) res.json({ success: true });
    else res.json({ success: false });
  });
});

router.get("/", (req, res) => {
  connection.query("SELECT * FROM hotels", (err, results) => {
    if (err) {
      console.error("Error fetching hotels:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(results);
  });
});

router.get("/:id", (req, res) => {
  connection.query("SELECT * FROM hotels WHERE id = ?", [req.params.id], (err, results) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(results[0]);
  });
});

router.get("/rooms", (req, res) => {
  const hotelId = req.query.hotelId;
  connection.query("SELECT * FROM rooms WHERE hotel_id = ?", [hotelId], (err, results) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(results);
  });
});

router.get("/analytics", (req, res) => {
  const hotelId = req.query.hotelId;

  connection.query(
    `SELECT SUM(price) AS revenue, 
            (SELECT COUNT(*) / (SELECT COUNT(*) FROM rooms WHERE hotel_id = ?) * 100 FROM room_bookings WHERE hotel_id = ?) AS occupancy,
            (SELECT MONTH(check_in) AS month, SUM(price) AS total FROM room_bookings WHERE hotel_id = ? GROUP BY MONTH(check_in)) AS bookings
     FROM room_bookings WHERE hotel_id = ?`,
    [hotelId, hotelId, hotelId, hotelId],
    (err, results) => {
      if (err) res.status(500).json({ error: err.message });
      else res.json(results[0]);
    }
  );
});
router.get("/bookings", (req, res) => {
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


module.exports = router;
