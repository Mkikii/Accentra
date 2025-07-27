import React from 'react';
import { Routes, Route, BrowserRouter as Router, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.js';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Navbar from './components/Navbar.jsx';

import Login from './pages/Login.jsx';
import LoginForm from './components/LoginForm.jsx';
import TenantDashboard from './pages/TenantDashboard.jsx';
import LandlordDashboard from './pages/LandlordDashboard.jsx';
import FeedbackForm from './pages/FeedbackForm.jsx';
import MaintenanceForm from './pages/MaintenanceForm.jsx';

function App() {
  return (
    <div className="min-vh-100">
      <Router>
        <Navbar />
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />

            <Route path="/tenant" element={
              <ProtectedRoute allowedRoles={['tenant']}>
                <TenantDashboard />
              </ProtectedRoute>
            } />
            <Route path="/landlord" element={
              <ProtectedRoute allowedRoles={['landlord']}>
                <LandlordDashboard />
              </ProtectedRoute>
            } />
            <Route path="/maintenance" element={
              <ProtectedRoute allowedRoles={['tenant']}>
                <MaintenanceForm />
              </ProtectedRoute>
            } />
            <Route path="/feedback" element={
              <ProtectedRoute allowedRoles={['tenant']}>
                <FeedbackForm />
              </ProtectedRoute>
            } />
            <Route path="/unauthorized" element={
              <div className="container py-5 text-center">
                <h2>Unauthorized Access</h2>
                <p>You do not have permission to view this page.</p>
                <Link to="/" className="btn btn-primary">Go to Login</Link>
              </div>
            } />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
