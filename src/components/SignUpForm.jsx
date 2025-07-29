import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("tenant");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password || !email) {
      setError("All fields are required");
      return;
    }

    try {
      // Check if username already exists
      const checkResponse = await fetch(`http://localhost:3000/users?username=${username}`);
      const existingUsers = await checkResponse.json();
      
      if (existingUsers.length > 0) {
        setError("Username already exists");
        return;
      }

      // Create new user
      const newUser = {
        username,
        password,
        email,
        role
      };

      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        setSuccess(true);
        setError("");
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError("Failed to create account");
      }
    } catch (err) {
      setError("Could not create account. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-success text-white">
              <h2 className="mb-0">Sign Up for Accentra</h2>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              {success && (
                <div className="alert alert-success">
                  Account created successfully! Redirecting to login...
                </div>
              )}
              
              {!success && (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Username:</label>
                    <input 
                      type="text"
                      className="form-control"
                      value={username} 
                      onChange={(e) => setUsername(e.target.value)}
                      required 
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input 
                      type="email"
                      className="form-control"
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input 
                      type="password"
                      className="form-control"
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Role:</label>
                    <select 
                      className="form-control"
                      value={role} 
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="tenant">Tenant</option>
                      <option value="landlord">Landlord</option>
                    </select>
                  </div>
                  
                  <button type="submit" className="btn btn-success w-100">
                    Create Account
                  </button>
                </form>
              )}
              
              <div className="text-center mt-3">
                <p>Already have an account? <a href="/login">Login here</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
