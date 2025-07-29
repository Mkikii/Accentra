import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'tenant'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(formData.email, formData.password, formData.role);
      
      if (!success) {
        setError('Invalid email, password, or role. Please verify your credentials and try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = (role) => {
    if (role === 'tenant') {
      setFormData({
        email: 'kikii_tenant@example.com',
        password: 'password123',
        role: 'tenant'
      });
    } else {
      setFormData({
        email: 'landlord_john@example.com',
        password: 'adminpassword',
        role: 'landlord'
      });
    }
  };

  return (
    <div className="gradient-bg d-flex align-items-center justify-content-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="custom-card">
              <div className="card-header-custom text-center">
                <h2 className="mb-0">
                  <i className="fas fa-sign-in-alt me-2"></i>
                  Welcome Back
                </h2>
                <p className="mb-0 mt-2 opacity-75">Sign in to your Accentra account</p>
              </div>
              
              <div className="card-body p-4">
                {error && (
                  <div className="alert alert-danger alert-custom">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    {error}
                  </div>
                )}

                {/* Demo Credentials */}
                <div className="alert alert-info-custom mb-4">
                  <h6 className="mb-2">
                    <i className="fas fa-info-circle me-2"></i>
                    Demo Credentials
                  </h6>
                  <div className="row g-2">
                    <div className="col-6">
                      <div className="bg-white p-2 rounded">
                        <strong className="d-block">Tenant</strong>
                        <small className="d-block">kikii_tenant@example.com</small>
                        <small className="d-block">password123</small>
                        <button 
                          type="button" 
                          className="btn btn-sm btn-outline-primary mt-1"
                          onClick={() => fillDemoCredentials('tenant')}
                        >
                          Use Demo
                        </button>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="bg-white p-2 rounded">
                        <strong className="d-block">Landlord</strong>
                        <small className="d-block">landlord_john@example.com</small>
                        <small className="d-block">adminpassword</small>
                        <button 
                          type="button" 
                          className="btn btn-sm btn-outline-primary mt-1"
                          onClick={() => fillDemoCredentials('landlord')}
                        >
                          Use Demo
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">
                      <i className="fas fa-envelope me-2"></i>
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control form-control-custom"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      <i className="fas fa-lock me-2"></i>
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control form-control-custom"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label">
                      <i className="fas fa-user-tag me-2"></i>
                      Login As
                    </label>
                    <select
                      name="role"
                      className="form-control form-control-custom"
                      value={formData.role}
                      onChange={handleChange}
                      required
                    >
                      <option value="tenant">Tenant</option>
                      <option value="landlord">Landlord</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary-custom w-100 mb-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="loading-spinner me-2"></span>
                        Signing In...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-sign-in-alt me-2"></i>
                        Sign In
                      </>
                    )}
                  </button>
                </form>

                <div className="text-center">
                  <p className="mb-0">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-decoration-none">
                      Create one here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;