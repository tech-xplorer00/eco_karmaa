import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBicycle, faTree, faBus } from '@fortawesome/free-solid-svg-icons';
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-content">
        <div className="hero-text">
          <h2>Make Every <span>Green Action</span> Count</h2>
          <p>Track your eco-friendly activities, earn rewards, and see your real impact on the environment through our gamified platform that makes sustainability fun and rewarding.</p>
          <Link to="/signup" className="btn btn-primary">Start Your Eco Journey</Link>
        </div>
        <div className="hero-image">
          <img src="/placeholder/500/400" alt="Eco Tracker App Interface" />
          <div className="eco-actions eco-action-bike">
            <FontAwesomeIcon icon={faBicycle} style={{ color: '#4CAF50', fontSize: '36px' }} />
          </div>
          <div className="eco-actions eco-action-tree">
            <FontAwesomeIcon icon={faTree} style={{ color: '#4CAF50', fontSize: '36px' }} />
          </div>
          <div className="eco-actions eco-action-transport">
            <FontAwesomeIcon icon={faBus} style={{ color: '#4CAF50', fontSize: '36px' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;