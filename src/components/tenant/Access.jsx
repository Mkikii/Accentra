import React from "react";

function Access({ tenant, role, onToggleAccess }) {
  if (role !== "landlord") return null; 

  const handleClick = () => {
    onToggleAccess(tenant);
  };

  return (
    <button onClick={handleClick}>
      {tenant.hasAccess ? "Revoke Access" : "Grant Access"}
    </button>
  );
}

export default Access;