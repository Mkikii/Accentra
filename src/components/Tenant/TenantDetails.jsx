import React from 'react'
import "../../styling/tenantDetails.css"

const TenantDetails = ({tenant}) => {
  return (   
    <div id='tenantDetails'>
        <h2>Hello, {tenant.name}!</h2>
        <p> <strong>Unit: </strong> {tenant.unit}</p>
        <p><strong>Phone Number: </strong>  {tenant.phone}</p>
        <p><strong>Email: </strong>  {tenant.email}</p>
    </div>
  )
}

export default TenantDetails