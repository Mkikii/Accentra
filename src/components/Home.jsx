import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <div className="welcome-hero">
        <h1>Welcome to Housing Manager</h1>
        <p className="lead">Streamline your property management with ease</p>
        <Link to="/login" className="btn btn-primary btn-lg mt-3">
          Get Started
        </Link>
      </div>

      <div className="row mt-5">
        <div className="col-md-4 mb-4">
          <div className="card feature-card h-100">
            <div className="card-body text-center">
              <h3>🏠 Property Management</h3>
              <p>Manage multiple properties and units efficiently</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card feature-card h-100">
            <div className="card-body text-center">
              <h3>🔧 Maintenance Requests</h3>
              <p>Submit and track maintenance requests easily</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card feature-card h-100">
            <div className="card-body text-center">
              <h3>👥 Tenant Management</h3>
              <p>Keep track of all tenants and their information</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;