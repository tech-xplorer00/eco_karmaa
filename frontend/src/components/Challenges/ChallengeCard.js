import React, { useState } from 'react';
import { 
  FaTrophy, FaClock, FaCheck, FaSpinner 
} from 'react-icons/fa';
import { useChallenges } from '../../contexts/ChallengeContext';
import './Challenges.css';

const ChallengeCard = ({ challenge }) => {
  const { updateChallengeProgress, accomplishChallenge } = useChallenges();
  const [isUpdating, setIsUpdating] = useState(false);
  const [showBadgeAnimation, setShowBadgeAnimation] = useState(false);
  const [earnedBadge, setEarnedBadge] = useState(null);

  const handleProgressUpdate = (e) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue) && newValue >= 0) {
      updateChallengeProgress(challenge.id, newValue);
    }
  };

  const handleAccomplish = () => {
    setIsUpdating(true);
    const badge = accomplishChallenge(challenge.id);
    
    if (badge) {
      setEarnedBadge(badge);
      setShowBadgeAnimation(true);
      
      // Hide animation after 3 seconds
      setTimeout(() => {
        setShowBadgeAnimation(false);
        setEarnedBadge(null);
        setIsUpdating(false);
      }, 3000);
    } else {
      setIsUpdating(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No deadline';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getStatusClass = () => {
    switch (challenge.status) {
      case 'in-progress': return 'status-progress';
      case 'completed': return 'status-completed';
      case 'accomplished': return 'status-accomplished';
      default: return 'status-pending';
    }
  };

  const getStatusText = () => {
    switch (challenge.status) {
      case 'in-progress': return 'In Progress';
      case 'completed': return 'Completed';
      case 'accomplished': return 'Accomplished';
      default: return 'Pending';
    }
  };

  const isExpired = challenge.isExpired && challenge.isExpired();

  return (
    <div className={`challenge-card ${getStatusClass()} ${isExpired ? 'expired' : ''}`}>
      {showBadgeAnimation && earnedBadge && (
        <div className="badge-earned-animation">
          <div className="badge-icon-large">
            {earnedBadge.icon || <FaTrophy />}
          </div>
          <h3>Badge Earned!</h3>
          <p>{earnedBadge.name}</p>
          <p className="badge-description">{earnedBadge.description}</p>
        </div>
      )}
      
      <div className="challenge-status">
        <span className={`status-indicator ${getStatusClass()}`}>{getStatusText()}</span>
        {challenge.deadline && (
          <div className="challenge-deadline">
            <FaClock />
            <span>{isExpired ? 'Expired' : formatDate(challenge.deadline)}</span>
          </div>
        )}
      </div>
      
      <h3 className="challenge-title">{challenge.title}</h3>
      <p className="challenge-description">{challenge.description}</p>
      
      <div className="challenge-target">
        <span>Target: {challenge.targetCondition} - {challenge.targetValue}</span>
      </div>
      
      <div className="challenge-progress">
        <div className="progress-bar-container">
          <div 
            className="progress-bar" 
            style={{ width: `${challenge.getProgressPercentage()}%` }}
          ></div>
        </div>
        <span className="progress-text">
          {challenge.currentValue} / {challenge.targetValue} ({challenge.getProgressPercentage()}%)
        </span>
      </div>
      
      {challenge.status !== 'accomplished' && (
        <div className="challenge-actions">
          {challenge.status !== 'completed' && (
            <div className="update-progress">
              <input 
                type="number" 
                min="0" 
                max={challenge.targetValue} 
                value={challenge.currentValue} 
                onChange={handleProgressUpdate} 
                disabled={isUpdating || challenge.status === 'accomplished'}
              />
              <button 
                className="update-btn"
                onClick={() => updateChallengeProgress(challenge.id, challenge.currentValue)}
                disabled={isUpdating}
              >
                Update
              </button>
            </div>
          )}
          
          {challenge.status === 'completed' && (
            <button 
              className="accomplish-btn"
              onClick={handleAccomplish}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <>
                  <FaSpinner className="fa-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <FaCheck />
                  Claim Reward
                </>
              )}
            </button>
          )}
        </div>
      )}
      
      {challenge.badgeReward && (
        <div className="challenge-reward">
          <FaTrophy />
          <span>Reward: {challenge.badgeReward} Badge + {challenge.pointsReward} points</span>
        </div>
      )}
    </div>
  );
};

export default ChallengeCard;