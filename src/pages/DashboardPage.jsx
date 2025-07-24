import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './DashboardPage.css'; 

function DashboardPage() {
  const { currentUser, toggleRoleForTesting, login, logout } = useContext(AuthContext);
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
  }, []); // Empty dependency array means this runs once on mount

  // Determine which tenants to display based on the current user's role
  const displayedTenants = currentUser && currentUser.role === 'tenant'
    ? allTenants.filter(tenant => tenant.id === currentUser.tenantId)
    : allTenants; // Landlord sees all tenants

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
          <p>Logged in as: <strong>{currentUser.username}</strong> ({currentUser.role})</p>
          {currentUser.role === 'tenant' && currentUser.tenantId && (
            <p>Your Tenant ID: <strong>{currentUser.tenantId}</strong></p>
          )}
          
          <button className="dashboard-button" onClick={logout}>Logout</button>
        </div>
      ) : (
        <div className="user-info">
          <p>Not logged in.</p>
         
          <div className="mock-login-section">
            <h3>Mock Login:</h3>
            
            <button className="dashboard-button" onClick={() => login('maureen.landlord', 'password123')}>
              Login as Landlord
            </button>
            <button className="dashboard-button" onClick={() => login('ashley.tenant', 'password123')}>
              Login as Ashley (Tenant 101)
            </button>
            <button className="dashboard-button" onClick={() => login('jesse.tenant', 'password123')}>
              Login as Jesse (Tenant 102)
            </button>
             {/* Original toggle for simpler role change without full login */}
            <button className="dashboard-button" onClick={toggleRoleForTesting}>
              Toggle Role for Testing (Old Method)
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
              <p>Property: {tenant.property}</p>
              <p>Contact: {tenant.contact || 'N/A'}</p>
              {/* You might want to display more tenant info here */}
            </div>
          ))}
        </div>
      )}

      {/* Placeholder for other dashboard sections for landlord */}
      {currentUser && currentUser.role === 'landlord' && (
        <>
          <hr />
          <h2>Maintenance Request Summary (Landlord View)</h2>
          <p>This section will summarize all maintenance requests.</p>
          {/* Martha/Jesse's components would be integrated here */}
        </>
      )}

      {/* Placeholder for other dashboard sections for a specific tenant */}
      {currentUser && currentUser.role === 'tenant' && (
        <>
          <hr />
          <h2>Your Maintenance Requests (Tenant View)</h2>
          <p>This section will show only your maintenance requests.</p>
          {/* Jesse's components would be integrated here, filtered by currentUser.tenantId */}
        </>
      )}
    </div>
  );
}

export default DashboardPage;