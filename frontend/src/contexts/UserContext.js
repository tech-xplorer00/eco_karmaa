import React, { createContext, useContext, useState, useEffect } from 'react';
import userService from '../services/userService';
import { useAuth } from './AuthContext';

// Create the context
const UserContext = createContext();

// Create the provider component
export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser, updateUser } = useAuth();

  // Load user profile when user changes
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!currentUser) {
        setUserProfile(null);
        setUserStats(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // Fetch user profile
        const profileResponse = await userService.getProfile();
        setUserProfile(profileResponse.data || {});
        
        // Fetch user stats
        const statsResponse = await userService.getUserStats();
        setUserStats(statsResponse.data || {});
        
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch user data');
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [currentUser]);

  // Update user profile
  const updateProfile = async (userData) => {
    setLoading(true);
    try {
      const response = await userService.updateProfile(userData);
      setUserProfile(response.data || {});
      
      // Update the auth context with new user data
      if (response.data) {
        updateUser(response.data);
      }
      
      setError(null);
      return response;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Update user password
  const updatePassword = async (passwordData) => {
    setLoading(true);
    try {
      const response = await userService.updatePassword(passwordData);
      setError(null);
      return response;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update password');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{
      userProfile,
      userStats,
      loading,
      error,
      updateProfile,
      updatePassword
    }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};