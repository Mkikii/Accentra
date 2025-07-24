import React, {useState, useEffect} from 'react'
import TenantList from "./components/tenant/TenantList";

const App = () => {
  const [tenants, setTenants] = useState([])
  const [role] = useState("landlord");
  const tenantURL = 'http://localhost:3000/tenants'

  useEffect(()=>{
    fetch(tenantURL)
    .then(response => response.json())
    .then(data => {
      setTenants(data);
    });
  },[]);

  function handleToggleAccess(updatedTenant) {
  const newAccess = !updatedTenant.hasAccess;

  fetch(`http://localhost:3000/tenants/${updatedTenant.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ hasAccess: newAccess })
  })
    .then((r) => r.json())
    .then((updatedData) => {
      const updatedList = tenants.map((tenant) =>
        tenant.id === updatedData.id ? updatedData : tenant
      );
      setTenants(updatedList);
    });
}
  return (
    <div>
      <TenantList
        tenants= {tenants}
        onToggleAccess={handleToggleAccess}
        role={role}
      />

    </div>
  )
}

export default App
