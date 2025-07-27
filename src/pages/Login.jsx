
import React from 'react';
import LoginForm from '../components/LoginForm.jsx';

function Login() {
  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100 justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white text-center py-4">
              <h2 className="mb-0">Accentra Login</h2>
              <p className="mb-0 opacity-75">Property Management System</p>
            </div>
            <div className="card-body p-4">
              <LoginForm />
            </div>
            <div className="card-footer text-center py-3 bg-light">
              <small className="text-muted">
                Enter your credentials to access the system
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;