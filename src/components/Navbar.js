import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

function Navbar() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-brand">
          <span className="brand-icon">🇮🇳</span>
          <span className="brand-text">TN Market Gap Finder</span>
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/home" className="navbar-link">
              <span className="link-icon">🏠</span>
              <span>Home</span>
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/dashboard" className="navbar-link">
              <span className="link-icon">📊</span>
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/analysis" className="navbar-link">
              <span className="link-icon">📈</span>
              <span>Analysis</span>
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/reports" className="navbar-link">
              <span className="link-icon">📋</span>
              <span>Reports</span>
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/about" className="navbar-link">
              <span className="link-icon">ℹ️</span>
              <span>About</span>
            </Link>
          </li>
        </ul>
        <div className="navbar-actions">
          {user && (
            <span className="user-info">
              <span className="user-icon">👤</span>
              <span className="user-name">{user.name}</span>
            </span>
          )}
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <button className="logout-btn" onClick={handleLogout} aria-label="Logout">
            🚪 Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
