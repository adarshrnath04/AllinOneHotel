import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ hotelName, onLogout }) {
  return (
    <nav style={styles.navbar}>
      <h2 style={styles.appName}>Hotel Management</h2>
      <h3 style={styles.hotelName}>{hotelName}</h3>
      <button style={styles.logoutButton} onClick={onLogout}>Logout</button>
    </nav>
  );
}

const styles = {
  navbar: {
    background: "#333",
    color: "white",
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appName: { margin: "0" },
  hotelName: { margin: "0" },
  logoutButton: {
    background: "red",
    color: "white",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
  },
};
