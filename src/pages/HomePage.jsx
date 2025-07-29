// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-hero d-flex justify-content-center align-items-center vh-100 text-white">
      <div className="text-center">
        <h1 className="display-4 fw-bold">Welcome to <span className="text-accent">Accentra</span></h1>
        <p className="lead mt-3 mb-4">
          Streamlining property management for Landlords & Tenants
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Link to="/login" className="btn btn-outline-light btn-lg">Login</Link>
          <Link to="/signup" className="btn btn-light btn-lg">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
