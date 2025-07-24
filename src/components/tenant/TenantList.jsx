import React from "react";
import TenantCard from "./TenantCard";

function TenantList({ tenants, onToggleAccess, role}) {
  return (
    <div>
      <h2>{role === "landlord" ? "All Tenants" : "Your Info"}</h2>

      {tenants.length === 0 ? (
        <p>No tenants to display.</p>
      ) : (
        <div>
          {tenants.map((tenant) => (
            <TenantCard
              key={tenant.id}
              tenant={tenant}
              onToggleAccess={onToggleAccess}
              role={role}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TenantList;