import React from "react";

function TenantCard({ tenant, onToggleAccess, role }) {
  const { name, unit, phone, hasAccess } = tenant;

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem" }}>
      <h3>{name}</h3>
      <p><strong>Unit:</strong> {unit}</p>
      <p><strong>Phone:</strong> {phone}</p>
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