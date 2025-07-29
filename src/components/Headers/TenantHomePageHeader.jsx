import React from 'react'
import { useNavigate } from 'react-router'
import"../../styling/tenantHomeHeader.css"


const TenantHomePageHeader = () => {

  const navigate = useNavigate()

  function handleDetailRouting(){
    navigate('/tenant-details')
  }

  function handleMaintanenceFormRouting(){
    navigate('/maintenance-form')
  }
  return (
    <div id='tenantHeader'>
      <div id='detailsCard' className='cards'>
        <p className='tHeaderP'>This is where all your details are. Click here to view.</p>
        <button onClick={handleDetailRouting} className='tHeaderButtons'>Your details</button>
      </div>

      <div id='formCard' className='cards'>
        <p className='tHeaderP'>This is where you can submit a maintenance issue. Click here  to get started.</p>
        <button onClick={handleMaintanenceFormRouting} className='tHeaderButtons'>Maintanence form</button>
      </div>
    </div>
  )
}

export default TenantHomePageHeader