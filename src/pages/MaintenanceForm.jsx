import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function MaintenanceForm() {
  const [requests, setRequests] = useState([])
  const [issue, setIssue] = useState('plumbing')
  const [desc, setDesc] = useState('')
  const [loading, setLoading] = useState(false)

  // Load requests from localStorage
  useEffect(() => {
    const savedRequests = localStorage.getItem('maintenanceRequests')
    if (savedRequests) {
      setRequests(JSON.parse(savedRequests))
    }
  }, [])

  const handleSubmit = async () => {
    if (!desc.trim()) return
    
    setLoading(true)
    
    // Simulate API delay
    setTimeout(() => {
      const newRequest = {
        id: Date.now(),
        issue,
        description: desc,
        status: 'open',
        createdAt: new Date().toISOString()
      }
      
      const updatedRequests = [...requests, newRequest]
      setRequests(updatedRequests)
      
      // Save to localStorage
      localStorage.setItem('maintenanceRequests', JSON.stringify(updatedRequests))
      
      setDesc('')
      setLoading(false)
      
      alert('Request submitted successfully!')
    }, 1000)
  }

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
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Submit New Request</h3>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label fw-semibold">Issue Type</label>
                <select 
                  className="form-select" 
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                >
                  <option value="plumbing">🔧 Plumbing</option>
                  <option value="electrical">⚡ Electrical</option>
                  <option value="heating">🌡️ Heating/AC</option>
                  <option value="appliance">🏠 Appliance</option>
                  <option value="other">🔨 Other</option>
                </select>
              </div>
              
              <div className="mb-3">
                <label className="form-label fw-semibold">Description</label>
                <textarea 
                  className="form-control" 
                  rows="4"
                  value={desc} 
                  onChange={(e) => setDesc(e.target.value)} 
                  placeholder="Please describe the issue in detail..."
                />
              </div>
              
              <button 
                className="btn btn-primary btn-lg w-100" 
                onClick={handleSubmit}
                disabled={loading || !desc.trim()}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Submitting...
                  </>
                ) : (
                  'Submit Request'
                )}
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-header bg-info text-white">
              <h3 className="mb-0">My Requests</h3>
            </div>
            <div className="card-body">
              {requests.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted mb-0">No maintenance requests yet.</p>
                  <small className="text-muted">Submit your first request above!</small>
                </div>
              ) : (
                <div className="list-group list-group-flush">
                  {requests.map((r) => (
                    <div key={r.id} className="list-group-item border-0 border-bottom">
                      <div className="d-flex justify-content-between align-items-start">
                        <div className="flex-grow-1">
                          <div className="d-flex align-items-center mb-2">
                            <h6 className="mb-0 text-capitalize me-2">{r.issue}</h6>
                            <span className={`badge ${
                              r.status === 'open' ? 'bg-warning text-dark' : 
                              r.status === 'in-progress' ? 'bg-info' : 'bg-success'
                            }`}>
                              {r.status}
                            </span>
                          </div>
                          <p className="mb-1 text-muted">{r.description}</p>
                          <small className="text-muted">
                            Submitted: {new Date(r.createdAt).toLocaleDateString()}
                          </small>
                        </div>
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