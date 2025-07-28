import React from 'react'
import LandlordHomePageHeader from '../components/Headers/LandlordHomePageHeader'

const LandlordHomePage = ({currentLandlord}) => {
  return (
    <div>
        <h2>Welcome: {currentLandlord.name || "Landlord"}!</h2>
        <LandlordHomePageHeader />
    </div>
  )
}

export default LandlordDashboard