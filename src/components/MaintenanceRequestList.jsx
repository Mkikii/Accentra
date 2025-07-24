import React, { useState, useEffect, useContext } from 'react';
import MaintenanceRequestCard from './MaintenanceRequestCard';
import { AuthContext } from '../context/AuthContext';
import './MaintenanceRequestList.css';

const MaintenanceRequestList = () => {
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const maintenanceURL = "http://localhost:3001/maintenanceRequests";

  useEffect(() => {
    const fetchMaintenanceRequests = async () => {
      try {
        setLoading(true);
        const response = await fetch(maintenanceURL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMaintenanceRequests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMaintenanceRequests();
  }, []);

  const filteredRequests = maintenanceRequests.filter(request => {
    if (!currentUser || currentUser.role === 'landlord') {
      return true;
    } else if (currentUser.role === 'tenant' && currentUser.tenantId) {
      return request.tenantId === currentUser.tenantId;
    }
    return false;
  });

  if (loading) {
    return <div className="loading">Loading maintenance requests...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="maintenance-list">
      <h2>Maintenance Requests</h2>
      {filteredRequests.length === 0 ? (
        <p>No maintenance requests found.</p>
      ) : (
        <div className="requests-grid">
          {filteredRequests.map(request => (
            <MaintenanceRequestCard key={request.id} request={request} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MaintenanceRequestList;
