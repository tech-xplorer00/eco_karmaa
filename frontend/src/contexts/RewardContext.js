import React, { createContext, useContext, useState, useEffect } from 'react';
import rewardService from '../services/rewardService';
import { useAuth } from './AuthContext';

// Create the context
const RewardContext = createContext();

// Create the provider component
export const RewardProvider = ({ children }) => {
  const [rewards, setRewards] = useState([]);
  const [userRewards, setUserRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  // Load rewards when component mounts
  useEffect(() => {
    const fetchRewards = async () => {
      setLoading(true);
      try {
        const response = await rewardService.getAllRewards();
        setRewards(response.data || []);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch rewards');
        console.error('Error fetching rewards:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRewards();
  }, []);

  // Load user rewards when user changes
  useEffect(() => {
    const fetchUserRewards = async () => {
      if (!currentUser) {
        setUserRewards([]);
        return;
      }

      setLoading(true);
      try {
        const response = await rewardService.getUserRewards();
        setUserRewards(response.data || []);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch user rewards');
        console.error('Error fetching user rewards:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRewards();
  }, [currentUser]);

  // Redeem a reward
  const redeemReward = async (rewardId) => {
    try {
      const response = await rewardService.redeemReward(rewardId);
      
      // Update user rewards list with the newly redeemed reward
      if (response.data) {
        setUserRewards(prev => [...prev, response.data]);
      }
      
      return response;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to redeem reward');
      throw err;
    }
  };
  
  // Check if user has redeemed a specific reward
  const hasRedeemed = (rewardId) => {
    return userRewards.some(reward => reward._id === rewardId);
  };
  
  // Calculate how many points the user has available to spend
  const getAvailablePoints = () => {
    return currentUser ? (currentUser.points || 0) : 0;
  };

  return (
    <RewardContext.Provider value={{
      rewards,
      userRewards,
      loading,
      error,
      redeemReward,
      hasRedeemed,
      getAvailablePoints
    }}>
      {children}
    </RewardContext.Provider>
  );
};

// Custom hook to use the reward context
export const useRewards = () => {
  const context = useContext(RewardContext);
  if (!context) {
    throw new Error('useRewards must be used within a RewardProvider');
  }
  return context;
}; 