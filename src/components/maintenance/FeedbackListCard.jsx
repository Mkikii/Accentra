import React from 'react'

const FeedbackListCard = ({ name, unit, phone, email, description, dateRequested, status }) => {
  return (
    <div id='feedbackList'>
      <p>Name: {name}</p>
      <p>Unit: {unit} </p>

      <h3>Contact:</h3>
      <p>Phone: {phone}</p>
      <p>Email: {email}</p>

      <p>Feedback: {description}</p>
      <p>Date Requested: {dateRequested}</p>
     
      <span>{status}</span>
    </div>
  )
}

export default FeedbackListCard