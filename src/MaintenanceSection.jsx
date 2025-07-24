import React, {useState, useEffect} from 'react'
import FeedbackForm from './components/maintenance/FeedbackForm'
import FeedbackList from './components/maintenance/FeedbackList'

const MaintenanceSection = () => {
  const [tenantsArray, setTenantsArray] = useState([])
  const [tenantDetails, setTenant] = useState({})
  const tenantURL = "http://localhost:3000/tenants"

  useEffect(() =>{
    fetch(tenantURL)
    .then(r => r.json())
    .then(data =>{
      setTenantsArray(data)
    })
  },[])
  
  tenantsArray.map((tenant)=>(
    setTenant(tenant)
  ))

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