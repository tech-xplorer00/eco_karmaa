import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container footer-content">
          <div className="footer-section about">
            <div className="logo">
              <FaLeaf />
              <h3>Eco<span>Karma</span></h3>
            </div>
            <p>Making sustainability fun and rewarding through gamification and community engagement.</p>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
            </div>
          </div>
          
          <div className="footer-section links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-section resources">
            <h3>Resources</h3>
            <ul>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/support">Support</Link></li>
            </ul>
          </div>
          
          <div className="footer-section contact">
            <h3>Contact Us</h3>
            <div className="contact-info">
              <p>
                <MdLocationOn />
                <span>123 Green Street, Eco City, EC 12345</span>
              </p>
              <p>
                <MdEmail />
                <span>info@ecotrack.com</span>
              </p>
              <p>
                <MdPhone />
                <span>(123) 456-7890</span>
              </p>
            </div>
            <div className="newsletter">
              <h4>Subscribe to our newsletter</h4>
              <form className="newsletter-form">
                <input type="email" placeholder="Your email address" required />
                <button type="submit" className="btn btn-primary">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {currentYear} EcoTrack. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/cookies">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;