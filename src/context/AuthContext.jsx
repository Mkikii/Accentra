import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

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
      //Atempt to authenticate user with backend, sending username, password and selected role.
      const response = await axios.post('http://localhost:4000/api/login', {
        username,
        password,
        role,
      });

      if (response.status === 200 && response.data.message === 'Login successful') {
        const user = response.data.user;
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
        console.error('Login failed:', response.data.message);
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

  const signup = async (email, password, initialProfileData) => {
    console.warn("Signup function in AuthContext is a placeholder. Implement custom backend registration if needed.");
    try {
      return false;
    } catch (error) {
      console.error("Signup error:", error);
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