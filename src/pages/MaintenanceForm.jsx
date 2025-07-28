import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

function MaintenanceForm() {
  const [requests, setRequests] = useState([])
  const [issue, setIssue] = useState('plumbing')
  const [desc, setDesc] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const { currentUser } = useAuth()

  // Fetch maintenance requests from API
  useEffect(() => {
    fetchMaintenanceRequests()
  }, [currentUser])

  const fetchMaintenanceRequests = async () => {
    try {
      setFetchLoading(true)
      const response = await axios.get('http://localhost:4000/api/maintenance')
      
      // Filter requests based on user role
      let filteredRequests = response.data
      if (currentUser?.role === 'tenant') {
        filteredRequests = response.data.filter(req => req.tenant_id === currentUser.id)
      }
      
      setRequests(filteredRequests)
      setError('')
    } catch (error) {
      console.error('Error fetching maintenance requests:', error)
      setError('Failed to load maintenance requests')
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
      const response = await axios.post('http://localhost:4000/api/maintenance', {
        tenant_id: currentUser.id,
        description: desc.trim()
      })

      if (response.status === 201) {
        const newRequest = response.data
        
        // Add the new request to the beginning of the list
        setRequests(prevRequests => [newRequest, ...prevRequests])
        
        setDesc('')
        setSuccessMessage('Request submitted successfully!')
        
        // Clear success message after 5 seconds
        setTimeout(() => setSuccessMessage(''), 5000)
      }
    } catch (error) {
      console.error('Error submitting maintenance request:', error)
      setError(error.response?.data?.message || 'Failed to submit maintenance request')
    } finally {
      setLoading(false)
    }
  }

  const updateRequestStatus = async (requestId, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:4000/api/maintenance/${requestId}`, {
        status: newStatus
      })

      if (response.status === 200) {
        // Update the local state
        setRequests(prevRequests =>
          prevRequests.map(request =>
            request.id === requestId ? { ...request, status: newStatus } : request
          )
        )
      }
    } catch (error) {
      console.error('Error updating request status:', error)
      setError('Failed to update request status')
    }
  }

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-warning text-dark'
      case 'in progress':
        return 'bg-info text-white'
      case 'completed':
        return 'bg-success text-white'
      case 'cancelled':
        return 'bg-danger text-white'
      case 'open':
        return 'bg-warning text-dark'
      case 'in-progress':
        return 'bg-info text-white'
      default:
        return 'bg-secondary text-white'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getIssueIcon = (issueType) => {
    const icons = {
      'plumbing': '🔧',
      'electrical': '⚡',
      'heating': '🌡️',
      'appliance': '🏠',
      'other': '🔨'
    }
    return icons[issueType] || '🔨'
  }

  if (fetchLoading) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading maintenance requests...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>🔧 Maintenance Request</h1>
            <Link to="/tenant" className="btn btn-outline-secondary">
              ← Back to Dashboard
            </Link>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              <i className="fas fa-check-circle me-2"></i>
              {successMessage}
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setSuccessMessage('')}
                aria-label="Close"
              ></button>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              <i className="fas fa-exclamation-triangle me-2"></i>
              {error}
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setError('')}
                aria-label="Close"
              ></button>
            </div>
          )}

          {/* Submit New Request Form - Only show for tenants */}
          {currentUser?.role === 'tenant' && (
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
                  <label className="form-label fw-semibold">
                    Description <span className="text-danger">*</span>
                  </label>
                  <textarea 
                    className="form-control" 
                    rows="4"
                    value={desc} 
                    onChange={(e) => setDesc(e.target.value)} 
                    placeholder="Please describe the issue in detail..."
                    required
                  />
                  <div className="form-text">
                    Be as specific as possible to help us resolve your issue quickly.
                  </div>
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
          )}

          {/* Requests List */}
          <div className="card">
            <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
              <h3 className="mb-0">
                {currentUser?.role === 'landlord' ? 'All Maintenance Requests' : 'My Requests'}
              </h3>
              <span className="badge bg-white text-info">
                {requests.length} {requests.length === 1 ? 'Request' : 'Requests'}
              </span>
            </div>
            <div className="card-body">
              {requests.length === 0 ? (
                <div className="text-center py-4">
                  <div className="mb-3">
                    <i className="fas fa-tools fa-3x text-muted"></i>
                  </div>
                  <h5 className="text-muted mb-2">No maintenance requests found</h5>
                  <p className="text-muted">
                    {currentUser?.role === 'landlord' 
                      ? 'No requests have been submitted by tenants yet.' 
                      : 'Submit your first request above!'
                    }
                  </p>
                </div>
              ) : (
                <div className="list-group list-group-flush">
                  {requests.map((request) => (
                    <div key={request.id} className="list-group-item border-0 border-bottom">
                      <div className="d-flex justify-content-between align-items-start">
                        <div className="flex-grow-1">
                          <div className="d-flex align-items-center mb-2">
                            <h6 className="mb-0 me-2">
                              Request #{request.id}
                              {currentUser?.role === 'landlord' && (
                                <small className="text-muted ms-2">
                                  - Tenant ID: {request.tenant_id}
                                </small>
                              )}
                            </h6>
                            <span className={`badge ${getStatusBadgeClass(request.status)}`}>
                              {request.status || 'Pending'}
                            </span>
                          </div>
                          <p className="mb-1 text-muted">{request.description}</p>
                          <small className="text-muted">
                            Submitted: {formatDate(request.created_at)}
                          </small>
                        </div>
                      </div>

                      {/* Status Update Controls for Landlord */}
                      {currentUser?.role === 'landlord' && (
                        <div className="mt-3 pt-3 border-top">
                          <small className="text-muted d-block mb-2">Update Status:</small>
                          <div className="btn-group btn-group-sm" role="group">
                            <button
                              type="button"
                              className={`btn ${request.status === 'Pending' ? 'btn-warning' : 'btn-outline-warning'}`}
                              onClick={() => updateRequestStatus(request.id, 'Pending')}
                              disabled={request.status === 'Pending'}
                            >
                              Pending
                            </button>
                            <button
                              type="button"
                              className={`btn ${request.status === 'In Progress' ? 'btn-info' : 'btn-outline-info'}`}
                              onClick={() => updateRequestStatus(request.id, 'In Progress')}
                              disabled={request.status === 'In Progress'}
                            >
                              In Progress
                            </button>
                            <button
                              type="button"
                              className={`btn ${request.status === 'Completed' ? 'btn-success' : 'btn-outline-success'}`}
                              onClick={() => updateRequestStatus(request.id, 'Completed')}
                              disabled={request.status === 'Completed'}
                            >
                              Completed
                            </button>
                          </div>
                        </div>
                      )}
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