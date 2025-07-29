// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light px-3">
      <Link className="navbar-brand" to="/">Accentra</Link>
      <div className="navbar-nav">
        <Link className="nav-link" to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
