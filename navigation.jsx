import React from 'react';
import { NavLink } from 'react-router-dom';
import './navigation.css';

function Navigation() {
  return (
    <nav className="app-nav">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink to="/" end>Dashboard</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/tenants">Tenants</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/maintenance">Maintenance</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
