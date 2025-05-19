import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserSignup from "./pages/UserSignup";
import UserLogin from "./pages/UserLogin";
import HotelSignup from "./pages/HotelSignup";
import AdminSignup from "./pages/AdminSignup";
import AdminLogin from "./pages/AdminLogin";
import HotelLogin from "./pages/HotelLogin";
import Hotels from "./pages/Hotels";
import UserHome from "./pages/UserHome";
import './App.css'
import UserBookings from './pages/UserBookings'
import BookHotel from "./pages/BookHotel";
import HotelDashboard from "./pages/HotelDashboard";
import ManageRooms from "./pages/ManageRooms";
import ConfirmBooking from "./pages/ConfirmBooking";
import Analytics from "./pages/Analytics";
import ViewBookings from "./pages/ViewBookings";
import Navbar from "./components/Navbar";
import { useState } from "react";
import AdminDashboard from "./pages/AdminDashboard";
import ManageUsers from "./pages/ManageUsers";
import ManageHotels from "./pages/ManageHotels";
import RevenueAnalytics from "./pages/RevenueAnalytics";
import BookingSoon from "./pages/BookingSoon";

export default function App() {
    const [hotelName, setHotelName] = useState("Luxury Stay");

    const handleLogout = () => {
  sessionStorage.clear();  // Clear session storage
  localStorage.clear();    // Clear local storage (if used)
  window.location.href = "/login/hotel";  // Redirect to login page
};


    // Add actual logout logic here
  return (
    <Router>
      <Navbar hotelName={hotelName} onLogout={handleLogout} />
      <Routes>
        <Route path="/signup/user" element={<UserSignup />} />
        <Route path="/login/user" element={<UserLogin />} />
        <Route path="/signup/hotel" element={<HotelSignup />} />
        <Route path="/signup/admin" element={<AdminSignup />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/login/hotel" element={<HotelLogin />} />

         <Route path="/home" element={<UserHome />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/bookings" element={<UserBookings />} />
        <Route path="/bookings/:id" element={<BookHotel />} />
         <Route path="/confirm-booking" element={<ConfirmBooking />} />
          <Route path="/hotel/dashboard" element={<HotelDashboard />} />
  <Route path="/manage-rooms" element={<ManageRooms />} />
   <Route path="/analytics" element={<Analytics />} />
   <Route path="/view-bookings" element={<ViewBookings />} />
   <Route path="/admin/dashboard" element={<AdminDashboard />} />
    <Route path="/admin/users" element={<ManageUsers />} />
      <Route path="/admin/hotels" element={<ManageHotels />} />
       <Route path="/admin/revenue" element={<RevenueAnalytics />} />
           <Route path="/admin/view-bookings" element={<BookingSoon />} />
      </Routes>
    </Router>
  );
}
