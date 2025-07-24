import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        const defaultLandlord = data.find(user => user.role === 'landlord');
        if (defaultLandlord) {
          setCurrentUser(defaultLandlord);
        } else if (data.length > 0) {
          setCurrentUser(data[0]);
        }
      })
      .catch((error) => console.error("Error fetching users for AuthContext:", error));
  }, []);

  const login = (username, password) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const toggleRoleForTesting = () => {
    if (!users.length) return;

    if (!currentUser || currentUser.role === 'tenant') {
      const landlord = users.find(user => user.role === 'landlord');
      setCurrentUser(landlord || users[0]);
    } else {
      const firstTenant = users.find(user => user.role === 'tenant');
      setCurrentUser(firstTenant || users[0]);
    }
  };


  return (
    <AuthContext.Provider value={{ currentUser, login, logout, toggleRoleForTesting }}>
      {children}
    </AuthContext.Provider>
  );
};