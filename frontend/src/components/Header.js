import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

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
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/challenges">Challenges</Link>
          <Link to="/badges">Badges</Link>
        </div>
        <div className="auth-buttons">
          <Link to="/login" className="btn btn-secondary">Login</Link>
          <Link to="/signup" className="btn btn-primary">Sign Up</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;