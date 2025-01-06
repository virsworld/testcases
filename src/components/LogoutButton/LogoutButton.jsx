import React from "react";
import { useNavigate } from "react-router-dom";
require('dotenv').config();

const LogoutButton = ({ onLogout }) => {
  const navigate = useNavigate();
  const SERVER_URL = "https://testcases-server.onrender.com";

  const handleLogout = async () => {
    try {
        // Call the backend logout endpoint
        const response = await fetch(`${SERVER_URL}/auth/logout`, {
            method: "GET",
            credentials: "include", // Ensures cookies are sent with the request
        });

        if (!response.ok) {
            throw new Error("Failed to log out from the server.");
        }

        // Perform additional client-side cleanup if necessary
        localStorage.removeItem("authToken");

        // Redirect the user to the login page
        navigate("/");
    } catch (err) {
        console.error("Error during logout:", err.message);
        alert("An error occurred while logging out. Please try again.");
    }
};

  return (
    <button
    onClick={handleLogout}
    className="bg-accent text-primary-dark py-2 px-4 rounded shadow-lg hover:bg-accent-light hover:shadow-xl transition duration-300"
    >
    Logout
    </button>
  );
};

export default LogoutButton;