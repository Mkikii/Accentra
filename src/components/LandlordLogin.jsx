import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import "../styling/landlordLogin.css"

const LandlordLogin = ({ landlords, setLoggedInLandlord }) => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    const matchedLandlord = landlords.find(
      (landlord) =>
        name.trim().toLowerCase() === landlord.name.toLowerCase() &&
        password.trim() === String(landlord.userId)
    )

    if (matchedLandlord) {
      setLoggedInLandlord(matchedLandlord)
      navigate('/landlord-home-page')
    } else {
      alert("Invalid details. Please try again.")
    }
  }

  return (
    <div id='landlordLogin'>
      <h2>Landlord Login</h2>
      <form onSubmit={handleLogin} id='landlordLoginForm'>
        <label>Name:</label>
        <br />
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />

        <label>Password:</label>
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />

        <button type="submit" id='LandlordLoginButton'>Login</button>
      </form>
      <p>Example of landlord: James Mwangi, Password: landlord001</p>
    </div>
  )
}

export default LandlordLogin
