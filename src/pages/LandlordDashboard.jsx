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
      const [requestsRes, usersRes] = await Promise.all([
        fetch(`${API_URL}/maintenance`),
        fetch(`${API_URL}/users`)
      ]);
      
      const requestsData = await requestsRes.json();
      const usersData = await usersRes.json();
      
      setRequests(requestsData);
      setTenants(usersData.filter(u => u.role === 'tenant'));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const updateRequestStatus = async (requestId, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/maintenance/${requestId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error updating request:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Landlord Dashboard - Welcome, {user.username}!</h2>
        <button className="btn btn-outline-danger" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5>Maintenance Requests</h5>
            </div>
            <div className="card-body">
              {requests.length === 0 ? (
                <p className="text-muted">No maintenance requests.</p>
              ) : (
                requests.map(request => (
                  <div key={request.id} className="border-bottom pb-3 mb-3">
                    <p><strong>Request:</strong> {request.description}</p>
                    <p><strong>Tenant ID:</strong> {request.tenantId}</p>
                    <p><strong>Date:</strong> {new Date(request.dateRequested).toLocaleDateString()}</p>
                    <p><strong>Status:</strong> 
                      <span className={`badge ms-2 ${
                        request.status === 'completed' ? 'bg-success' : 
                        request.status === 'in-progress' ? 'bg-warning' : 'bg-secondary'
                      }`}>
                        {request.status}
                      </span>
                    </p>
                    <div className="btn-group">
                      <button 
                        className="btn btn-sm btn-warning"
                        onClick={() => updateRequestStatus(request.id, 'in-progress')}
                      >
                        In Progress
                      </button>
                      <button 
                        className="btn btn-sm btn-success"
                        onClick={() => updateRequestStatus(request.id, 'completed')}
                      >
                        Complete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5>Tenants</h5>
            </div>
            <div className="card-body">
              {tenants.length === 0 ? (
                <p className="text-muted">No tenants registered.</p>
              ) : (
                tenants.map(tenant => (
                  <div key={tenant.id} className="border-bottom pb-2 mb-2">
                    <p><strong>{tenant.username}</strong></p>
                    <small className="text-muted">{tenant.email}</small>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandlordDashboard;
