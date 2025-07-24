import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import TenantsPage from './pages/TenantsPage.jsx';
import MaintenancePage from './pages/MaintenancePage.jsx';
import Navigation from './components/Navigation.jsx';
import { AuthContext } from './context/AuthContext.jsx';

function App() {
  const [tenants, setTenants] = useState([]);
  const { currentUser, toggleRoleForTesting } = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:3001/tenants")
      .then((res) => res.json())
      .then(setTenants)
      .catch((error) => console.error("Error fetching tenants:", error));
  }, []);

  const handleAddTenant = (newTenantData) => {
    console.log("Adding new tenant:", newTenantData);
    fetch("http://localhost:3001/tenants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTenantData),
    })
      .then((res) => res.json())
      .then((addedTenant) => {
        setTenants((prevTenants) => [...prevTenants, addedTenant]);
      })
      .catch((error) => console.error("Error adding tenant:", error));
  };

  return (
    <div>
      <Header />
      <Navigation />

      <button onClick={toggleRoleForTesting}>
        Toggle User (Current: {currentUser ? currentUser.username : 'None'})
      </button>

      <Routes>
        <Route
          path="/"
          element={
            <DashboardPage
              tenants={tenants}
            />
          }
        />
        <Route
          path="/tenants"
          element={
            <TenantsPage
              tenants={tenants}
              onAddTenant={handleAddTenant}
            />
          }
        />
        <Route
          path="/maintenance"
          element={<MaintenancePage />}
        />
      </Routes>
    </div>
  );
}

export default App;
