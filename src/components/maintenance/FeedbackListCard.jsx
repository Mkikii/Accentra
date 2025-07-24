import React, { useState, useEffect } from 'react'
import FeedbackForm from './FeedbackForm'
import StatusButton from './StatusButton'

const FeedbackListCard = () => {
  const [tenantsArray, setTenantsArray] = useState([])
  const [maintanenceFeedback, setmaintanenceFeedback] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const maintainenceURL = "http://localhost:3000/maintenanceRequests"
  const tenantURL = "http://localhost:3000/tenants"

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
    <div>
      <FeedbackForm
        tenants={tenantsArray}
        maintanenceFeedback={maintanenceFeedback}
        setMaintanenceFeedback={setmaintanenceFeedback}
      />

      <h2>Feedback List</h2>

      {dataIndex && dataIndex.tenant ? (
        <div id='feedbackList'>
          <p>Name: {dataIndex.tenant.name}</p>
          <p>Unit: {dataIndex.tenant.unit}</p>

          <h3>Contact:</h3>
          <p>Phone: {dataIndex.tenant.phone}</p>
          <p>Email: {dataIndex.tenant.email}</p>

          <p>Feedback: {dataIndex.description}</p>
          <p>Date Requested: {dataIndex.dateRequested}</p>

          <StatusButton />
        </div>
      ) : (
        <p>No feedback available.</p>
      )}

      <div id="buttonSection">
        <button onClick={handlePrevious}>Prev</button>
        <button onClick={handleNext}>Next</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export default FeedbackListCard