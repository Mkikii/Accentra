import React, { useState, useEffect } from 'react'
import "./App.css"
import {  Routes, Route } from 'react-router'
import TenantLogin from './components/TenantLogin'
import AddMaintanenceForm from './components/Maintanence/AddMaintanenceForm'
import MaintanenceList from './components/Maintanence/MaintanenceList'
import AddTenantForm from './components/Tenant/AddTenantForm'
import TenantList from './components/Tenant/TenantList'
import TenantDetails from './components/Tenant/TenantDetails'
import RoleSelector from './components/RoleSelector' 
import TenantHomePage from './pages/TenantHomePage'
import LandlordDetails from './components/LandlordDetails'
import LandlordLogin from './components/LandlordLogin'
import LandlordHomePageHeader from './components/Headers/LandlordHomePageHeader'

const App = () => {
  const [role, setRole] = useState("")
  const [loggedInTenant, setLoggedInTenant] = useState(null)
  const [loggedInLandlord, setLoggedInLandlord] = useState(null)
  const [tenantsArray, setTenantsArray] = useState([])
  const [maintanenceFeedback, setMaintanenceFeedback] = useState([])
  const [landlords, setLandlords] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const maintainenceURL = "https://accentra1-0-backend.onrender.com/maintenanceRequests"
  const tenantURL = "https://accentra1-0-backend.onrender.com/tenants"
  const landlordsURL= "https://accentra1-0-backend.onrender.com/landlords" 

  useEffect(() => {
    fetch(tenantURL)
      .then((r) => r.json())
      .then((data) => setTenantsArray(data))

    fetch(maintainenceURL)
      .then((r) => r.json())
      .then((data) => setMaintanenceFeedback(data))

    fetch(landlordsURL)
      .then((r)=>r.json())
      .then((data)=>setLandlords(data) )
  }, [])

  const mergedData = maintanenceFeedback.map((feedback) => {
    const tenant = tenantsArray.find((t) => t.id === feedback.tenantId)
    return {
      ...feedback,
      tenant
    }
  })

  const dataIndex = mergedData[currentIndex]
  const currentLandlord = landlords[currentIndex]

  return (
    <div id="app">
      <div id='header'>
        <h1 id='heading' className='header'>Accentra</h1>
        <h3 id='catchPhrase' className='header'>Your no.1 Property Management App</h3>
      </div>
      <Routes>
        <Route path="/" element={
          <RoleSelector role={role} setRole={setRole} />
        } />

        <Route path="/tenant-login" element={
          <TenantLogin
            tenants={tenantsArray}
            setLoggedInTenant={setLoggedInTenant}
          />
        } />

        <Route path="/tenant-details" element={
          loggedInTenant ? (
            <TenantDetails tenant={loggedInTenant} />
          ) : (
            <p>Please log in as a tenant first.</p>
          )
        } />

        <Route
          path="/maintenance-form"
          element={
            <AddMaintanenceForm
              tenants={tenantsArray}
              maintanenceFeedback={maintanenceFeedback}
              setMaintanenceFeedback={setMaintanenceFeedback}
              setCurrentIndex={setCurrentIndex}
              loggedInTenant ={loggedInTenant}
            />
          }
        />

        <Route
          path="/maintenance-list"
          element={
            <>
              {dataIndex && dataIndex.tenant ? (
                <MaintanenceList
                  name={dataIndex.tenant.name}
                  unit={dataIndex.tenant.unit}
                  phone={dataIndex.tenant.phone}
                  email={dataIndex.tenant.email}
                  description={dataIndex.description}
                  dateRequested={dataIndex.dateRequested}
                  maintanenceFeedback={maintanenceFeedback}
                  setmaintanenceFeedback={setMaintanenceFeedback}
                />
              ) : (
                <p>No feedback available.</p>
              )}
            </>
          }
        />

        <Route path="/add-tenant" element={
          <AddTenantForm
            tenantsURL={tenantURL}
            tenants={tenantsArray}
            setTenants={setTenantsArray}
          />
        } />

        <Route path="/tenant-list" element={
          <TenantList
            tenants={tenantsArray}
            setTenants={setTenantsArray}
            tenantsURL={tenantURL}
          />
        } />
        <Route path= "/tenant-home-page" element ={
          <TenantHomePage
            loggedInTenant={loggedInTenant}
          />
        } />

        <Route path ="/landlord-details" element ={
          <LandlordDetails
            currentLandlord={currentLandlord}
          />
        } />

        <Route path="/landlord-login" element={
          <LandlordLogin
            landlords={landlords}
            setLoggedInLandlord={setLoggedInLandlord}
          />
        } />

        <Route path ='/landlord-home-page' element ={
          <LandlordHomePageHeader 
            loggedInLandlord={loggedInLandlord}
          />
        } />
      </Routes>
    </div>
  )
}

export default App
