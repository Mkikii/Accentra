import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import "../styling/tenantLogin.css"

const TenantLogin = ({tenants, setLoggedInTenant}) => {
  const [name, setName] =useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    const matchedTenant = tenants.find (
      (tenant) => name.trim().toLowerCase() === tenant.name.toLowerCase()  &&
      password.trim() === String(tenant.userId)
    )

    if(matchedTenant){
      setLoggedInTenant(matchedTenant)
      navigate('/tenant-home-page')
    } else {
      alert("Invalid Details. Please try again.")
    }
  }

  return (
    <div id='tenantLogin'>
        <h2 className='tLogincontent'>Enter your details</h2>
        <form onSubmit={handleLogin} className='tLogincontent'>
            <label>Name:</label>
            <br />
            <input 
              type="text"
              name='name'
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
              value = {password}
              id="password" 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
            <br />

            <button id ="submit" type='submit'>Login</button>
        </form>
        <p>Example of tenant: kikii Molly , Password: 101 </p>
    </div>
  )
}

export default TenantLogin