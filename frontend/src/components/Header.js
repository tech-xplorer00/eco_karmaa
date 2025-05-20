import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import './Header.css';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { userStats } = useUser();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const handleLogout = async () => {
    try {
      setDropdownOpen(false);
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="container header-container">
        <div className="logo">
          <Link to="/">
            <h1>Eco<span>Karma</span></h1>
          </Link>
        </div>
        <div className="nav-links">
          {currentUser ? (
            <>
              <Link to="/">Home</Link>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/challenges">Challenges</Link>
              <Link to="/badges">Badges</Link>
              <Link to="/rewards">Rewards</Link>
              {userStats && (
                <span className="user-points">
                  <span className="point-icon">🌱</span>
                  <span className="point-value">{userStats.points || 0} Points</span>
                </span>
              )}
            </>
          ) : (
            <>
              <a href="#how-it-works">How It Works</a>
              <a href="#testimonials">Testimonials</a>
              <a href="#features">Features</a>
              <a href="#faq">FAQ</a>
            </>
          )}
        </div>
        <div className="auth-buttons">
          {currentUser ? (
            <div className={`user-dropdown ${dropdownOpen ? 'active' : ''}`} ref={dropdownRef}>
              <button className="dropdown-toggle" onClick={toggleDropdown}>
                {currentUser.name || currentUser.email || 'User'}
              </button>
              <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
                <Link to="/profile" onClick={() => setDropdownOpen(false)}>Profile</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;