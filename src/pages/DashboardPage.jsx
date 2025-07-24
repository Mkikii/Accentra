import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './DashboardPage.css';

function DashboardPage() {
  const { currentUser, login, logout } = useContext(AuthContext);
  const [allTenants, setAllTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/tenants');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAllTenants(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTenants();
  }, []);

  const displayedTenants = currentUser && currentUser.role === 'tenant'
    ? allTenants.filter(tenant => tenant.id === currentUser.tenantId)
    : allTenants;

  if (loading) {
    return <div className="dashboard-container">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="dashboard-container error-message">Error: {error}</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Welcome to Accentra Dashboard!</h1>

      {currentUser ? (
        <div className="user-info">
          <p>Logged in as: <strong>{currentUser.name || currentUser.username}</strong> ({currentUser.role})</p>
          {currentUser.role === 'tenant' && currentUser.tenantId && (
            <p>Your Unit: <strong>{currentUser.unit || 'N/A'}</strong></p>
          )}
          <button className="dashboard-button" onClick={logout}>Logout</button>
        </div>
      ) : (
        <div className="user-info">
          <p>Not logged in.</p>
          <div className="mock-login-section">
            <h3>Quick Login for Development:</h3>
            <button className="dashboard-button" onClick={() => login('landlord_john', 'adminpassword')}>
              Login as Landlord
            </button>
            <button className="dashboard-button" onClick={() => login('kikii_tenant', 'password123')}>
              Login as Kikii (Tenant A101)
            </button>
            <button className="dashboard-button" onClick={() => login('shantel_tenant', 'password123')}>
              Login as Shantel (Tenant A102)
            </button>
            <button className="dashboard-button" onClick={() => login('jesse_tenant', 'password123')}>
              Login as Jesse (Tenant B202)
            </button>
            <button className="dashboard-button" onClick={() => login('ashley_tenant', 'password123')}>
              Login as Ashley (Tenant C303)
            </button>
          </div>
        </div>
      )}

      <hr />

      <h2>Tenant Overview</h2>
      {displayedTenants.length === 0 ? (
        <p>No tenants found or you don't have access to view tenants.</p>
      ) : (
        <div className="tenant-list-dashboard">
          {currentUser && currentUser.role === 'landlord' && (
            <h3>All Tenants:</h3>
          )}
          {currentUser && currentUser.role === 'tenant' && displayedTenants.length > 0 && (
            <h3>Your Tenant Information:</h3>
          )}
          {displayedTenants.map(tenant => (
            <div key={tenant.id} className="tenant-card-dashboard">
              <h4>{tenant.name}</h4>
              <p>Unit: {tenant.unit}</p>
              <p>Phone: {tenant.phone}</p>
              <p>Email: {tenant.email}</p>
              <p>Access Status: {tenant.hasAccess ? 'Active' : 'N/A'}</p>
            </div>
          ))}
        </div>
      )}

      {currentUser && currentUser.role === 'landlord' && (
        <>
          <hr />
          <h2>Maintenance Request Summary (Landlord View)</h2>
          <p>This section will summarize all maintenance requests using Jesse's components.</p>
        </>
      )}

      {currentUser && currentUser.role === 'tenant' && (
        <>
          <hr />
          <h2>Your Maintenance Requests (Tenant View)</h2>
          <p>This section will show only your maintenance requests using Jesse's components.</p>
        </>
      )}
    </div>
  );
}

export default DashboardPage;
