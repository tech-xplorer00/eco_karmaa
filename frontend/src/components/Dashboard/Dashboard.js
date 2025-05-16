import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLeaf, faChartLine, faMedal, faCalendarDay, 
  faChartBar, faBolt, faTrophy, faBicycle, faSeedling, 
  faRecycle, faSolarPanel, faUtensils, faCheck, 
  faShoppingBag, faLightbulb, faShower, faPlus 
} from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';

// Sub-components
import StatsCard from './StatsCard';
import BadgesCard from './BadgesCard';
import ChallengeCard from './ChallengeCard';
import ProgressChartCard from './ProgressChartCard';
import QuickActionsCard from './QuickActionsCard';
import LeaderboardCard from './LeaderboardCard';

const Dashboard = () => {
  return (
    <div className="container">
      <nav className="navbar">
        <div className="logo">
          <FontAwesomeIcon icon={faLeaf} />
          EcoTracker
        </div>
        <div className="user-info">
          <div className="avatar">JD</div>
          <div className="welcome">
            <span className="welcome-name">John Doe</span>
            <span className="welcome-level">Earth Guardian</span>
          </div>
        </div>
      </nav>
      
      <div className="dashboard-grid">
        <StatsCard />
        <BadgesCard />
        <ChallengeCard />
        <ProgressChartCard />
        <QuickActionsCard />
        <LeaderboardCard />
      </div>
    </div>
  );
};

export default Dashboard;