import axios from "axios";

// Fetch hotels
export const fetchHotels = async () => {
  try {
    const response = await axios.get("http://localhost:5000/hotels");
    return response.data;
  } catch (error) {
    console.error("Error fetching hotels:", error);
  }
};

// Register a user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post("http://localhost:5000/users/register", userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
  }
};
