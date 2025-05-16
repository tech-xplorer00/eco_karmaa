import React from 'react';
import { useRewards } from '../../contexts/RewardContext';
import { useUser } from '../../contexts/UserContext';
import { FaTrophy, FaGift } from 'react-icons/fa';
import './Rewards.css';

const RewardCollection = () => {
  const { rewards, userRewards, loading, error, redeemReward, hasRedeemed } = useRewards();
  const { userStats } = useUser();

  const handleRedeemReward = async (id) => {
    try {
      await redeemReward(id);
    } catch (err) {
      console.error('Error redeeming reward:', err);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getRarityClass = (rarity) => {
    return `reward-${rarity || 'common'}`;
  };

  return (
    <div className="rewards-container">
      <div className="rewards-header">
        <h2>Your Rewards</h2>
        <div className="user-points">
          <FaTrophy />
          <span>{userStats?.points || 0} Points Available</span>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading rewards...</p>
        </div>
      ) : (
        <>
          {/* User's earned rewards */}
          <div className="rewards-section">
            <h3>Your Earned Rewards</h3>
            {userRewards.length > 0 ? (
              <div className="rewards-grid">
                {userRewards.map((reward) => (
                  <div key={reward._id} className={`reward-card ${getRarityClass(reward.rarity)}`}>
                    <div className="reward-redeemed">{reward.redeemed ? 'Redeemed' : 'Available'}</div>
                    <div className="reward-icon">
                      {reward.icon || '🎁'}
                    </div>
                    <h3 className="reward-name">{reward.name}</h3>
                    <p className="reward-description">{reward.description}</p>
                    
                    <div className="reward-meta">
                      <div className="reward-points">
                        <FaGift />
                        <span>{reward.pointsValue} points</span>
                      </div>
                      <div className="reward-date">
                        Earned: {formatDate(reward.earnedAt || new Date())}
                      </div>
                    </div>
                    
                    <button 
                      className="reward-redeem-btn" 
                      onClick={() => handleRedeemReward(reward._id)}
                      disabled={reward.redeemed}
                    >
                      {reward.redeemed ? 'Redeemed' : 'Redeem'}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-rewards">
                <p>You haven't earned any rewards yet. Complete challenges to earn points!</p>
              </div>
            )}
          </div>

          {/* Available rewards to earn */}
          <div className="rewards-section">
            <h3>Available Rewards</h3>
            <div className="rewards-grid">
              {rewards.filter(reward => !userRewards.some(ur => ur._id === reward._id)).map((reward) => (
                <div key={reward._id} className={`reward-card ${getRarityClass(reward.rarity)}`}>
                  <div className="reward-icon">
                    {reward.icon || '🎁'}
                  </div>
                  <h3 className="reward-name">{reward.name}</h3>
                  <p className="reward-description">{reward.description}</p>
                  
                  <div className="reward-meta">
                    <div className="reward-points">
                      <FaGift />
                      <span>{reward.pointsValue} points</span>
                    </div>
                  </div>
                  
                  <button 
                    className="reward-redeem-btn" 
                    onClick={() => handleRedeemReward(reward._id)}
                    disabled={(userStats?.points || 0) < reward.pointsValue}
                  >
                    {(userStats?.points || 0) < reward.pointsValue ? 
                      `Need ${reward.pointsValue - (userStats?.points || 0)} more points` : 
                      `Redeem (${reward.pointsValue} pts)`}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RewardCollection;