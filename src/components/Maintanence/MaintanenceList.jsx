import React, { useState, useEffect } from 'react'
import StatusButton from './StatusButton'
import "../../styling/maintananceList.css"

const MaintanenceList = () => {
  const [tenantsArray, setTenantsArray] = useState([])
  const [maintanenceFeedback, setmaintanenceFeedback] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const maintainenceURL = "https://accentra1-0-backend.onrender.com/maintenanceRequests"
  const tenantURL = "https://accentra1-0-backend.onrender.com/tenants"

  useEffect(() => {
    fetch(tenantURL)
      .then(r => r.json())
      .then(data => setTenantsArray(data))

    fetch(maintainenceURL)
      .then(r => r.json())
      .then(data => setmaintanenceFeedback(data))
  }, [])

  const mergedData = maintanenceFeedback.map(feedback => {
    const tenant = tenantsArray.find(t => t.id === feedback.tenantId)
    return {
      ...feedback,
      tenant
    }
  })

  const dataIndex = mergedData[currentIndex]

  function handleNext() {
    if (currentIndex < mergedData.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  function handlePrevious() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  function handleDelete() {
    if (!dataIndex || !dataIndex.id) return

    const confirmed = window.confirm("Are you sure you want to delete this feedback?")
    if (!confirmed) return

    fetch(`${maintainenceURL}/${dataIndex.id}`, {
      method: "DELETE"
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete")

        const updatedFeedback = maintanenceFeedback.filter(fb => fb.id !== dataIndex.id)
        setmaintanenceFeedback(updatedFeedback)

        setCurrentIndex(prevIndex => {
          const lastIndex = updatedFeedback.length - 1
          return prevIndex > lastIndex ? lastIndex : prevIndex
        })

        alert("Feedback deleted successfully.")
      })
      .catch((err) => {
        console.error("Delete error:", err.message)
        alert("Failed to delete feedback.")
      })
  }

  return (
    <div id='feedbackList'>
      <h2>Feedback List</h2>
      {dataIndex && dataIndex.tenant ? (
        <div id='feedback'>
          <p>Name: {dataIndex.tenant.name}</p>
          <p>Unit: {dataIndex.tenant.unit}</p>

          <p>Phone: {dataIndex.tenant.phone}</p>
          <p>Email: {dataIndex.tenant.email}</p>

          <p>Feedback: {dataIndex.description}</p>
          <p>Date Requested: {new Date(dataIndex.dateRequested).toLocaleDateString()}</p>

        <StatusButton
          status={dataIndex.status || 0}
          onChange={(newStatus) => {
            fetch(`${maintainenceURL}/${dataIndex.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ status: newStatus })
            })
            .then(res => res.json())
            .then(updated => {
              const updatedList = maintanenceFeedback.map(fb =>
                fb.id === updated.id ? updated : fb
              )
              setmaintanenceFeedback(updatedList)
            })
          }}
        />

        </div>
      ) : (
        <p>No feedback available.</p>
      )}

      <div id="buttonSection">
        <button onClick={handlePrevious}>Prev</button>
        <button onClick={handleNext}>Next</button>
        <button id='maintananceDelete' onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export default MaintanenceList