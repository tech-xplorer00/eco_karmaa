import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

function Navbar() {
  return (
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
  );
}

export default Navbar;