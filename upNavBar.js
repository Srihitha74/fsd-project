import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const UpNavBar = ({ onLanguageChange }) => {
  const handleLanguageChange = (event) => {
    if (onLanguageChange) {
      onLanguageChange(event.target.value);
    }
  };

  return (
    <nav className="up-navbar">
      <div className="brand">
        <img src="/images/logo.jpeg" alt="Dhwani Logo" className="logo" />
        <span className="brand-name">Dhwani</span>
      </div>

      <ul className="nav-links">
        <li><Link to="/music">Music</Link></li>
        <li><Link to="/podcasts">Podcasts</Link></li>
        <li><Link to="/pro">Pro</Link></li>
      </ul>

      <div className="search-bar">
        <input type="text" placeholder="Search" />
      </div>

      <div className="right-section">
        <div className="dropdown">
          <select defaultValue="All" onChange={handleLanguageChange}>
            <option value="All">Music Languages</option>
            <option value="Hindi">Hindi</option>
            <option value="English">English</option>
            <option value="Telugu">Telugu</option>
          </select>
        </div>
        <div className="nav-links">
          <Link to="/auth" className="auth-button">Sign Up / Log In</Link>
        </div>
      </div>
    </nav>
  );
};

export default UpNavBar;