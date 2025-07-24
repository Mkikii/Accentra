import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse stored user from localStorage", error);
      return null;
    }
  });

 
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('currentUser');
      }
    } catch (error) {
      console.error("Failed to save user to localStorage", error);
    }
  }, [currentUser]);

  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:3001/users');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const users = await response.json();
      const foundUser = users.find(
        user => user.username === username && user.password === password
      );

      if (foundUser) {
        setCurrentUser(foundUser);
        console.log('Login successful:', foundUser.username);
        return true; // Login successful
      } else {
        console.error('Login failed: Invalid credentials');
        return false; // Login failed
      }
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    console.log('Logged out');
  };

  // This is a utility for quick testing during development, not for production use
  const toggleRoleForTesting = async () => {
    if (!currentUser) {
      // If no one is logged in, log in as landlord by default
      await login('maureen.landlord', 'landlordpass');
    } else if (currentUser.role === 'landlord') {
      // If landlord, switch to tenant (e.g., kikii.tenant)
      await login('kikii.tenant', 'tenantpass');
    } else if (currentUser.role === 'tenant') {
      // If tenant, switch to landlord
      await login('maureen.landlord', 'landlordpass');
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, toggleRoleForTesting }}>
      {children}
    </AuthContext.Provider>
  );
};