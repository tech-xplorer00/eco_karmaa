import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import './Header.css';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const { currentUser, logout } = useAuth();
  const { userStats } = useUser();

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

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
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
          {isHomePage ? (
            <>
              <a href="#how-it-works">How It Works</a>
              <a href="#testimonials">Testimonials</a>
              <a href="#features">Features</a>
              <a href="#faq">FAQ</a>
            </>
          ) : (
            <>
              <Link to="/">Home</Link>
            </>
          )}
          {currentUser && (
            <>
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
          )}
        </div>
        <div className="auth-buttons">
          {currentUser ? (
            <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
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