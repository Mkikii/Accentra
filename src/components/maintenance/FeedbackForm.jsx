import React from 'react'

const FeedbackForm = () => {

  const maintainenceURL = "http://localhost:3000/maintenanceRequests"
  return (
    
    <div>
      <form>
        <h1>Maintenance Issue Form</h1>

        <label>Name</label>
        <br />
        <input type="text" name='name'/>
        <br />

        <label>Unit</label>
        <br />
        <input type="text" name='unit'/>
        <br />

        <label>Contact</label>
        <br />
        <input type="text" name='contact' />
        <br />

        <label>Feedback</label>
        <br />
        <input type="text" name='feedback' />
        <br />

        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default FeedbackForm