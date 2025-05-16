import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal, faBicycle, faSeedling, faRecycle, faSolarPanel } from '@fortawesome/free-solid-svg-icons';

const BadgesCard = () => {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">
          <FontAwesomeIcon icon={faMedal} />
          Badges Earned
        </h2>
        <span style={{ color: 'var(--primary)' }}>8/24</span>
      </div>
      <div className="badges-container">
        <div className="badge">
          <div className="badge-icon">
            <FontAwesomeIcon icon={faBicycle} />
          </div>
          <span className="badge-name">Bike Master</span>
        </div>
        <div className="badge">
          <div className="badge-icon">
            <FontAwesomeIcon icon={faSeedling} />
          </div>
          <span className="badge-name">Tree Planter</span>
        </div>
        <div className="badge">
          <div className="badge-icon">
            <FontAwesomeIcon icon={faRecycle} />
          </div>
          <span className="badge-name">Recycling Pro</span>
        </div>
        <div className="badge">
          <div className="badge-icon">
            <FontAwesomeIcon icon={faSolarPanel} />
          </div>
          <span className="badge-name">Solar Saver</span>
        </div>
      </div>
    </div>
  );
};

export default BadgesCard;