import React from 'react'
import { Route, Routes } from 'react-router'
import TenantHomePageHeader from '../components/Headers/TenantHomePageHeader'
import TenantDetails from '../components/Tenant/TenantDetails'

const TenantHomePage = ({loggedInTenant}) => {
  return (
    <>
        <h2>Welcome, {loggedInTenant?.name || "Guest"}!</h2>
        <TenantHomePageHeader />      
    </>
  )
}

export default TenantDashboard