import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

// Use environment variable or fallback to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for stored user on app load
    const storedUser = localStorage.getItem('accentra_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
        setProfile({ role: user.role, id: user.id });
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('accentra_user');
      }
    }
    setLoadingAuth(false);
  }, []);

  const login = async (email, password, role) => {
    try {
      // Fetch users and find matching credentials
      const response = await axios.get(`${API_BASE_URL}/users`);
      const users = response.data;
      
      const user = users.find(u => 
        u.email === email && 
        u.password === password && 
        u.role === role
      );

      if (user) {
        setCurrentUser(user);
        setProfile({ role: user.role, id: user.id });
        localStorage.setItem('accentra_user', JSON.stringify(user));

        // Navigate based on role
        if (user.role === 'tenant') {
          navigate('/tenant');
        } else if (user.role === 'landlord') {
          navigate('/landlord');
        }
        
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (username, password, email, role = 'tenant') => {
    try {
      // Check if user already exists
      const existingUsers = await axios.get(`${API_BASE_URL}/users`);
      const userExists = existingUsers.data.some(u => 
        u.email === email || u.username === username
      );

      if (userExists) {
        return false;
      }

      // Create new user
      const newUser = {
        username,
        email,
        password,
        role,
        createdAt: new Date().toISOString()
      };

      const response = await axios.post(`${API_BASE_URL}/users`, newUser);
      
      if (response.status === 201) {
        return true;
      }
      return false;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setProfile(null);
    localStorage.removeItem('accentra_user');
    navigate('/');
  };

  const authValue = {
    currentUser,
    profile,
    loadingAuth,
    login,
    logout,
    signup,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};