import React from 'react';
import { useBadges } from '../../contexts/BadgeContext';
import { useUser } from '../../contexts/UserContext';
import { FaTrophy } from 'react-icons/fa';
import './Badges.css';

const BadgeCollection = () => {
  const { badges, userBadges, loading, error } = useBadges();
  const { userStats } = useUser();

  const getRarityClass = (rarity) => {
    return `badge-${rarity || 'common'}`;
  };

  return (
    <div className="badges-container">
      <div className="badges-header">
        <h2>Your Badges</h2>
        <div className="user-points">
          <FaTrophy />
          <span>{userStats?.points || 0} Points</span>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading badges...</p>
        </div>
      ) : (
        <div className="badges-grid">
          {userBadges.length > 0 ? (
            userBadges.map((badge) => (
              <div 
                key={badge._id} 
                className={`badge-card ${getRarityClass(badge.rarity)}`}
              >
                <div className="badge-icon">
                  {badge.icon || '🏆'}
                </div>
                <h3 className="badge-name">{badge.name}</h3>
                <p className="badge-description">{badge.description}</p>
                <span className="badge-rarity">{badge.rarity}</span>
              </div>
            ))
          ) : (
            <div className="no-badges">
              <p>You haven't earned any badges yet. Complete challenges to earn badges!</p>
            </div>
          )}
        </div>
      )}

      <div className="available-badges">
        <h3>Available Badges</h3>
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <div className="badges-grid">
            {badges.filter(badge => !userBadges.some(ub => ub._id === badge._id)).map((badge) => (
              <div 
                key={badge._id} 
                className={`badge-card locked ${getRarityClass(badge.rarity)}`}
              >
                <div className="badge-icon locked">
                  {badge.icon || '🏆'}
                </div>
                <h3 className="badge-name">{badge.name}</h3>
                <p className="badge-description">{badge.description}</p>
                <span className="badge-rarity">{badge.rarity}</span>
                <div className="badge-locked-overlay">
                  <span>Locked</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BadgeCollection;