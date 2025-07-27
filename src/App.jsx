import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import TenantDashboard from "./pages/TenantDashboard.jsx";
import LandlordDashboard from "./pages/LandlordDashboard.jsx";
import MaintenanceForm from "./pages/MaintenanceForm.jsx";
import FeedbackForm from "./pages/FeedbackForm.jsx";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<div className="container py-5"><h1>Welcome to Accentra</h1><p>Please login to access your dashboard.</p></div>} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/tenant" 
            element={
              <ProtectedRoute>
                <TenantDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/landlord" 
            element={
              <ProtectedRoute>
                <LandlordDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/maintenance" 
            element={
              <ProtectedRoute>
                <MaintenanceForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/feedback" 
            element={
              <ProtectedRoute>
                <FeedbackForm />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;