import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Header from './Header';
import Navigation from './navigation';

import DashboardPage from './pages/DashboardPage';
import MaintenancePage from './pages/MaintenancePage';
import TenantsPage from './pages/TenantsPage'; 

import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Navigation />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/tenants" element={<TenantsPage />} /> 
          <Route path="/maintenance" element={<MaintenancePage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;