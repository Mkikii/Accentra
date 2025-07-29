import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:3000/users?username=${username}&password=${password}`);
      const users = await response.json();
      
      if (users.length > 0) {
        const user = users[0];
        localStorage.setItem('user', JSON.stringify(user));
        
        if (user.role === 'tenant') {
          navigate('/tenant-dashboard');
        } else if (user.role === 'landlord') {
          navigate('/landlord-dashboard');
        }
        
        setError('');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error(error);
      setError('Error logging in');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="mb-0">Login to Accentra</h2>
            </div>
            <div className="card-body">
              
              {/* DEMO CREDENTIALS - CLEARLY VISIBLE */}
              <div className="alert alert-info mb-4">
                <h5 className="alert-heading">🔑 Demo Login Credentials</h5>
                <hr />
                <p className="mb-2"><strong>Tenant Account:</strong></p>
                <p className="mb-1">Username: <code>kikii_tenant</code></p>
                <p className="mb-3">Password: <code>password123</code></p>
                
                <p className="mb-2"><strong>Landlord Account:</strong></p>
                <p className="mb-1">Username: <code>landlord_john</code></p>
                <p className="mb-0">Password: <code>adminpassword</code></p>
              </div>

              {error && <div className="alert alert-danger">{error}</div>}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Username:</label>
                  <input 
                    type="text" 
                    name="username" 
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required 
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Password:</label>
                  <input 
                    type="password" 
                    name="password" 
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
                
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>
              
              <div className="text-center mt-3">
                <p>Don't have an account? <a href="/signup">Sign up here</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
