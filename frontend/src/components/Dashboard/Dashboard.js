import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useChallenges } from '../../contexts/ChallengeContext';
import { useBadges } from '../../contexts/BadgeContext';
import { useUser } from '../../contexts/UserContext';
import UserProfile from '../User/UserProfile';
import './Dashboard.css';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { challenges, loading: challengesLoading } = useChallenges();
  const { userBadges, loading: badgesLoading } = useBadges();
  const { userProfile, userStats, loading: userLoading } = useUser();
  
  const [selectedTab, setSelectedTab] = useState('overview');

  const loading = challengesLoading || badgesLoading || userLoading;

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  // Active challenges are those in progress
  const activeChallenges = challenges.filter(
    challenge => challenge.status === 'in-progress' || challenge.status === 'pending'
  );
  
  // Recently completed challenges
  const completedChallenges = challenges.filter(
    challenge => challenge.status === 'completed' || challenge.status === 'accomplished'
  ).slice(0, 3);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="dashboard-user">
          <span className="welcome-message">Welcome back, {userProfile?.name || 'User'}!</span>
          {userStats && (
            <span className="user-level">Level {userStats.level || 1}</span>
          )}
        </div>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${selectedTab === 'overview' ? 'active' : ''}`}
          onClick={() => setSelectedTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-btn ${selectedTab === 'profile' ? 'active' : ''}`}
          onClick={() => setSelectedTab('profile')}
        >
          Profile
        </button>
      </div>

      {selectedTab === 'overview' ? (
        <div className="dashboard-grid">
          {/* Stats Summary */}
          <div className="dashboard-card stats-summary">
            <h3>Your Stats</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-value">{userStats?.points || 0}</span>
                <span className="stat-label">Points</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{completedChallenges.length}</span>
                <span className="stat-label">Completed Challenges</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{userBadges.length}</span>
                <span className="stat-label">Badges Earned</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{userStats?.carbonSaved || 0}</span>
                <span className="stat-label">kg CO2 Saved</span>
              </div>
            </div>
          </div>
          
          {/* Active Challenges */}
          <div className="dashboard-card active-challenges">
            <h3>Active Challenges</h3>
            {activeChallenges.length > 0 ? (
              <div className="challenge-list">
                {activeChallenges.slice(0, 3).map(challenge => (
                  <div className="challenge-item" key={challenge._id}>
                    <h4>{challenge.title}</h4>
                    <div className="challenge-progress">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${Math.round((challenge.currentValue / challenge.targetValue) * 100)}%` }}
                        ></div>
                      </div>
                      <span>{Math.round((challenge.currentValue / challenge.targetValue) * 100)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data-message">No active challenges. Join a challenge to get started!</p>
            )}
          </div>
          
          {/* Recent Badges */}
          <div className="dashboard-card recent-badges">
            <h3>Recent Badges</h3>
            {userBadges.length > 0 ? (
              <div className="badge-list">
                {userBadges.slice(0, 4).map(badge => (
                  <div className="badge-item" key={badge._id}>
                    <div className="badge-icon">{badge.icon || '🏆'}</div>
                    <div className="badge-info">
                      <h4>{badge.name}</h4>
                      <p>{badge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data-message">No badges earned yet. Complete challenges to earn badges!</p>
            )}
          </div>
          
          {/* Recent Activity */}
          <div className="dashboard-card recent-activity">
            <h3>Recently Completed</h3>
            {completedChallenges.length > 0 ? (
              <div className="activity-list">
                {completedChallenges.map(challenge => (
                  <div className="activity-item" key={challenge._id}>
                    <div className="activity-icon">✓</div>
                    <div className="activity-info">
                      <h4>{challenge.title}</h4>
                      <p>Completed on {new Date(challenge.completedAt || Date.now()).toLocaleDateString()}</p>
                    </div>
                    <div className="activity-reward">
                      <span>+{challenge.pointsReward} pts</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data-message">No completed challenges yet. Keep up the good work!</p>
            )}
          </div>
        </div>
      ) : (
        <UserProfile />
      )}
    </div>
  );
};

export default Dashboard;