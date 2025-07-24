import React, {useState} from 'react'

const FeedbackListCard = ({ name, unit, phone, email, description, dateRequested}) => {
  const [count, setCount] = useState(0)

  function handleClick(){
    setCount(count + 1)  
    if (count >= 2){
      setCount(0)
    }
  }
  return (
    <div id='feedbackList'>
      <p>Name: {name}</p>
      <p>Unit: {unit} </p>

      <h3>Contact:</h3>
      <p>Phone: {phone}</p>
      <p>Email: {email}</p>

      <p>Feedback: {description}</p>
      <p>Date Requested: {dateRequested}</p>
     
      {
        count === 1 ?
          <>
            <button onClick={handleClick}>In Progress</button>
          </>
        :
        count === 2 ?
          <>
            <button onClick={handleClick}>Complete</button>
          </>
        :
        <>
          <button onClick={handleClick}>Pending</button>
        </>
      }  
    </div>
  )
}

export default FeedbackListCard