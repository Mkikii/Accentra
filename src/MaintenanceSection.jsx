import React, {useState, useEffect} from 'react'
import FeedbackForm from './components/maintenance/FeedbackForm'
import FeedbackListCard from './components/maintenance/FeedbackListCard'

const MaintenanceSection = () => {
  const [tenantsArray, setTenantsArray] = useState([])
  const [maintanenceFeedback, setmaintanenceFeedback] = useState([])
  const maintainenceURL = "http://localhost:3000/maintenanceRequests"
  const tenantURL = "http://localhost:3000/tenants"

  useEffect(() =>{
    fetch(tenantURL)
    .then(r => r.json())
    .then(data =>{
      setTenantsArray(data)
    })
    
      fetch(maintainenceURL)
      .then(r => r.json())
      .then(data =>{
        setmaintanenceFeedback(data)  
      })

  },[])
  

  return (
    <div>
      <FeedbackForm />
      {maintanenceFeedback.map((feedback) => {
        const tenantDetails = tenantsArray.find(tenant => tenant.id === feedback.tenantId);
        if (!tenantDetails) return null;

        return (
          <div key={feedback.id}>
            <h2>Feedback List</h2>
            <FeedbackListCard
              name={tenantDetails.name}
              unit={tenantDetails.unit}
              phone={tenantDetails.phone}
              email={tenantDetails.email}
              description={feedback.description}
              dateRequested={feedback.dateRequested}
              status={feedback.status}
            />
          </div>
        );
      })}

    </div>
  )
}

export default MaintenanceSection