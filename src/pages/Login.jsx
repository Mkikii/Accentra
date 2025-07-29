import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/api'; // ✅ function from api.js

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await loginUser({ email, password });
      console.log('Login success:', response.data);

      // 🔐 Simulate role-based redirection
      if (response.data.role === 'tenant') {
        navigate('/tenant');
      } else if (response.data.role === 'landlord') {
        navigate('/landlord');
      } else {
        setErrorMsg('Unknown role.');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setErrorMsg('Invalid login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="mb-4 text-center">Login to Accentra</h3>

        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary w-100" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-3 text-muted text-center" style={{ fontSize: '0.85rem' }}>
          Demo Credentials:
          <br />
          <strong>Tenant:</strong> kikii_tenant / password123<br />
          <strong>Landlord:</strong> landlord_john / adminpassword
        </p>

        <p className="mt-2 text-center">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
