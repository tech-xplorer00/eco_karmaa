import React from 'react';
import './Testimonials.css';

function Testimonials() {
  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="section-header">
          <h3>What Our Users Say</h3>
          <p>Join thousands who are already making a difference with EcoTrack</p>
        </div>
        <div className="testimonials-container">
          <div className="testimonial">
            <div className="testimonial-content">
              <p>"EcoTrack transformed how I think about my daily habits. I've reduced my carbon footprint by 30% in just three months, and the rewards have kept me motivated!"</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">
                <img src="/placeholder/50/50" alt="Sarah L." />
              </div>
              <div className="author-info">
                <h5>Sarah L.</h5>
                <p>Using EcoTrack for 6 months</p>
              </div>
            </div>
          </div>
          <div className="testimonial">
            <div className="testimonial-content">
              <p>"The gamification element makes sustainability fun! I've started cycling to work every day and planting trees monthly. The app makes it easy to see my progress."</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">
                <img src="/placeholder/50/50" alt="Michael T." />
              </div>
              <div className="author-info">
                <h5>Michael T.</h5>
                <p>Using EcoTrack for 1 year</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;