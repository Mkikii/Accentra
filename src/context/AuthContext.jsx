import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);
const API_BASE_URL = import.meta.env.VITE_API_URL; // Use Vite environment variable

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      setProfile({ role: user.role, id: user.id });
    }
    setLoadingAuth(false);
  }, []);

  const login = async (username, password, role) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users?username=${username}&password=${password}&role=${role}`);

      if (response.data.length > 0) {
        const user = response.data[0];
        setCurrentUser(user);
        setProfile({ role: user.role, id: user.id });
        localStorage.setItem('user', JSON.stringify(user));

        if (user.role === 'tenant') {
          navigate('/tenant');
        } else if (user.role === 'landlord') {
          navigate('/landlord');
        } else {
          navigate('/');
        }
        return true;
      } else {
        console.error('Login failed: Invalid credentials or role mismatch');
        return false;
      }
    } catch (error) {
      console.error('Error during login:', error.response ? error.response.data : error.message);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setProfile(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  const signup = async (username, password, email, role = 'tenant') => {
    try {
      const existingUser = await axios.get(`${API_BASE_URL}/users?username=${username}`);
      if (existingUser.data.length > 0) {
        console.error('Signup failed: Username already exists');
        return false;
      }

      const response = await axios.post(`${API_BASE_URL}/users`, {
        username,
        password,
        email,
        role
      });

      if (response.status === 201) {
        console.log('User signed up successfully:', response.data);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Signup error:', error.response ? error.response.data : error.message);
      return false;
    }
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
      {!loadingAuth && children}
    </AuthContext.Provider>
  );
};
