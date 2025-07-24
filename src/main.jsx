import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MaintenanceSection from './MaintenanceSection'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MaintenanceSection />
  </StrictMode>
)
