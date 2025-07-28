import React, { useState, useEffect } from 'react';
import API_URL from '../api';

const LandlordDashboard = ({ user, onLogout }) => {
  const [requests, setRequests] = useState([]);
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [requestsRes, tenantsRes] = await Promise.all([
        fetch(`${API_URL}/maintenanceRequests`),
        fetch(`${API_URL}/tenants`)
      ]);
      
      const requestsData = await requestsRes.json();
      const tenantsData = await tenantsRes.json();
      
      setRequests(requestsData);
      setTenants(tenantsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Landlord Dashboard</h2>
        <button className="btn btn-outline-danger" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Maintenance Requests</h5>
            </div>
            <div className="card-body">
              {requests.length === 0 ? (
                <p>No maintenance requests.</p>
              ) : (
                requests.map(request => (
                  <div key={request.id} className="border-bottom pb-2 mb-2">
                    <p><strong>Request:</strong> {request.description}</p>
                    <small className="text-muted">
                      Date: {new Date(request.dateRequested).toLocaleDateString()}
                    </small>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Tenants</h5>
            </div>
            <div className="card-body">
              {tenants.map(tenant => (
                <div key={tenant.id} className="border-bottom pb-2 mb-2">
                  <p><strong>{tenant.name}</strong></p>
                  <small className="text-muted">Unit: {tenant.unit}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandlordDashboard;
