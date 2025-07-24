import React, { useState, useEffect, useContext } from 'react';
import TenantList from '../components/tenant/TenantList'; 
import { AuthContext } from '../context/AuthContext'; 
import './TenantsPage.css';

function TenantsPage() {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useContext(AuthContext); 

  const tenantURL = 'http://localhost:3001/tenants'; 

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        setLoading(true);
        const response = await fetch(tenantURL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTenants(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTenants();
  }, []);

  // Function to toggle tenant access (for landlord)
  const handleToggleAccess = async (updatedTenant) => {
    if (currentUser && currentUser.role !== 'landlord') {
      console.warn("Only landlords can toggle access.");
      return;
    }

    const newAccessStatus = !updatedTenant.hasAccess;
    try {
      const response = await fetch(`${tenantURL}/${updatedTenant.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hasAccess: newAccessStatus }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedData = await response.json();
      setTenants((prevTenants) =>
        prevTenants.map((tenant) =>
          tenant.id === updatedData.id ? updatedData : tenant
        )
      );
      console.log(`Tenant ${updatedData.name} access toggled to ${newAccessStatus}`);
    } catch (err) {
      console.error('Error toggling access:', err);
      setError('Failed to toggle access: ' + err.message);
    }
  };

  if (loading) {
    return <div className="tenants-page-container">Loading tenants...</div>;
  }

  if (error) {
    return <div className="tenants-page-container error-message">Error: {error}</div>;
  }

  return (
    <div className="tenants-page-container">
      <h1>Tenant Management</h1>
      {currentUser && currentUser.role === 'landlord' && (
        <p>As a landlord, you can view and manage access for all tenants.</p>
      )}
      {currentUser && currentUser.role === 'tenant' && (
        <p>As a tenant, you can view your own information.</p>
      )}

      <TenantList
        tenants={tenants}
        onToggleAccess={handleToggleAccess}
        role={currentUser ? currentUser.role : null} 
      />
    </div>
  );
}

export default TenantsPage;