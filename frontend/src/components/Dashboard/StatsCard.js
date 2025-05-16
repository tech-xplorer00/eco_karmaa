import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

const StatsCard = () => {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">
          <FontAwesomeIcon icon={faChartLine} />
          Your Stats
        </h2>
      </div>
      <div className="stats-container">
        <div className="stat">
          <div className="stat-value">1,284</div>
          <div className="stat-label">Total Points</div>
        </div>
        <div className="stat">
          <div className="stat-value">37</div>
          <div className="stat-label">Actions</div>
        </div>
        <div className="stat">
          <div className="stat-value">12</div>
          <div className="stat-label">Day Streak</div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;