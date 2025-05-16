import React from 'react';
import { useChallenges } from '../../contexts/ChallengeContext';
import ChallengeCard from './ChallengeCard';
import './Challenges.css';

const ChallengeList = () => {
  const { challenges, filter, setFilter, loading, error } = useChallenges();

  return (
    <div className="challenges-container">
      <div className="challenges-header">
        <h2>Your Challenges</h2>
        <div className="challenge-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'ongoing' ? 'active' : ''}`}
            onClick={() => setFilter('ongoing')}
          >
            Ongoing
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
          <button 
            className={`filter-btn ${filter === 'accomplished' ? 'active' : ''}`}
            onClick={() => setFilter('accomplished')}
          >
            Accomplished
          </button>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading challenges...</p>
        </div>
      ) : (
        <div className="challenge-cards">
          {challenges.length > 0 ? (
            challenges.map(challenge => (
              <ChallengeCard key={challenge._id} challenge={challenge} />
            ))
          ) : (
            <div className="no-challenges">
              <p>No challenges found for this filter.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChallengeList;