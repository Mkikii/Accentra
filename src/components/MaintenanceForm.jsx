import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import API_URL from '../api'

function MaintenanceForm() {
  const [requests, setRequests] = useState([])
  const [desc, setDesc] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const { currentUser } = useAuth()

  useEffect(() => {
    fetchMaintenanceRequests()
  }, [currentUser])

  const fetchMaintenanceRequests = async () => {
    try {
      const response = await fetch(`${API_URL}/maintenance`)
      const data = await response.json()
      setRequests(data.filter(req => req.tenant_id === currentUser.id))
    } catch (error) {
      console.error('Error fetching requests:', error)
      setError('Failed to fetch maintenance requests')
    } finally {
      setFetchLoading(false)
    }
  }

  const handleSubmit = async () => {
    if (!desc.trim()) {
      setError('Description is required')
      return
    }
    
    setLoading(true)
    setError('')
    setSuccessMessage('')

    try {
      const newRequest = {
        id: Date.now().toString(),
        tenant_id: currentUser.id,
        description: desc.trim(),
        status: 'pending',
        dateRequested: new Date().toISOString()
      }

      const response = await fetch(`${API_URL}/maintenance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRequest)
      })

      if (response.ok) {
        const savedRequest = await response.json()
        setRequests(prevRequests => [savedRequest, ...prevRequests])
        setDesc('')
        setSuccessMessage('Request submitted successfully!')
        setTimeout(() => setSuccessMessage(''), 5000)
      } else {
        setError('Failed to submit maintenance request')
      }
    } catch (error) {
      console.error('Error submitting maintenance request:', error)
      setError('Failed to submit maintenance request')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="custom-card">
            <div className="card-header-custom">
              <h3 className="mb-0">
                <i className="fas fa-tools me-2"></i>
                Maintenance Requests
              </h3>
            </div>
            <div className="card-body p-4">
              {error && (
                <div className="alert alert-danger alert-custom">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  {error}
                </div>
              )}
              
              {successMessage && (
                <div className="alert alert-success alert-custom">
                  <i className="fas fa-check-circle me-2"></i>
                  {successMessage}
                </div>
              )}

              <div className="mb-4">
                <label className="form-label fw-bold">
                  <i className="fas fa-edit me-2"></i>
                  Describe the maintenance issue:
                </label>
                <textarea
                  className="form-control form-control-custom"
                  rows="4"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Please describe the maintenance issue in detail..."
                />
              </div>
              
              <button 
                onClick={handleSubmit}
                className="btn btn-primary-custom btn-custom"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading-spinner me-2"></span>
                    Submitting...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane me-2"></i>
                    Submit Request
                  </>
                )}
              </button>

              <div className="mt-4">
                <h5>Your Previous Requests:</h5>
                {fetchLoading ? (
                  <div className="text-center py-3">
                    <span className="loading-spinner me-2"></span>
                    Loading requests...
                  </div>
                ) : requests.length === 0 ? (
                  <div className="alert alert-info-custom alert-custom">
                    <i className="fas fa-info-circle me-2"></i>
                    No maintenance requests yet.
                  </div>
                ) : (
                  <div className="mt-3">
                    {requests.map((request, index) => (
                      <div key={request.id} className="maintenance-card p-3 mb-3 bg-light">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h6 className="mb-1">
                              <i className="fas fa-wrench me-2 text-primary"></i>
                              Request #{index + 1}
                            </h6>
                            <p className="mb-2">{request.description}</p>
                            <small className="text-muted">
                              <i className="fas fa-calendar me-1"></i>
                              {new Date(request.dateRequested).toLocaleDateString()}
                            </small>
                          </div>
                          <span className={`badge ${request.status === 'completed' ? 'bg-success' : request.status === 'in-progress' ? 'bg-info' : 'bg-warning'}`}>
                            <i className="fas fa-clock me-1"></i>
                            {request.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4">
                <Link to="/tenant-dashboard" className="btn btn-outline-custom btn-custom">
                  <i className="fas fa-arrow-left me-2"></i>
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MaintenanceForm