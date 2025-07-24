import React, { useContext } from 'react';
import { AuthContext } from './src/context/AuthContext';
import './Header.css';

function Header() {
  const { currentUser } = useContext(AuthContext);

  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="app-title">Accentra Property Management</h1>
        {currentUser ? (
          <span className="user-display">
            Welcome, {currentUser.name || currentUser.username}!
          </span>
        ) : (
          <span className="user-display">Guest</span>
        )}
      </div>
    </header>
  );
}

export default Header;
