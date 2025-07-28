import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API_URL from '../api';

const TenantDashboard = ({ user, onLogout }) => {
  const [requests, setRequests] = useState([]);
  const [newRequest, setNewRequest] = useState({ issue: 'plumbing', description: '' });
  const [loading, setLoading] = useState(false);
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch(`${API_URL}/maintenanceRequests`);
      const data = await response.json();
      setRequests(data.filter(req => req.tenantId === user.tenantId));
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const submitRequest = async () => {
    if (!newRequest.description.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/maintenanceRequests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantId: user.tenantId,
          issue: newRequest.issue,
          description: newRequest.description,
          status: 'Pending',
          createdAt: new Date().toISOString()
        })
      });

      if (response.ok) {
        setNewRequest({ issue: 'plumbing', description: '' });
        setSuccess('Request submitted successfully!');
        fetchRequests();
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error) {
      console.error('Error submitting request:', error);
    } finally {
      setLoading(false);
    }
  };

  const submitFeedback = async () => {
    if (!feedbackName.trim() || !feedbackMsg.trim()) return;
    
    setFeedbackLoading(true);
    try {
      const response = await fetch(`${API_URL}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: feedbackName,
          message: feedbackMsg,
          createdAt: new Date().toISOString()
        })
      });

      if (response.ok) {
        setFeedbackName('');
        setFeedbackMsg('');
        setSuccess('Feedback submitted successfully!');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setFeedbackLoading(false);
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <span className="navbar-brand">Accentra</span>
          <div className="navbar-nav ms-auto">
            <span className="navbar-text me-3">Welcome, {user.username}!</span>
            <button className="btn btn-outline-light btn-sm" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container py-4">
        {success && (
          <div className="alert alert-success alert-dismissible fade show">
            {success}
            <button type="button" className="btn-close" onClick={() => setSuccess('')}></button>
          </div>
        )}

        <div className="row g-4">
          {/* Maintenance Request Form */}
          <div className="col-lg-6">
            <div className="card h-100">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Submit Maintenance Request</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Issue Type</label>
                  <select
                    className="form-select"
                    value={newRequest.issue}
                    onChange={(e) => setNewRequest({...newRequest, issue: e.target.value})}
                  >
                    <option value="plumbing">Plumbing</option>
                    <option value="electrical">Electrical</option>
                    <option value="heating">Heating/AC</option>
                    <option value="appliance">Appliance</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    value={newRequest.description}
                    onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                    placeholder="Describe the maintenance issue..."
                  />
                </div>
                <button 
                  className="btn btn-primary w-100" 
                  onClick={submitRequest}
                  disabled={loading || !newRequest.description.trim()}
                >
                  {loading ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </div>
          </div>

          {/* My Requests */}
          <div className="col-lg-6">
            <div className="card h-100">
              <div className="card-header bg-info text-white">
                <h5 className="mb-0">My Maintenance Requests</h5>
              </div>
              <div className="card-body">
                {requests.length === 0 ? (
                  <p className="text-muted text-center">No maintenance requests yet.</p>
                ) : (
                  <div className="list-group list-group-flush">
                    {requests.map(request => (
                      <div key={request.id} className="list-group-item border-0 border-bottom">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h6 className="mb-1 text-capitalize">{request.issue}</h6>
                            <p className="mb-1">{request.description}</p>
                            <small className="text-muted">
                              {new Date(request.createdAt).toLocaleDateString()}
                            </small>
                          </div>
                          <span className={`badge ${
                            request.status === 'Completed' ? 'bg-success' : 
                            request.status === 'In Progress' ? 'bg-warning' : 'bg-secondary'
                          }`}>
                            {request.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Feedback Form */}
          <div className="col-12">
            <div className="card">
              <div className="card-header bg-success text-white">
                <h5 className="mb-0">Send Feedback</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Your Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={feedbackName}
                        onChange={(e) => setFeedbackName(e.target.value)}
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Your Feedback</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={feedbackMsg}
                        onChange={(e) => setFeedbackMsg(e.target.value)}
                        placeholder="Share your thoughts..."
                      />
                    </div>
                  </div>
                </div>
                <button 
                  className="btn btn-success"
                  onClick={submitFeedback}
                  disabled={feedbackLoading || !feedbackName.trim() || !feedbackMsg.trim()}
                >
                  {feedbackLoading ? 'Sending...' : 'Send Feedback'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantDashboard;
