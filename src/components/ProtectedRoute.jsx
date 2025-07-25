import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser, profile, loadingAuth } = useAuth();

  if (loadingAuth) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontSize: '1.2em', color: '#555' }}>
        Loading authentication...
      </div>
    );
  }
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && (!profile || !allowedRoles.includes(profile.role))) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return children;
};

export default ProtectedRoute;