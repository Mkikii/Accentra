import React, { useState, useContext } from 'react';
import AddMaintenanceForm from '../components/AddMaintenanceForm'; // Path: Accentra/src/components/AddMaintenanceForm.jsx
import MaintenanceRequestList from '../components/MaintenanceRequestList'; // Path: Accentra/src/components/MaintenanceRequestList.jsx
import { AuthContext } from '../context/AuthContext'; // Path: Accentra/src/context/AuthContext.jsx
import './MaintenancePage.css'; // Path: Accentra/src/pages/MaintenancePage.css

const MaintenancePage = () => {
    const { currentUser } = useContext(AuthContext);

    const [refreshList, setRefreshList] = useState(false);

    const handleRequestAdded = () => {
        setRefreshList(prev => !prev);
    };

    return (
        <div className="maintenance-page-container">
            <h1>Maintenance Management</h1>

            {currentUser && currentUser.role === 'tenant' && (
                <div className="maintenance-form-section">
                    <AddMaintenanceForm onAddRequest={handleRequestAdded} />
                </div>
            )}
            {currentUser && currentUser.role === 'landlord' && (
                 <div className="maintenance-form-section">
                    <h2>Landlord Actions: Add Request for Tenant (Optional)</h2>
                    <p>As a landlord, you can log a request on behalf of a tenant, or simply view all requests below.</p>
                    <AddMaintenanceForm onAddRequest={handleRequestAdded} />
                </div>
            )}


            <div className="maintenance-list-section">
                <MaintenanceRequestList key={refreshList} />
            </div>
        </div>
    );
};

export default MaintenancePage;
