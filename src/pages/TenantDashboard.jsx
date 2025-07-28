import React, { useState, useEffect } from 'react';
import API_URL from '../api';

const TenantDashboard = ({ user, onLogout }) => {
  const [requests, setRequests] = useState([]);
  const [newRequest, setNewRequest] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch(`${API_URL}/maintenance`);
      const data = await response.json();
      setRequests(data.filter(req => req.tenantId === user.id));
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const submitRequest = async () => {
    if (!newRequest.trim()) return;

    try {
      const response = await fetch(`${API_URL}/maintenance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: Date.now().toString(),
          tenantId: user.id,
          description: newRequest,
          status: 'pending',
          dateRequested: new Date().toISOString()
        })
      });

      if (response.ok) {
        setNewRequest('');
        fetchRequests();
      }
    } catch (error) {
      console.error('Error submitting request:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Tenant Dashboard</h2>
        <button className="btn btn-outline-danger" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Submit Maintenance Request</h5>
            </div>
            <div className="card-body">
              <textarea
                className="form-control mb-3"
                rows="3"
                placeholder="Describe the maintenance issue..."
                value={newRequest}
                onChange={(e) => setNewRequest(e.target.value)}
              />
              <button className="btn btn-primary" onClick={submitRequest}>
                Submit Request
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>My Requests</h5>
            </div>
            <div className="card-body">
              {requests.length === 0 ? (
                <p>No maintenance requests.</p>
              ) : (
                requests.map(request => (
                  <div key={request.id} className="border-bottom pb-2 mb-2">
                    <p><strong>Request:</strong> {request.description}</p>
                    <small className="text-muted">
                      Status: {request.status} | Date: {new Date(request.dateRequested).toLocaleDateString()}
                    </small>
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

export default TenantDashboard;
