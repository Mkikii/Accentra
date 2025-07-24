import React, { useState, useEffect, useContext } from 'react';
import TenantCard from './TenantCard'; // Path: Accentra/src/components/tenant/TenantCard.jsx
import { AuthContext } from '../../context/AuthContext'; // Path: Accentra/src/context/AuthContext.jsx
import './TenantList.css'; // Path: Accentra/src/components/tenant/TenantList.css (same directory)

function TenantList({ tenants, onToggleAccess, role }) {
  // Filter tenants if the current user is a tenant
  const displayedTenants = role === 'tenant'
    ? tenants.filter(tenant => tenant.userId === role.userId) // Assuming tenant.userId links to user.id
    : tenants; // Landlord sees all

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
