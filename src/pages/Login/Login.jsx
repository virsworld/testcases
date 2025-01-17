import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AboutRedirectButton from '../../components/AboutRedirectButton/AboutRedirectButton';

const Login = () => {
  const SERVER_URL = "https://testcases-server.onrender.com";
  const navigate = useNavigate();

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/auth/status`, {
          withCredentials: true, // Ensure cookies are sent for session validation
        });

        if (response.data.loggedIn) {
          navigate('/home'); // Redirect to home if logged in
        }
      } catch (error) {
        console.error('Error checking authentication status:', error);
      }
    };

    checkAuthStatus();
  }, [SERVER_URL, navigate]);

  const handleGuestLogin = () => {
    navigate('/home'); // Adjust the path as needed
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-4">
      <a
        href={`${SERVER_URL}/auth/github`}
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