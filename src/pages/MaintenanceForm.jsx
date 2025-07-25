import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function MaintenanceForm() {
  const [requests, setRequests] = useState([])
  const [issue, setIssue] = useState('plumbing')
  const [desc, setDesc] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchRequests = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/maintenance')
      setRequests(res.data)
    } catch (error) {
      console.error('Error fetching requests:', error)
    }
  }

  const handleSubmit = async () => {
    if (!desc.trim()) return
    
    setLoading(true)
    try {
      await axios.post('http://localhost:4000/api/maintenance', {
        issue,
        description: desc,
        status: 'open'
      })
      setDesc('')
      fetchRequests()
    } catch (error) {
      console.error('Error submitting request:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

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
              <div className="mb-3">
                <label className="form-label">Issue Type</label>
                <select 
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
                <label className="form-label">Description</label>
                <textarea 
                  className="form-control" 
                  rows="4"
                  value={desc} 
                  onChange={(e) => setDesc(e.target.value)} 
                  placeholder="Please describe the issue in detail..."
                />
              </div>
              
              <button 
                className="btn btn-primary" 
                onClick={handleSubmit}
                disabled={loading || !desc.trim()}
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
                          r.status === 'open' ? 'bg-warning' : 
                          r.status === 'in-progress' ? 'bg-info' : 'bg-success'
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
  )
}

export default MaintenanceForm