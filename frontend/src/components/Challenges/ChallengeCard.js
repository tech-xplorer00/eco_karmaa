import React, { useState } from 'react';
import { useChallenges } from '../../contexts/ChallengeContext';
import './Challenges.css';

const ChallengeCard = ({ challenge }) => {
  const { 
    joinChallenge, 
    updateChallengeProgress, 
    completeChallenge,
    getProgressPercentage 
  } = useChallenges();
  
  const [progressValue, setProgressValue] = useState(challenge.currentValue);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState('');

  const progressPercentage = getProgressPercentage(challenge);
  const isCompleted = challenge.status === 'completed' || challenge.status === 'accomplished';
  const isPending = challenge.status === 'pending';
  const isInProgress = challenge.status === 'in-progress';
  
  const handleJoinChallenge = async () => {
    try {
      setIsUpdating(true);
      setError('');
      await joinChallenge(challenge._id);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to join challenge');
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleProgressChange = (e) => {
    setProgressValue(Number(e.target.value));
  };

  const handleProgressSubmit = async (e) => {
    e.preventDefault();
    
    if (progressValue < challenge.currentValue) {
      setError("New value can't be less than current progress");
      return;
    }
    
    if (progressValue > challenge.targetValue) {
      setProgressValue(challenge.targetValue);
    }
    
    try {
      setIsUpdating(true);
      setError('');
      await updateChallengeProgress(challenge._id, { currentValue: progressValue });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update progress');
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCompleteChallenge = async () => {
    try {
      setIsUpdating(true);
      setError('');
      await completeChallenge(challenge._id);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to complete challenge');
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className={`challenge-card ${challenge.status}`}>
      {error && <div className="challenge-error">{error}</div>}
      
      <h3>{challenge.title}</h3>
      <p className="challenge-description">{challenge.description}</p>
      
      <div className="challenge-details">
        <div className="challenge-target">
          <span>Target: </span>
          <strong>{challenge.targetValue} {challenge.targetCondition}</strong>
        </div>
        
        {(isInProgress || isCompleted) && (
          <div className="challenge-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <span className="progress-text">
              {challenge.currentValue} / {challenge.targetValue} 
              ({progressPercentage}%)
            </span>
          </div>
        )}
        
        {challenge.deadline && (
          <div className="challenge-deadline">
            <span>Deadline: </span>
            <strong>{new Date(challenge.deadline).toLocaleDateString()}</strong>
          </div>
        )}
        
        <div className="challenge-rewards">
          <div className="reward-badge">
            <span className="badge-icon">🏆</span>
            <span>{challenge.badgeReward}</span>
          </div>
          <div className="reward-points">
            <span className="point-icon">🌱</span>
            <span>{challenge.pointsReward} points</span>
          </div>
        </div>
      </div>
      
      <div className="challenge-actions">
        {isPending && (
          <button 
            className="btn btn-join" 
            onClick={handleJoinChallenge}
            disabled={isUpdating}
          >
            {isUpdating ? 'Joining...' : 'Join Challenge'}
          </button>
        )}
        
        {isInProgress && (
          <form className="progress-form" onSubmit={handleProgressSubmit}>
            <div className="progress-input-group">
              <input 
                type="number" 
                value={progressValue}
                onChange={handleProgressChange}
                min={challenge.currentValue}
                max={challenge.targetValue}
                disabled={isUpdating}
              />
              <button 
                type="submit" 
                className="btn btn-update"
                disabled={isUpdating || progressValue === challenge.currentValue}
              >
                {isUpdating ? 'Updating...' : 'Update Progress'}
              </button>
            </div>
          </form>
        )}
        
        {isInProgress && progressPercentage === 100 && (
          <button 
            className="btn btn-complete" 
            onClick={handleCompleteChallenge}
            disabled={isUpdating}
          >
            {isUpdating ? 'Completing...' : 'Mark as Complete'}
          </button>
        )}
        
        {isCompleted && (
          <div className="challenge-completed-message">
            Challenge completed! 🎉
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeCard;