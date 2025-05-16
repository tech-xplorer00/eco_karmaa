import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

const LeaderboardCard = () => {
  return (
    <div className="card card-wide">
      <div className="card-header">
        <h2 className="card-title">
          <FontAwesomeIcon icon={faTrophy} />
          Leaderboard
        </h2>
        <a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '14px' }}>View All</a>
      </div>
      <div className="leaderboard">
        <div className="leaderboard-item">
          <div className="rank top-rank">1</div>
          <div className="leaderboard-user">
            <div className="leaderboard-avatar">AS</div>
            <span>Anna Smith</span>
          </div>
          <div className="leaderboard-points">2,345</div>
        </div>
        <div className="leaderboard-item">
          <div className="rank top-rank">2</div>
          <div className="leaderboard-user">
            <div className="leaderboard-avatar">JD</div>
            <span>John Doe</span>
          </div>
          <div className="leaderboard-points">1,284</div>
        </div>
        <div className="leaderboard-item">
          <div className="rank top-rank">3</div>
          <div className="leaderboard-user">
            <div className="leaderboard-avatar">RJ</div>
            <span>Robert Johnson</span>
          </div>
          <div className="leaderboard-points">1,195</div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardCard;