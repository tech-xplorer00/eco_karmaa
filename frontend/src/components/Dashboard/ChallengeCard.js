import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay, faUtensils, faCheck } from '@fortawesome/free-solid-svg-icons';

const ChallengeCard = () => {
  return (
    <div className="card challenge-card">
      <div className="card-header">
        <h2 className="card-title challenge-title">
          <FontAwesomeIcon icon={faCalendarDay} />
          Daily Challenge
        </h2>
      </div>
      <div className="challenge-content">
        <div className="challenge-icon">
          <FontAwesomeIcon icon={faUtensils} />
        </div>
        <div className="challenge-details">
          <h3>Meatless Monday</h3>
          <p>Skip meat for all meals today to reduce your carbon footprint!</p>
          <button className="btn btn-accent">
            <FontAwesomeIcon icon={faCheck} />
            Complete Challenge
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;