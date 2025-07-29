import React from 'react'
import "../styling/landlordDetails.css"

const LandlordDetails = ({ currentLandlord}) => {
  return (
    <div id='landlordDetails'>
        <h2>Welcome: {currentLandlord.name}</h2>
        <p>Phone Number: {currentLandlord.phone}</p>
        <p>Email: {currentLandlord.email}</p>
    </div>
  )
}

export default LandlordDetails