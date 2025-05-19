const express = require("express");
const router = express.Router();
const connection = require("../config/db");
const bcrypt = require("bcryptjs");

// User registration with password hashing
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    connection.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "User registered successfully" });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User login with password verification
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      
      if (results.length === 0) {
        return res.json({ success: false, message: "Invalid email or password" });
      }

      const user = results[0];

      // Compare password with stored hash
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        res.json({ success: true });
      } else {
        res.json({ success: false, message: "Invalid email or password" });
      }
    }
  );
});

// Other routes unchanged
router.get("/", (req, res) => {
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(results);
  });
});

router.get("/me", (req, res) => {
  const userId = req.query.id; // Replace with authenticated user logic
  connection.query("SELECT * FROM users WHERE id = ?", [userId], (err, results) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(results[0]);
  });
});

module.exports = router;
