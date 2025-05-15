import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import cookies from 'js-cookie';
const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const API_URL='http://localhost:5000';

  // Check authentication status on component mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = cookies.get('connect.sid') || localStorage.getItem('userData');
        console.log("cookies");
        console.log(storedUser);
        
        
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
        await checkAuthStatus();
      } catch (error) {
        console.error('Initial auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };
    initializeAuth();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(`${API_URL}/auths/profile`, {
        withCredentials: true,
      });
      console.log("auths/profile");
      console.log(response);
      

      if (response.data.success) {
        const userData = response.data.user;
        setUser(userData);
        setIsAuthenticated(true);
        cookies.set('connect.sid', response.data.sessionId, { expires:12});
        localStorage.setItem('userData', JSON.stringify(userData));
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      if (error.response?.status === 401) {
        handleCleanLogout();
      }
    }
  };

  const login = async (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    cookies.set('connect.sid', userData.sessionId, { expires: 12 });
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const handleCleanLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    cookies.remove('connect.sid');
    localStorage.removeItem('userData');
  };

  const logout = async () => {
    try {
      await axios.get(`${API_URL}/auths/logout`, { withCredentials: true });
      handleCleanLogout();
      return true;
    } catch (error) {
      console.error('Logout failed:', error);
      handleCleanLogout(); // Ensure clean state even if API call fails
      return false;
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    checkAuthStatus,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};