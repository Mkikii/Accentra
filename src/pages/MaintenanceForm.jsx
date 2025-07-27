import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function MaintenanceForm() {
  const [requests, setRequests] = useState([]);
  const [issue, setIssue] = useState('plumbing');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [formMessage, setFormMessage] = useState('');

  const fetchRequests = async () => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (!loggedInUser || loggedInUser.role !== 'tenant') {
      console.error('User not logged in or not a tenant. Cannot fetch requests.');
      setRequests([]);
      return;
    }

    try {
      const res = await axios.get('http://localhost:4000/api/maintenance');
      const tenantRequests = res.data.filter(req => req.tenant_id === loggedInUser.id);
      setRequests(tenantRequests);
    } catch (error) {
      console.error('Error fetching requests:', error);
      setFormMessage('Error loading your requests.');
    }
  };

  const handleSubmit = async () => {
    if (!description.trim()) {
      setFormMessage('Please provide a description for the issue.');
      return;
    }

    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (!loggedInUser || loggedInUser.role !== 'tenant') {
      setFormMessage('You must be logged in as a tenant to submit a request.');
      return;
    }
    const tenant_id = loggedInUser.id;

    setLoading(true);
    setFormMessage('');

    try {
      await axios.post('http://localhost:4000/api/maintenance', {
        tenant_id: tenant_id,
        issue: issue,
        description: description,
        status: 'Pending'
      });
      setDescription('');
      setFormMessage('Maintenance request submitted successfully!');
      fetchRequests();
    } catch (error) {
      console.error('Error submitting request:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setFormMessage(`Error: ${error.response.data.message}`);
      } else {
        setFormMessage('Failed to submit request. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
//Fetch tenant's maintenance requests when component mounts or currentUser.id changes.
  //This ensures the list is updated if a different tenant logs in.
useEffect(() => {
    fetchRequests();
  }, [currentUser?.id]);

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

          <div className="card mb-4">
            <div className="card-header">
              <h3>Submit New Request</h3>
            </div>
            <div className="card-body">
              {formMessage && (
                <div className={`alert ${formMessage.includes('successfully') ? 'alert-success' : 'alert-danger'}`} role="alert">
                  {formMessage}
                </div>
              )}
              <div className="mb-3">
                <label htmlFor="issueType" className="form-label">Issue Type</label>
                <select
                  id="issueType"
                  className="form-select"
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                >
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
                  placeholder="Please describe the issue in detail..."
                />
              </div>

              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={loading || !description.trim()}
              >
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>My Requests</h3>
            </div>
            <div className="card-body">
              {requests.length === 0 ? (
                <p className="text-muted">No maintenance requests yet.</p>
              ) : (
                <div className="list-group list-group-flush">
                  {requests.map((r) => (
                    <div key={r.id} className="list-group-item">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="mb-1 text-capitalize">{r.issue}</h6>
                          <p className="mb-1">{r.description}</p>
                        </div>
                        <span className={`badge ${
                          r.status === 'Pending' ? 'bg-warning' :
                          r.status === 'In Progress' ? 'bg-info' :
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
