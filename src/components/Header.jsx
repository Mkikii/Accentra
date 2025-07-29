import React from 'react';

function Header({ user, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <span className="navbar-brand">
          🏠 Accentra - {user?.role === 'tenant' ? 'Tenant' : 'Landlord'} Dashboard
        </span>
        <div className="navbar-nav ms-auto">
          <span className="navbar-text me-3">
            Welcome, {user?.username}!
          </span>
          <button className="btn btn-outline-light btn-sm" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;