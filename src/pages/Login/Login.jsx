import React from 'react';
import { useNavigate } from 'react-router-dom';
import AboutRedirectButton from '../../components/AboutRedirectButton/AboutRedirectButton';

const Login = () => {
  const navigate = useNavigate();

  const handleGuestLogin = () => {
    // Redirect to the dashboard or a specific guest page
    navigate('/home'); // Adjust the path as needed
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-4">
      <a
        href="http://localhost:5001/auth/github"
        className="bg-primary text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300
         hover:bg-primary-dark hover:scale-105"
      >
        Login with GitHub
      </a>
      <button
        onClick={handleGuestLogin}
        className="bg-secondary text-primary-dark px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300
         hover:bg-gray-200 hover:scale-105"
      >
        Continue as Guest
      </button>

      {/* Added AboutRedirectButton below */}
      <AboutRedirectButton />
    </div>
  );
};

export default Login;