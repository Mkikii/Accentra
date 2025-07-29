import React from 'react'
import { useNavigate } from 'react-router'
import "../styling/starter.css"

const RoleSelector = ({ setRole }) => {
  const navigate = useNavigate()

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value
    setRole(selectedRole)

    if (selectedRole === 'tenant') {
      navigate('/tenant-login')
    } else if (selectedRole === 'landlord') {
      navigate('/landlord-login')
    }
  }

  return (
    <div id='role'>
      <p className='content'>Select your role:</p>
      <select name="role" id="roleSelector" onChange={handleRoleChange} className='content'>
        <option value="">-- Choose Role --</option>
        <option value="tenant">Tenant</option>
        <option value="landlord">Landlord</option>
      </select>
    </div>
  )
}

export default RoleSelector
