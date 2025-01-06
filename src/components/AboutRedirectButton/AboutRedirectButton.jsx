import React from "react";
import { useNavigate } from "react-router-dom";

const AboutRedirectButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/about")}
      className="fixed bottom-4 right-4 bg-accent text-secondary py-2 px-4 rounded-full shadow-md hover:bg-accent-light hover:shadow-lg transition duration-300"
      title="Learn more about us"
    >
      Read Me
    </button>
  );
};

export default AboutRedirectButton;