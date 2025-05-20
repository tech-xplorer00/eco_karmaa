import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import { goToLogin } from '../services/navigationService';

// Create context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user on initial mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        if (authService.isAuthenticated()) {
          const userData = await authService.getCurrentUser();
          setCurrentUser(userData.data);
        }
      } catch (err) {
        console.error('Failed to load user:', err);
        localStorage.removeItem('token');
        // If authentication fails, we don't need to navigate here
        // as the user might be on public page
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Check token status periodically
  useEffect(() => {
    // If token disappears (removed by api.js), redirect to login
    const checkToken = () => {
      if (!authService.isAuthenticated() && currentUser) {
        setCurrentUser(null);
        goToLogin();
      }
    };

    // Check every 2 seconds if token is still there
    const intervalId = setInterval(checkToken, 2000);
    
    return () => clearInterval(intervalId);
  }, [currentUser]);

  // Register a new user
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.register(userData);
      setCurrentUser(response.data.user || response.data);
      return response;
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login a user
  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(credentials);
      setCurrentUser(response.data.user || response.data);
      return response;
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout the current user
  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setCurrentUser(null);
      goToLogin();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Update current user information
  const updateUser = (userData) => {
    setCurrentUser(userData);
  };

  const value = {
    currentUser,
    loading,
    error,
    register,
    login,
    logout,
    updateUser,
    isAuthenticated: authService.isAuthenticated
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 