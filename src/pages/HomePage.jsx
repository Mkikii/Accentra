import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="gradient-bg">
      <div className="container py-5">
        <div className="row justify-content-center text-center">
          <div className="col-lg-8">
            <div className="custom-card fade-in">
              <div className="card-body p-5">
                <h1 className="display-4 mb-4">
                  <i className="fas fa-building me-3"></i>
                  Welcome to Accentra
                </h1>
                <p className="lead mb-4">
                  Your comprehensive property management solution
                </p>
                <p className="mb-4">
                  Streamline maintenance requests, manage tenant communications, 
                  and keep your properties running smoothly with our intuitive platform.
                </p>
                
                <div className="row mb-4">
                  <div className="col-md-4 mb-3">
                    <i className="fas fa-tools fa-3x text-primary mb-3"></i>
                    <h5>Maintenance Management</h5>
                    <p>Submit and track maintenance requests easily</p>
                  </div>
                  <div className="col-md-4 mb-3">
                    <i className="fas fa-users fa-3x text-primary mb-3"></i>
                    <h5>Tenant Portal</h5>
                    <p>Access your dashboard and communicate with landlords</p>
                  </div>
                  <div className="col-md-4 mb-3">
                    <i className="fas fa-chart-line fa-3x text-primary mb-3"></i>
                    <h5>Property Analytics</h5>
                    <p>Track property performance and maintenance history</p>
                  </div>
                </div>
                
                <div className="d-flex justify-content-center gap-3">
                  <Link to="/login" className="btn btn-primary-custom btn-lg">
                    <i className="fas fa-sign-in-alt me-2"></i>
                    Login
                  </Link>
                  <Link to="/signup" className="btn btn-outline-primary btn-lg">
                    <i className="fas fa-user-plus me-2"></i>
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;