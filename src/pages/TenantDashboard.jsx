import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TenantDashboard = ({ handleLogout }) => {
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await axios.get('https://accentra-api.herokuapp.com/api/tenants');
        setTenants(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTenants();
  }, [handleLogout]); 
  return (
    <div>
      <h1>Tenant Dashboard</h1>
      <ul>
        {tenants.map((tenant) => (
          <li key={tenant.id}>{tenant.name}</li>
        ))}
      </ul>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default TenantDashboard;