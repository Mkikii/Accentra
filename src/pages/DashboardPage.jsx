import React, { useContext } from "react"; 
import TenantList from '../components/TenantList.jsx';
import { AuthContext } from '../context/AuthContext.jsx';

function DashboardPage({ tenants }) { 
  const { currentUser } = useContext(AuthContext); 

  const currentRole = currentUser ? currentUser.role : 'guest';
  const currentTenantId = currentUser && currentUser.role === 'tenant' ? currentUser.tenantId : null;

  const displayTenants = currentRole === "landlord"
    ? tenants
    : tenants.filter((tenant) => tenant.id === currentTenantId);

  return (
    <div className="dashboard-container">
      <h1>{currentRole === "landlord" ? "Landlord Dashboard" : "Tenant Dashboard"}</h1>

      <TenantList tenants={displayTenants} role={currentRole} />

      {currentRole === "landlord" && (
          <div>
              <h2>Quick Stats (Landlord)</h2>
              <p>Total Tenants: {tenants.length}</p>
          </div>
      )}
    </div>
  );
}

export default DashboardPage;