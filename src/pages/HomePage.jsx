import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const HomePage = () => {
  const { currentUser } = useAuth();

  return (
    <div className="hero-section">
      <div className="container h-100">
        <div className="row h-100 align-items-center">
          <div className="col-lg-6">
            <div className="hero-content">
              <h1 className="display-3 fw-bold mb-4">
                Welcome to <span style={{ color: '#CD853F' }}>Accentra</span>
              </h1>
              <p className="lead mb-4 text-light">
                Streamline your property management experience with our comprehensive 
                platform designed for both landlords and tenants.
              </p>
              
              <div className="feature-list mb-5">
                <div className="d-flex align-items-center mb-3">
                  <i className="fas fa-check-circle text-success me-3 fs-5"></i>
                  <span className="text-light">Easy maintenance request management</span>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <i className="fas fa-check-circle text-success me-3 fs-5"></i>
                  <span className="text-light">Real-time communication between tenants and landlords</span>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <i className="fas fa-check-circle text-success me-3 fs-5"></i>
                  <span className="text-light">Comprehensive feedback system</span>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <i className="fas fa-check-circle text-success me-3 fs-5"></i>
                  <span className="text-light">Secure and user-friendly interface</span>
                </div>
              </div>

              {!currentUser ? (
                <div className="cta-buttons">
                  <Link to="/signup" className="btn btn-primary-custom btn-lg me-3">
                    <i className="fas fa-user-plus me-2"></i>
                    Get Started
                  </Link>
                  <Link to="/login" className="btn btn-outline-custom btn-lg">
                    <i className="fas fa-sign-in-alt me-2"></i>
                    Sign In
                  </Link>
                </div>
              ) : (
                <div className="cta-buttons">
                  <Link 
                    to={currentUser.role === 'tenant' ? '/tenant' : '/landlord'} 
                    className="btn btn-primary-custom btn-lg"
                  >
                    <i className="fas fa-tachometer-alt me-2"></i>
                    Go to Dashboard
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          <div className="col-lg-6">
            <div className="hero-image text-center">
              <div className="custom-card p-5">
                <i className="fas fa-building display-1 mb-4" style={{ color: '#CD853F' }}></i>
                <h3 className="mb-3 text-white fw-bold">Property Management Made Simple</h3>
                <p className="text-light">
                  Join thousands of satisfied users who trust Accentra for their 
                  property management needs.
                </p>
                
                <div className="stats-row mt-4">
                  <div className="row text-center">
                    <div className="col-4">
                      <div className="stat-item">
                        <h4 className="fw-bold" style={{ color: '#8B0000' }}>500+</h4>
                        <small className="text-light">Properties</small>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="stat-item">
                        <h4 className="fw-bold" style={{ color: '#8B0000' }}>1000+</h4>
                        <small className="text-light">Users</small>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="stat-item">
                        <h4 className="fw-bold" style={{ color: '#8B0000' }}>99%</h4>
                        <small className="text-light">Satisfaction</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;