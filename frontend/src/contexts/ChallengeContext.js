import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const ChallengeContext = createContext();

// Mock data for challenges
const mockChallenges = [
  {
    id: 1,
    title: 'Reduce Water Usage',
    description: 'Reduce your daily water consumption by tracking and minimizing usage.',
    targetCondition: 'Save Water',
    targetValue: 100,
    currentValue: 45,
    status: 'in-progress',
    badgeReward: 'Water Saver',
    pointsReward: 500,
    deadline: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString(),
    getProgressPercentage: function() {
      return Math.round((this.currentValue / this.targetValue) * 100);
    },
    isExpired: function() {
      return new Date(this.deadline) < new Date();
    }
  },
  {
    id: 2,
    title: 'Zero Waste Week',
    description: 'Go an entire week without producing any non-recyclable waste.',
    targetCondition: 'Days Completed',
    targetValue: 7,
    currentValue: 7,
    status: 'completed',
    badgeReward: 'Zero Waste Hero',
    pointsReward: 1000,
    deadline: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(),
    getProgressPercentage: function() {
      return Math.round((this.currentValue / this.targetValue) * 100);
    },
    isExpired: function() {
      return new Date(this.deadline) < new Date();
    }
  },
  {
    id: 3,
    title: 'Plant a Garden',
    description: 'Plant and maintain a garden with native plants to support local ecosystems.',
    targetCondition: 'Plants',
    targetValue: 10,
    currentValue: 10,
    status: 'accomplished',
    badgeReward: 'Green Thumb',
    pointsReward: 750,
    deadline: null,
    getProgressPercentage: function() {
      return Math.round((this.currentValue / this.targetValue) * 100);
    },
    isExpired: function() {
      return false;
    }
  },
  {
    id: 4,
    title: 'Renewable Energy Switch',
    description: 'Switch to renewable energy sources for your home.',
    targetCondition: 'Completion',
    targetValue: 100,
    currentValue: 25,
    status: 'in-progress',
    badgeReward: 'Power Shifter',
    pointsReward: 1500,
    deadline: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString(),
    getProgressPercentage: function() {
      return Math.round((this.currentValue / this.targetValue) * 100);
    },
    isExpired: function() {
      return new Date(this.deadline) < new Date();
    }
  },
  {
    id: 5,
    title: 'Plastic-Free Month',
    description: 'Go an entire month without purchasing single-use plastics.',
    targetCondition: 'Days Completed',
    targetValue: 30,
    currentValue: 0,
    status: 'pending',
    badgeReward: 'Plastic Fighter',
    pointsReward: 1200,
    deadline: new Date(new Date().setDate(new Date().getDate() + 60)).toISOString(),
    getProgressPercentage: function() {
      return Math.round((this.currentValue / this.targetValue) * 100);
    },
    isExpired: function() {
      return new Date(this.deadline) < new Date();
    }
  }
];

// Sample badge objects for rewards
const badges = {
  'Water Saver': {
    name: 'Water Saver',
    description: 'Successfully reduced water consumption',
    icon: '🌊',
    rarity: 'uncommon'
  },
  'Zero Waste Hero': {
    name: 'Zero Waste Hero',
    description: 'Went a full week without producing waste',
    icon: '♻️',
    rarity: 'rare'
  },
  'Green Thumb': {
    name: 'Green Thumb',
    description: 'Successfully planted and maintained a garden',
    icon: '🌱',
    rarity: 'uncommon'
  },
  'Power Shifter': {
    name: 'Power Shifter',
    description: 'Switched to renewable energy sources',
    icon: '⚡',
    rarity: 'epic'
  },
  'Plastic Fighter': {
    name: 'Plastic Fighter',
    description: 'Completed a month without purchasing single-use plastics',
    icon: '🚫',
    rarity: 'legendary'
  }
};

// Create the provider component
export const ChallengeProvider = ({ children }) => {
  const [challenges, setChallenges] = useState(mockChallenges);
  const [filter, setFilter] = useState('all');
  const [userPoints, setUserPoints] = useState(250);
  const [userBadges, setUserBadges] = useState(['Eco Beginner']);

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

  // Update challenge progress
  const updateChallengeProgress = (id, newValue) => {
    setChallenges(prevChallenges => {
      return prevChallenges.map(challenge => {
        if (challenge.id === id) {
          const updatedChallenge = { ...challenge, currentValue: newValue };
          
          // Check if the challenge is now completed
          if (newValue >= challenge.targetValue && challenge.status !== 'accomplished') {
            updatedChallenge.status = 'completed';
          } else if (newValue < challenge.targetValue && challenge.status === 'completed') {
            updatedChallenge.status = 'in-progress';
          }
          
          return updatedChallenge;
        }
        return challenge;
      });
    });
  };

  // Accomplish a challenge and earn the badge
  const accomplishChallenge = (id) => {
    let earnedBadge = null;
    
    setChallenges(prevChallenges => {
      return prevChallenges.map(challenge => {
        if (challenge.id === id && challenge.status === 'completed') {
          earnedBadge = badges[challenge.badgeReward];
          
          // Add badge to user's collection
          if (!userBadges.includes(challenge.badgeReward)) {
            setUserBadges(prev => [...prev, challenge.badgeReward]);
          }
          
          // Add points to user's total
          setUserPoints(prev => prev + challenge.pointsReward);
          
          return { ...challenge, status: 'accomplished' };
        }
        return challenge;
      });
    });
    
    return earnedBadge;
  };

  return (
    <ChallengeContext.Provider value={{
      challenges: filteredChallenges,
      filter,
      setFilter,
      updateChallengeProgress,
      accomplishChallenge,
      userPoints,
      userBadges
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