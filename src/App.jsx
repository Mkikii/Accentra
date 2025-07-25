import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login.jsx';
import TenantDashboard from './pages/TenantDashboard.jsx';
import LandlordDashboard from './pages/LandlordDashboard.jsx';
import FeedbackForm from './pages/FeedbackForm.jsx';
import MaintenanceForm from './pages/MaintenanceForm.jsx';

function App() {
  return (
    <div className="min-vh-100">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tenant" element={<TenantDashboard />} />
        <Route path="/landlord" element={<LandlordDashboard />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/maintenance" element={<MaintenanceForm />} />
      </Routes>
    </div>
  );
}

export default App;
