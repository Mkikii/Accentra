import React from 'react'
import { useNavigate } from 'react-router'
import "../../styling/landlordHomeHeader.css"


const LandlordHomePageHeader = () => {

  const navigate = useNavigate()

  function handleDetailRouting(){
    navigate('/landlord-details')
  }

  function handleTenantFormRouting(){
    navigate('/add-tenant')
  }

  function handleTenantListRouting(){
    navigate('/tenant-list')
  }

  function handleMaintanenceFormListRouting(){
    navigate('/maintenance-list')
  }
  return (
    <div id='landlordHomePage'>
      <div id='landlordDetail' className='landDivs'>
        <p>View Your details here</p>
        <button onClick={handleDetailRouting}>Your details</button>
      </div>

      <div id='tenantForm' className='landDivs'>
        <p>Add a new tenant here</p>
        <button onClick={handleTenantFormRouting}>Add Tenant</button>
      </div>


      <div id='tenantListContainer' className='landDivs'>
        <p>View the all the tenants here</p>
        <button onClick={handleTenantListRouting}>View Tenants</button>
      </div>

      <div id='maintananceFeedback' className='landDivs'>
        <p>View all maintanance feedback</p>
        <button onClick={handleMaintanenceFormListRouting}>Maintanence list</button>
      </div>

    </div>
  )
}

export default LandlordHomePageHeader