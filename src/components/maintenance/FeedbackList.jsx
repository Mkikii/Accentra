import React ,{useState, useEffect} from 'react'

const FeedbackList = ({ name, unit, phone, email }) => {

  const [maintanenceFeedback, setmaintanenceFeedback] = useState([])
  const maintainenceURL = "http://localhost:3000/maintenanceRequests"

  useEffect(() =>{
    fetch(maintainenceURL)
    .then(r => r.json())
    .then(data =>{
      setmaintanenceFeedback(data)  
    })
  },[])
  return (
    <div id='feedbackList'>
      <h2>Feedback List</h2>
      <p>Name: {name}</p>
      <p>Unit: {unit} </p>
      
      <h3>Contact:</h3>
      <p>Phone: {phone}</p>
      <p>Email: {email}</p>
      <p>Feedback: {maintanenceFeedback.description}</p>
      <p>Date Requested: {maintanenceFeedback.dateRequested}</p>
      <span>{maintanenceFeedback.status}</span>
    </div>
  )
}

export default FeedbackList