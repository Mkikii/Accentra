import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; // Import useAuth

function Navbar() {
  const { currentUser, logout } = useAuth(); // Get currentUser and logout from context

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          🏠 Accentra
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" // Added for accessibility
          aria-expanded="false"     // Added for accessibility
          aria-label="Toggle navigation" // Added for accessibility
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {!currentUser && ( // Show Login/Signup only if not logged in
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
              </>
            )}
            {currentUser && currentUser.role === 'tenant' && ( // Show Tenant link if tenant
              <li className="nav-item">
                <Link className="nav-link" to="/tenant">Tenant Dashboard</Link>
              </li>
            )}
            {currentUser && currentUser.role === 'landlord' && ( // Show Landlord link if landlord
              <li className="nav-item">
                <Link className="nav-link" to="/landlord">Landlord Dashboard</Link>
              </li>
            )}
            {currentUser && ( // Show Logout if logged in
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={logout} style={{ textDecoration: 'none', color: 'inherit' }}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
