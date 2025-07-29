import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';

const API_BASE_URL = import.meta.env.VITE_API_URL;

function MaintenanceForm() {
  const { currentUser } = useAuth();

  const [requests, setRequests] = useState([]);
  const [issue, setIssue] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [formMessage, setFormMessage] = useState({ type: '', text: '' });

  const fetchRequests = async () => {
    if (!currentUser || !currentUser.id) {
      console.warn('Cannot fetch requests: currentUser or currentUser.id is not available yet.');
      setRequests([]);
      return;
    }

    try {
      const res = await axios.get(`${API_BASE_URL}/maintenanceRequests?tenantId=${currentUser.id}`);
      setRequests(res.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
      setFormMessage({ type: 'danger', text: 'Error loading your requests.' });
    }
  };

  useEffect(() => {
    if (currentUser?.id) {
        fetchRequests();
    }
  }, [currentUser?.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!issue || !description.trim()) {
      setFormMessage({ type: 'danger', text: 'Please select an issue type and provide a description.' });
      return;
    }

    if (!currentUser || currentUser.role !== 'tenant') {
      setFormMessage({ type: 'danger', text: 'You must be logged in as a tenant to submit a request.' });
      return;
    }

    setLoading(true);
    setFormMessage({ type: '', text: '' });

    try {
      await axios.post(`${API_BASE_URL}/maintenanceRequests`, {
        tenantId: currentUser.id,
        issue: issue,
        description: description,
        status: 'open',
        createdAt: new Date().toISOString()
      });

      setDescription('');
      setIssue('');
      setFormMessage({ type: 'success', text: 'Maintenance request submitted successfully!' });
      fetchRequests();

    } catch (error) {
      console.error('Error submitting request:', error);
      setFormMessage({ type: 'danger', text: 'Failed to submit request. Please try again.' });
    } finally {
      setLoading(false);
      setTimeout(() => setFormMessage({ type: '', text: '' }), 5000);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>Maintenance Request</h1>
            <Link to="/tenant" className="btn btn-outline-secondary">
              ← Back to Dashboard
            </Link>
          </div>

          {formMessage.text && (
            <div className={`alert alert-${formMessage.type}`} role="alert">
              {formMessage.text}
            </div>
          )}

          <div className="card mb-4">
            <div className="card-header">
              <h3>Submit New Request</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="issueType" className="form-label">Issue Type</label>
                  <select
                    id="issueType"
                    className="form-select"
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    required
                  >
                    <option value="">Select an issue type</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="electrical">Electrical</option>
                    <option value="heating">Heating/AC</option>
                    <option value="appliance">Appliance</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    id="description"
                    className="form-control"
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Please describe the issue in detail (e.g., 'Leaky faucet in kitchen sink')."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading || !description.trim() || !issue}
                >
                  {loading ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>My Requests</h3>
            </div>
            <div className="card-body">
              {requests.length === 0 ? (
                <p className="text-muted">No maintenance requests submitted yet.</p>
              ) : (
                <div className="list-group list-group-flush">
                  {requests.map((r) => (
                    <div key={r.id} className="list-group-item">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="mb-1 text-capitalize">{r.issue}</h6>
                          <p className="mb-1">{r.description}</p>
                          <small className="text-muted">Submitted on: {new Date(r.createdAt).toLocaleDateString()}</small>
                        </div>
                        <span className={`badge ${
                          r.status === 'open' ? 'bg-warning' :
                          r.status === 'in-progress' ? 'bg-info' :
                          'bg-success'
                        }`}>
                          {r.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MaintenanceForm;
