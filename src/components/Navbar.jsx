import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#8B0000' }}>
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <i className="fas fa-home me-2"></i>
          Accentra
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/') ? 'active' : ''}`} 
                to="/"
              >
                <i className="fas fa-home me-1"></i>
                Home
              </Link>
            </li>
            
            {currentUser && currentUser.role === 'tenant' && (
              <>
                <li className="nav-item">
                  <Link 
                    className={`nav-link ${isActive('/tenant') ? 'active' : ''}`} 
                    to="/tenant"
                  >
                    <i className="fas fa-tachometer-alt me-1"></i>
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    className={`nav-link ${isActive('/maintenance') ? 'active' : ''}`} 
                    to="/maintenance"
                  >
                    <i className="fas fa-tools me-1"></i>
                    Maintenance
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    className={`nav-link ${isActive('/feedback') ? 'active' : ''}`} 
                    to="/feedback"
                  >
                    <i className="fas fa-comment me-1"></i>
                    Feedback
                  </Link>
                </li>
              </>
            )}

            {currentUser && currentUser.role === 'landlord' && (
              <li className="nav-item">
                <Link 
                  className={`nav-link ${isActive('/landlord') ? 'active' : ''}`} 
                  to="/landlord"
                >
                  <i className="fas fa-building me-1"></i>
                  Dashboard
                </Link>
              </li>
            )}
          </ul>

          <ul className="navbar-nav">
            {currentUser ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-user me-1"></i>
                  {currentUser.username}
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <span className="dropdown-item-text">
                      <small className="text-muted">
                        Logged in as {currentUser.role}
                      </small>
                    </span>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item" onClick={logout}>
                      <i className="fas fa-sign-out-alt me-2"></i>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link 
                    className={`nav-link ${isActive('/login') ? 'active' : ''}`} 
                    to="/login"
                  >
                    <i className="fas fa-sign-in-alt me-1"></i>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    className={`nav-link ${isActive('/signup') ? 'active' : ''}`} 
                    to="/signup"
                  >
                    <i className="fas fa-user-plus me-1"></i>
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;