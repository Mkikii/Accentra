import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function TenantDashboard() {
  const { currentUser, logout } = useAuth();

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Welcome, {currentUser?.username} ({currentUser?.role})</h1>
        <button onClick={logout} className="btn btn-outline-danger">Logout</button>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h3>Maintenance Requests</h3>
            </div>
            <div className="card-body text-center">
              <p className="card-text">Submit a new maintenance request for your unit.</p>
              <Link to="/maintenance" className="btn btn-primary">Go</Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h3>Send Feedback</h3>
            </div>
            <div className="card-body text-center">
              <p className="card-text">Give us your thoughts on your experience.</p>
              <Link to="/feedback" className="btn btn-primary">Send Feedback</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TenantDashboard;
