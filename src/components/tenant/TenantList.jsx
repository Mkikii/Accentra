import React from 'react';
import TenantCard from './TenantCard'; 
import './TenantList.css'; 

function TenantList({ tenants, onToggleAccess, role }) {
  
  const displayedTenants = role === 'tenant'
    ? tenants.filter(tenant => tenant.userId === role.userId) 
    : tenants; 

  return (
    <div className="tenant-list-grid">
      {displayedTenants.length === 0 ? (
        <p>No tenants found.</p>
      ) : (
        displayedTenants.map((tenant) => (
          <TenantCard
            key={tenant.id}
            tenant={tenant}
            onToggleAccess={onToggleAccess}
            role={role}
          />
        ))
      )}
    </div>
  );
}

export default TenantList;