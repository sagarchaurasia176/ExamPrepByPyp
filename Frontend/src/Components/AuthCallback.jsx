import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/UserContext';

function AuthCallback() {
  const { login } = useUser();
  const navigate = useNavigate();
  
  // API URL from environment or use default
  const API_URL =import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get user data after successful authentication
        const response = await axios.get(`${API_URL}/auths/profile`, {
          withCredentials: true,
        }); 
        
        if (response.data.success) {
          console.log("Auth successful, user data:", response.data.user);
          
          // Store user data in context and localStorage
          login(response.data.user);
          
          // Navigate to the stored redirect path or default to home
          const redirectPath = localStorage.getItem('redirectAfterLogin') || '/';
          navigate(redirectPath);
        } else {
          console.error("Auth callback: No success in response");
          navigate('/');
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate('/');
      }
    };

    fetchUserData();
  }, [login, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white">
      <div className="w-16 h-16 border-t-4 border-green-400 border-solid rounded-full animate-spin mb-6"></div>
      <h2 className="text-2xl font-semibold mb-2">Completing Login</h2>
      <p className="text-slate-300">Please wait while we verify your information...</p>
    </div>
  );
}

export default AuthCallback;