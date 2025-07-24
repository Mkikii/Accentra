import React from "react";

import './TenantCard.css'; 

function TenantCard({ tenant, onToggleAccess, role }) {
  const { name, unit, phone, email, hasAccess } = tenant; 

  return (
    <div className="tenant-card">
      <h3>{name}</h3>
      <p><strong>Unit:</strong> {unit}</p>
      <p><strong>Phone:</strong> {phone}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Access:</strong> {hasAccess ? "✅ Granted" : "❌ Denied"}</p>

      {role === "landlord" && (
        <button onClick={() => onToggleAccess(tenant)}>
          {hasAccess ? "Revoke Access" : "Grant Access"}
        </button>
      )}
    </div>
  );
}

export default TenantCard;