import React, { useState, useEffect } from 'react'
import "../../styling/maintananceForm.css"

const AddMaintanenceForm = ({
  maintanenceFeedback,
  setMaintanenceFeedback,
  setCurrentIndex,
  loggedInTenant
}) => {
  const [selectedTenantId, setSelectedTenantId] = useState("")
  const [description, setDescription] = useState("")

  const maintainenceURL = "http://localhost:3000/maintenanceRequests"

  useEffect(() => {
    if (loggedInTenant) {
      setSelectedTenantId(loggedInTenant.id.toString())
    }
  }, [loggedInTenant])

  function handleSubmit(event) {
    event.preventDefault()

    const existingFeedback = maintanenceFeedback.find(
      (feedback) => feedback.tenantId === parseInt(selectedTenantId)
    )

    const feedbackData = {
      tenantId: parseInt(selectedTenantId),
      description,
      dateRequested: new Date().toISOString()
    }

    
    if (existingFeedback) {
      fetch(`${maintainenceURL}/${existingFeedback.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ description: feedbackData.description })
      })
        .then(res => res.json())
        .then(updatedFeedback => {
          alert("Your feedback has been updated.")

          
          setMaintanenceFeedback(prev =>
            prev.map(fb =>
              fb.id === updatedFeedback.id ? updatedFeedback : fb
            )
          )

          
          const updatedIndex = maintanenceFeedback.findIndex(
            fb => fb.id === updatedFeedback.id
          )
          setCurrentIndex(updatedIndex)

          resetForm()
        })
        .catch(err => {
          alert("Could not update your feedback.")
          console.error("PATCH error:", err.message)
        })
    } else {

      fetch(maintainenceURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(feedbackData)
      })
        .then(res => res.json())
        .then(newFeedback => {
          alert("Your feedback has been sent. Expect response soon.")

          
          setMaintanenceFeedback(prev => [...prev, newFeedback])
          setCurrentIndex(maintanenceFeedback.length)

          resetForm()
        })
        .catch(err => {
          alert("Sorry, your response could not be sent.")
          console.error("POST error:", err.message)
        })
    }
  }

  useEffect(() => {
    const existingFeedback = maintanenceFeedback.find(
      (fb) => fb.tenantId === parseInt(selectedTenantId)
    )
    if (existingFeedback) {
      setDescription(existingFeedback.description)
    } else {
      setDescription("")
    }
  }, [selectedTenantId, maintanenceFeedback])

  function resetForm() {
    setDescription("")
    setSelectedTenantId("")
  }

  return (
    <div id='maintananceFormDiv'>
      <form onSubmit={handleSubmit}>
        <h2>Maintenance Issue Form</h2>
        <p><strong>Tenant:</strong> {loggedInTenant?.name} ({loggedInTenant?.unit})</p>
        <br />

        <label><strong>Description:</strong></label>
        <br />
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AddMaintanenceForm
