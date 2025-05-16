import React, { createContext, useContext, useState, useEffect } from 'react';
import challengeService from '../services/challengeService';
import { useAuth } from './AuthContext';

// Create the context
const ChallengeContext = createContext();

// Create the provider component
export const ChallengeProvider = ({ children }) => {
  const [challenges, setChallenges] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  // Load challenges when component mounts or user changes
  useEffect(() => {
    const fetchChallenges = async () => {
      setLoading(true);
      try {
        if (currentUser) {
          const response = await challengeService.getUserChallenges();
          setChallenges(response.data || []);
        } else {
          const response = await challengeService.getAllChallenges();
          setChallenges(response.data || []);
        }
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch challenges');
        console.error('Error fetching challenges:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, [currentUser]);

  // Filter challenges based on the selected filter
  const filteredChallenges = challenges.filter(challenge => {
    switch (filter) {
      case 'ongoing':
        return challenge.status === 'in-progress' || challenge.status === 'pending';
      case 'completed':
        return challenge.status === 'completed';
      case 'accomplished':
        return challenge.status === 'accomplished';
      default:
        return true;
    }
  });

  // Join a challenge (the backend would need this endpoint)
  const joinChallenge = async (challengeId) => {
    try {
      const response = await challengeService.joinChallenge(challengeId);
      
      // Update the local challenges state
      setChallenges(prevChallenges => {
        return prevChallenges.map(challenge => 
          challenge._id === challengeId 
            ? { ...challenge, status: 'in-progress' } 
            : challenge
        );
      });
      
      return response;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to join challenge');
      throw err;
    }
  };

  // Create a new challenge
  const createChallenge = async (challengeData) => {
    try {
      const response = await challengeService.createChallenge(challengeData);
      
      // Add the new challenge to the local state
      setChallenges(prevChallenges => [...prevChallenges, response.data]);
      
      return response;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create challenge');
      throw err;
    }
  };

  // Update challenge progress
  const updateChallengeProgress = async (challengeId, progressData) => {
    try {
      const response = await challengeService.updateProgress(challengeId, progressData);
      
      // Update the local challenges state
      setChallenges(prevChallenges => {
        return prevChallenges.map(challenge => 
          challenge._id === challengeId 
            ? { ...challenge, ...response.data } 
            : challenge
        );
      });
      
      return response;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update progress');
      throw err;
    }
  };

  // Complete a challenge
  const completeChallenge = async (challengeId) => {
    try {
      const response = await challengeService.completeChallenge(challengeId);
      
      // Update the local challenges state
      setChallenges(prevChallenges => {
        return prevChallenges.map(challenge => 
          challenge._id === challengeId 
            ? { ...challenge, status: 'accomplished' } 
            : challenge
        );
      });
      
      return response;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to complete challenge');
      throw err;
    }
  };
  
  // Helper function to get progress percentage
  const getProgressPercentage = (challenge) => {
    return Math.round((challenge.currentValue / challenge.targetValue) * 100);
  };

  return (
    <ChallengeContext.Provider value={{
      challenges: filteredChallenges,
      filter,
      setFilter,
      loading,
      error,
      joinChallenge,
      createChallenge,
      updateChallengeProgress,
      completeChallenge,
      getProgressPercentage
    }}>
      {children}
    </ChallengeContext.Provider>
  );
};

// Custom hook to use the challenge context
export const useChallenges = () => {
  const context = useContext(ChallengeContext);
  if (!context) {
    throw new Error('useChallenges must be used within a ChallengeProvider');
  }
  return context;
};