import React, {useState} from 'react'
import "../../styling/tenantList.css"

const TenantList = ({tenants, tenantsURL, setTenants}) => {

  const [currentIndex, setCurrentIndex] = useState(0)

  const currentTenant = tenants[currentIndex]

  function handleNext(){
    if(currentIndex < tenants.length - 1){
      setCurrentIndex(currentIndex + 1)
    }
  }

  function handlePrevious(){
    if(currentIndex > 0){
      setCurrentIndex(currentIndex - 1)
    }
  }

  function handleDelete(){
      const confirmed = window.confirm("Are you sure you want to delete this Tenant?")

      if(!confirmed) return

        fetch(`${tenantsURL}/${currentTenant.id}`, {
          method: "DELETE"
        })
        .then(()=> {
          const updatedTenantsList = tenants.filter(tenant => tenant.id !==currentTenant.id)
          setTenants(updatedTenantsList)

          setCurrentIndex(prevIndex =>{
            const lastIndex = updatedTenantsList.length - 1
            return prevIndex > lastIndex ? lastIndex : prevIndex
          })
          alert(`${currentTenant.name}'s data has been deleted`)
        })
        .catch(()=>{
          alert(`Failed to delete ${currentTenant.name}'s data`)
        })
    
  }
  return (
    <div id='tenantList'>
      {currentTenant &&
          <div key={currentTenant.id}>
            <h2>{currentTenant.unit}</h2>
              <p>Name: {currentTenant.name}</p>
              <p>Phone: {currentTenant.phone}</p>
              <p>Email: {currentTenant.email}</p>
              <p>User Id: {currentTenant.userId}</p>
          </div>
      }
      <div id='tenantListButtons'>
        <button onClick={handlePrevious}>Prev</button>
        <button onClick={handleNext}>Next</button>
        <br />
        <button id ="tenantDelete"onClick={handleDelete}>Delete</button>
      </div>

    </div>
  )
}

export default TenantList
