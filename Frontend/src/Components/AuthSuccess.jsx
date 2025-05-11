import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const AuthSuccess = () => {
  const navigate = useNavigate();
  const { checkAuthStatus, isLoading } = useUser();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await checkAuthStatus();
        // Redirect to papers page after successful authentication
        navigate('/papers');
      } catch (error) {
        console.error('Authentication verification failed:', error);
        navigate('/');
      }
    };

    verifyAuth();
  }, [checkAuthStatus, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-950">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4 text-white">Authentication Successful</h1>
        <p className="mb-4 text-slate-300">Redirecting to Question Papers...</p>
        {isLoading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthSuccess;