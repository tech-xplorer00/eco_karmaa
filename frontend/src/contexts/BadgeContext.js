import React, { createContext, useContext, useState, useEffect } from 'react';
import badgeService from '../services/badgeService';
import { useAuth } from './AuthContext';

// Create the context
const BadgeContext = createContext();

// Create the provider component
export const BadgeProvider = ({ children }) => {
  const [badges, setBadges] = useState([]);
  const [userBadges, setUserBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  // Load badges when component mounts or user changes
  useEffect(() => {
    const fetchBadges = async () => {
      setLoading(true);
      try {
        const response = await badgeService.getAllBadges();
        setBadges(response.data || []);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch badges');
        console.error('Error fetching badges:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBadges();
  }, []);

  // Load user badges when user changes
  useEffect(() => {
    const fetchUserBadges = async () => {
      if (!currentUser) {
        setUserBadges([]);
        return;
      }

      setLoading(true);
      try {
        const response = await badgeService.getUserBadges();
        setUserBadges(response.data || []);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch user badges');
        console.error('Error fetching user badges:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBadges();
  }, [currentUser]);

  // Check if a badge is earned by the user
  const hasEarnedBadge = (badgeId) => {
    return userBadges.some(badge => badge._id === badgeId);
  };

  // Get user's progress toward a specific badge (if applicable)
  const getBadgeProgress = (badgeId) => {
    const userBadge = userBadges.find(badge => badge._id === badgeId);
    return userBadge ? userBadge.progress || 0 : 0;
  };

  return (
    <BadgeContext.Provider value={{
      badges,
      userBadges,
      loading,
      error,
      hasEarnedBadge,
      getBadgeProgress
    }}>
      {children}
    </BadgeContext.Provider>
  );
};

// Custom hook to use the badge context
export const useBadges = () => {
  const context = useContext(BadgeContext);
  if (!context) {
    throw new Error('useBadges must be used within a BadgeProvider');
  }
  return context;
}; 