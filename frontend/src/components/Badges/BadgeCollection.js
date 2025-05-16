import React from 'react';
import { useChallenges } from '../../contexts/ChallengeContext';
import { FaTrophy } from 'react-icons/fa';
import './Badges.css';

const BadgeCollection = () => {
  const { userBadges, userPoints } = useChallenges();

  // Badge metadata
  const badgeDetails = {
    'Eco Beginner': {
      description: 'Started your eco-friendly journey',
      icon: '🌱',
      rarity: 'common'
    },
    'Water Saver': {
      description: 'Successfully reduced water consumption',
      icon: '🌊',
      rarity: 'uncommon'
    },
    'Zero Waste Hero': {
      description: 'Went a full week without producing waste',
      icon: '♻️',
      rarity: 'rare'
    },
    'Green Thumb': {
      description: 'Successfully planted and maintained a garden',
      icon: '🌱',
      rarity: 'uncommon'
    },
    'Power Shifter': {
      description: 'Switched to renewable energy sources',
      icon: '⚡',
      rarity: 'epic'
    },
    'Plastic Fighter': {
      description: 'Completed a month without purchasing single-use plastics',
      icon: '🚫',
      rarity: 'legendary'
    }
  };

  const getRarityClass = (rarity) => {
    return `badge-${rarity || 'common'}`;
  };

  return (
    <div className="badges-container">
      <div className="badges-header">
        <h2>Your Badges</h2>
        <div className="user-points">
          <FaTrophy />
          <span>{userPoints} Points</span>
        </div>
      </div>

      <div className="badges-grid">
        {userBadges.map((badgeName) => {
          const badge = badgeDetails[badgeName] || { 
            description: 'A mystery badge', 
            icon: '❓', 
            rarity: 'common' 
          };
          
          return (
            <div key={badgeName} className={`badge-card ${getRarityClass(badge.rarity)}`}>
              <div className="badge-icon">
                {badge.icon}
              </div>
              <h3 className="badge-name">{badgeName}</h3>
              <p className="badge-description">{badge.description}</p>
              <span className="badge-rarity">{badge.rarity}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BadgeCollection;