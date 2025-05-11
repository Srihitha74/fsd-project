import React, { useState } from "react";
import "./AuthPage.css"; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';
const AuthPage = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isSignupVisible, setIsSignupVisible] = useState(false);

  const handleLoginClick = () => {
    setIsLoginVisible(true);
    setIsSignupVisible(false);
  };

  const handleSignUpClick = () => {
    setIsSignupVisible(true);
    setIsLoginVisible(false);
  };

  const closeModal = () => {
    setIsLoginVisible(false);
    setIsSignupVisible(false);
  };

  return (
    <div className="auth-page">
      {/* Video Background */}
      <div className="auth-video-container">
        <video autoPlay loop muted className="auth-video">
          <source src="/videos/intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="auth-bg">
        <h2 className="auth-title">Welcome to Dhwani</h2>
        <p className="auth-subtitle">Stream your favorite music anytime</p>

        {/* Buttons to toggle Login & SignUp */}
        <div className="auth-buttons">
          <button className="auth-btn signup-btn" onClick={handleSignUpClick}>
            Sign Up
          </button>
          <button className="auth-btn login-btn" onClick={handleLoginClick}>
            Log In
          </button>
        </div>
      </div>

      {/* Render Login Modal */}
      {isLoginVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Log In</h3>
            <form>
              <input type="email" placeholder="Enter your email" required />
              <input type="password" placeholder="Enter your password" required />
              <button type="submit">Log In</button>
            </form>
            <button className="close-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}

      {/* Render SignUp Modal */}
      {isSignupVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Create an Account</h3>
            <form>
              <input type="email" placeholder="Enter your email" required />
              <input type="password" placeholder="Create a password" required />
              <input type="password" placeholder="Confirm your password" required />
              <button type="submit">Sign Up</button>
            </form>
            <button className="close-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
