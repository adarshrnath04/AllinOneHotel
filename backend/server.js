const express = require("express");
const cors = require("cors");
const connection = require("./config/db");
const userRoutes = require("./routes/users");
const hotelRoutes = require("./routes/hotels");
const bookingRoutes = require("./routes/bookings");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);
app.use("/hotels", hotelRoutes);  // mounts /hotels route
app.use("/bookings", bookingRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
