import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Navbar from './components/Navbar.jsx';
import HomePage from './pages/HomePage.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import TenantDashboard from './pages/TenantDashboard.jsx';
import LandlordDashboard from './pages/LandlordDashboard.jsx';
import MaintenanceForm from './pages/MaintenanceForm.jsx';
import FeedbackForm from './pages/FeedbackForm.jsx';
import Footer from './components/Footer.jsx';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App min-vh-100 d-flex flex-column">
          <Navbar />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              
              {/* Protected Tenant Routes */}
              <Route 
                path="/tenant" 
                element={
                  <ProtectedRoute allowedRoles={['tenant']}>
                    <TenantDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/maintenance" 
                element={
                  <ProtectedRoute allowedRoles={['tenant']}>
                    <MaintenanceForm />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/feedback" 
                element={
                  <ProtectedRoute allowedRoles={['tenant']}>
                    <FeedbackForm />
                  </ProtectedRoute>
                } 
              />
              
              {/* Protected Landlord Routes */}
              <Route 
                path="/landlord" 
                element={
                  <ProtectedRoute allowedRoles={['landlord']}>
                    <LandlordDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Catch all route */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;