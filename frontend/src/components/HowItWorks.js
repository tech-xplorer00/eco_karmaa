import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faLeaf, faTrophy } from '@fortawesome/free-solid-svg-icons';
import './HowItWorks.css';

function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <h3>How It Works</h3>
          <p>Three simple steps to start making a difference and tracking your environmental impact</p>
        </div>
        <div className="steps-container">
          <div className="step">
            <div className="step-icon">
              <FontAwesomeIcon icon={faUserPlus} />
            </div>
            <h4>Sign Up & Set Goals</h4>
            <p>Create your account and set personal eco-goals that align with your lifestyle and values.</p>
          </div>
          <div className="step">
            <div className="step-icon">
              <FontAwesomeIcon icon={faLeaf} />
            </div>
            <h4>Track Daily Actions</h4>
            <p>Log your eco-friendly activities like biking, recycling, or using public transport through our easy interface.</p>
          </div>
          <div className="step">
            <div className="step-icon">
              <FontAwesomeIcon icon={faTrophy} />
            </div>
            <h4>Earn & Compare</h4>
            <p>Gain points, unlock achievements, and see how your actions compare to friends and global averages.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;