import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL;

function LandlordDashboard() {
  const [requests, setRequests] = useState([])
  const [feedback, setFeedback] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reqRes, fbRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/maintenanceRequests`),
          axios.get(`${API_BASE_URL}/feedback`)
        ])
        setRequests(reqRes.data)
        setFeedback(fbRes.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const updateRequestStatus = async (id, status) => {
    try {
      await axios.patch(`${API_BASE_URL}/maintenanceRequests/${id}`, { status })
      setRequests(requests.map(req =>
        req.id === id ? { ...req, status } : req
      ))
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Landlord Dashboard</h1>
        <Link to="/" className="btn btn-outline-danger">
          Logout
        </Link>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h3>Maintenance Requests</h3>
              <span className="badge bg-primary">{requests.length} total</span>
            </div>
            <div className="card-body">
              {requests.length === 0 ? (
                <p className="text-muted">No maintenance requests yet.</p>
              ) : (
                <div className="list-group list-group-flush">
                  {requests.map((r) => (
                    <div key={r.id} className="list-group-item">
                      <div className="d-flex justify-content-between align-items-start">
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between">
                            <h6 className="mb-1">Request #{r.id}</h6>
                            <small className="text-muted">{new Date(r.createdAt).toLocaleDateString()}</small>
                          </div>
                          <p className="mb-1"><strong>Issue:</strong> <span className="text-capitalize">{r.issue}</span></p>
                          <p className="mb-2"><strong>Description:</strong> {r.description}</p>

                          <div className="d-flex align-items-center gap-2">
                            <span className={`badge ${
                              r.status === 'open' ? 'bg-warning' :
                              r.status === 'in-progress' ? 'bg-info' :
                              'bg-success'
                            }`}>
                              {r.status}
                            </span>

                            {r.status !== 'completed' && (
                              <div className="btn-group btn-group-sm">
                                {r.status === 'open' && (
                                  <button
                                    className="btn btn-outline-info btn-sm"
                                    onClick={() => updateRequestStatus(r.id, 'in-progress')}
                                  >
                                    Start Work
                                  </button>
                                )}
                                {r.status === 'in-progress' && (
                                  <button
                                    className="btn btn-outline-success btn-sm"
                                    onClick={() => updateRequestStatus(r.id, 'completed')}
                                  >
                                    Mark Complete
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h3>Tenant Feedback</h3>
            </div>
            <div className="card-body">
              {feedback.length === 0 ? (
                <p className="text-muted">No feedback yet.</p>
              ) : (
                <div className="list-group list-group-flush">
                  {feedback.map((fb) => (
                    <div key={fb.id} className="list-group-item border-0 px-0">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="mb-1">{fb.name}</h6>
                          <p className="mb-1">{fb.message}</p>
                          <small className="text-muted">{new Date(fb.createdAt).toLocaleDateString()}</small>
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

export default LandlordDashboard;
