import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBolt, faBicycle, faShoppingBag, faLightbulb, 
  faShower, faSeedling, faPlus 
} from '@fortawesome/free-solid-svg-icons';

const QuickActionsCard = () => {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">
          <FontAwesomeIcon icon={faBolt} />
          Quick Actions
        </h2>
      </div>
      <div className="quick-actions">
        <div className="action-btn">
          <FontAwesomeIcon icon={faBicycle} />
          <span>Bike Ride</span>
        </div>
        <div className="action-btn">
          <FontAwesomeIcon icon={faBicycle} />
          <span>Report illegal dumping for pollution</span>
        </div>
        <div className="action-btn">
          <FontAwesomeIcon icon={faShoppingBag} />
          <span>Clean up drives</span>
        </div>
        <div className="action-btn">
          <FontAwesomeIcon icon={faLightbulb} />
          <span></span>
        </div>
        
        <div className="action-btn">
          <FontAwesomeIcon icon={faSeedling} />
          <span>Plant Tree</span>
        </div>
        <div className="action-btn">
          <FontAwesomeIcon icon={faPlus} />
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsCard;