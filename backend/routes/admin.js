const express = require("express");
const router = express.Router();
const connection = require("../config/db");
const bcrypt = require("bcryptjs");

// Admin signup with password hashing
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    connection.query(
      "INSERT INTO admins (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Admin Signup successful" });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin login with password verification
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  connection.query(
    "SELECT * FROM admins WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.length === 0) {
        return res.json({ success: false, message: "Invalid email or password" });
      }

      const admin = results[0];

      // Compare entered password with stored hash
      const isMatch = await bcrypt.compare(password, admin.password);

      if (isMatch) {
        res.json({ success: true });
      } else {
        res.json({ success: false, message: "Invalid email or password" });
      }
    }
  );
});
router.get("/dashboard", (req, res) => {
  connection.query(
    `SELECT COUNT(*) AS totalBookings, SUM(price) AS revenue, 
            (SELECT COUNT(*) FROM rooms WHERE status='Available') AS availableRooms
     FROM room_bookings`,
    (err, results) => {
      if (err) res.status(500).json({ error: err.message });
      else res.json(results[0]);
    }
  );
});
router.get("/hotel-requests", (req, res) => {
  connection.query("SELECT * FROM hotels WHERE status = 'Pending'", (err, results) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(results);
  });
});

router.put("/hotel-requests/:id", (req, res) => {
  const hotelId = req.params.id;
  const { status } = req.body;
  
  connection.query("UPDATE hotels SET status = ? WHERE id = ?", [status, hotelId], (err, results) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ message: "Hotel status updated successfully" });
  });
});
router.get("/users", (req, res) => {
  connection.query("SELECT id, name, email, status FROM users", (err, results) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(results);
  });
});
router.get("/hotels", (req, res) => {
  connection.query("SELECT * FROM hotels", (err, results) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(results);
  });
});

router.put("/hotels/:id", (req, res) => {
  const hotelId = req.params.id;
  const { name } = req.body;
  
  connection.query("UPDATE hotels SET name = ? WHERE id = ?", [name, hotelId], (err, results) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ message: "Hotel name updated successfully" });
  });
});



module.exports = router;
