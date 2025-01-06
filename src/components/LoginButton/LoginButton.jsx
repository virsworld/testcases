import React from "react";
import { useNavigate } from "react-router-dom";

const LoginButton = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    navigate("/");
};

  return (
    <button
    onClick={handleLogin}
    className="bg-primary text-secondary py-2 px-4 rounded shadow-lg hover:bg-primary-dark hover:shadow-xl transition duration-300"
    >
    Login
    </button>
  );
};

export default LoginButton;