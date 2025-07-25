import React, { useContext } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { AuthContext } from '../context/AuthContext'; 
    import '../../Header.css'; 

    function Header() {
      const { currentUser, profile, logout } = useContext(AuthContext);
      const navigate = useNavigate();

      const handleLogout = () => {
        logout();
        navigate('/login');
      };

      return (
        <header className="app-header">
          <div className="header-content">
            <h1 className="app-title">Accentra Property Management</h1>
            {currentUser && profile ? (
              <div className="user-controls">
                <span className="user-display">
                  Welcome, {profile.name || profile.email}! ({profile.role})
                </span>
                <button onClick={handleLogout} className="logout-button">Logout</button>
              </div>
            ) : (
              <span className="user-display">Loading User...</span>
            )}
          </div>
        </header>
      );
    }

    export default Header;
    