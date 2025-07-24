import React, {useState, useEffect} from 'react'
import FeedbackForm from './components/maintenance/FeedbackForm'
import FeedbackList from './components/maintenance/FeedbackList'

const MaintenanceSection = () => {
  const [tenantDetails, setTenantDetails] = useState([])
  const tenantURL = "http://localhost:3000/tenants"

  useEffect(() =>{
    fetch(tenantURL)
    .then(r => r.json())
    .then(data =>{
      setTenantDetails(data)
    })
  },[])

  return (
    <div>
      <FeedbackForm />
      <FeedbackList
        name = {tenantDetails.name}
        unit = {tenantDetails.unit}
        phone = {tenantDetails.phone}
        email = {tenantDetails.email}
      />
    </div>
  )
}

export default MaintenanceSection