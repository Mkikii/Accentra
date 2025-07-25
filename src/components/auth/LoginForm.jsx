import React, { useState, useContext } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { AuthContext } from '../../context/AuthContext'; // CORRECTED PATH

    function LoginForm() {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [loginError, setLoginError] = useState('');
      const { login, signup } = useContext(AuthContext);
      const navigate = useNavigate();

      const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoginError('');
        const success = await login(email, password);
        if (!success) {
          setLoginError('Login failed. Please check your email and password.');
        } else {
          console.log('Login successful, redirecting to dashboard...');
          navigate('/');
        }
      };

      const handleSignupSubmit = async (e) => {
        e.preventDefault();
        setLoginError('');
        const initialProfileData = {
          role: email.includes('landlord') ? 'landlord' : 'tenant',
          name: email.split('@')[0].replace('_', ' '),
        };

        const success = await signup(email, password, initialProfileData);
        if (success) {
          alert("Registration successful! Please login.");
          setEmail('');
          setPassword('');
        } else {
          setLoginError('Registration failed. See console for details.');
        }
      };

      return (
        <div className="login-form-container">
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {loginError && <p className="error-message">{loginError}</p>}
            <button type="submit">Login</button>
          </form>

          <p style={{ marginTop: '20px' }}>
            Don't have an account?{' '}
            <button onClick={handleSignupSubmit} style={{ background: 'none', color: '#007bff', border: 'none', padding: '0', cursor: 'pointer', textDecoration: 'underline', fontSize: '1em', boxShadow: 'none' }}>
              Register
            </button>
          </p>
        </div>
      );
    }

    export default LoginForm;
    