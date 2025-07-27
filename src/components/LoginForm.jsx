import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('tenant');
  const [isLoading, setIsLoading] = useState(false); // Already present, good!
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when submission starts
    setError('');

    const success = await login(username, password, role);

    if (!success) {
      setError('Invalid credentials. Please try again.');
    }

    setIsLoading(false); // Set loading to false when submission ends
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="username" className="form-label">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username" // <--- ADDED HERE
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password" // <--- ADDED HERE
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="role" className="form-label">Role</label>
        <select
          className="form-select"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="tenant">Tenant</option>
          <option value="landlord">Landlord</option>
        </select>
      </div>

      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={isLoading} // Button disabled when isLoading is true
      >
        {isLoading ? 'Logging in...' : 'Login'} {/* Button text changes based on isLoading */}
      </button>
    </form>
  );
};

export default LoginForm;