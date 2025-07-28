import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

function FeedbackForm() {
  const [feedbacks, setFeedbacks] = useState([])
  const [feedbackMsg, setFeedbackMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const { currentUser } = useAuth()

  // Fetch feedbacks from API
  useEffect(() => {
    fetchFeedbacks()
  }, [currentUser])

  const fetchFeedbacks = async () => {
    try {
      setFetchLoading(true)
      const response = await axios.get('http://localhost:4000/api/feedback')
      
      // Filter feedbacks based on user role
      let filteredFeedbacks = response.data
      if (currentUser?.role === 'tenant') {
        filteredFeedbacks = response.data.filter(feedback => feedback.tenant_id === currentUser.id)
      }
      
      setFeedbacks(filteredFeedbacks)
      setError('')
    } catch (error) {
      console.error('Error fetching feedbacks:', error)
      setError('Failed to load previous feedbacks')
    } finally {
      setFetchLoading(false)
    }
  }

  const handleFeedbackSubmit = async () => {
    if (!feedbackMsg.trim()) {
      setError('Feedback message is required')
      return
    }

    setLoading(true)
    setError('')
    setSuccess(false)
    
    try {
      const response = await axios.post('http://localhost:4000/api/feedback', {
        tenant_id: currentUser.id,
        message: feedbackMsg.trim()
      })

      if (response.status === 201) {
        const newFeedback = response.data
        
        // Add the new feedback to the beginning of the list
        setFeedbacks(prevFeedbacks => [newFeedback, ...prevFeedbacks])
        
        setFeedbackMsg('')
        setSuccess(true)
        
        // Hide success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000)
      }
    } catch (error) {
      console.error('Error submitting feedback:', error)
      setError(error.response?.data?.message || 'Failed to submit feedback')
    } finally {
      setLoading(false)
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

  if (fetchLoading) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading feedback history...</p>
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
            <h1>💬 Send Feedback</h1>
            <Link to="/tenant" className="btn btn-outline-secondary">
              ← Back to Dashboard
            </Link>
          </div>

          {/* Success Message */}
          {success && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              <i className="fas fa-check-circle me-2"></i>
              <strong>Thank you!</strong> Your feedback has been submitted successfully.
              <button type="button" className="btn-close" onClick={() => setSuccess(false)}></button>
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

          {/* Feedback Form - Only show for tenants */}
          {currentUser?.role === 'tenant' && (
            <div className="card shadow mb-4">
              <div className="card-header bg-primary text-white text-center">
                <h3 className="mb-0">We'd love to hear from you! 💬</h3>
              </div>
              <div className="card-body p-4">
                <div className="mb-4">
                  <label htmlFor="feedback" className="form-label fw-semibold">
                    Your Feedback <span className="text-danger">*</span>
                  </label>
                  <textarea
                    id="feedback"
                    className="form-control"
                    rows="6"
                    placeholder="Share your thoughts, suggestions, or concerns..."
                    value={feedbackMsg}
                    onChange={(e) => setFeedbackMsg(e.target.value)}
                    maxLength={1000}
                    required
                  />
                  <div className="form-text">
                    {feedbackMsg.length}/1000 characters
                  </div>
                </div>

                <button 
                  className="btn btn-primary btn-lg w-100" 
                  onClick={handleFeedbackSubmit}
                  disabled={loading || !feedbackMsg.trim()}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      📤 Send Feedback
                    </>
                  )}
                </button>
                
                {!feedbackMsg.trim() && (
                  <small className="text-muted d-block text-center mt-2">
                    Please enter your feedback to submit
                  </small>
                )}
              </div>
            </div>
          )}

          {/* Feedback History */}
          <div className="card">
            <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
              <h3 className="mb-0">
                <i className="fas fa-history me-2"></i>
                {currentUser?.role === 'landlord' ? 'All Feedback' : 'My Feedback History'}
              </h3>
              <span className="badge bg-white text-info">
                {feedbacks.length} {feedbacks.length === 1 ? 'Feedback' : 'Feedbacks'}
              </span>
            </div>
            <div className="card-body">
              {feedbacks.length === 0 ? (
                <div className="text-center py-5">
                  <div className="mb-3">
                    <i className="fas fa-comments fa-4x text-muted"></i>
                  </div>
                  <h5 className="text-muted mb-2">No feedback submitted yet</h5>
                  <p className="text-muted">
                    {currentUser?.role === 'landlord' 
                      ? 'No feedback has been submitted by tenants yet.' 
                      : 'Submit your first feedback above to get started!'
                    }
                  </p>
                </div>
              ) : (
                <div className="list-group list-group-flush">
                  {feedbacks.map((feedback) => (
                    <div key={feedback.id} className="list-group-item border">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div className="flex-grow-1">
                          <div className="d-flex align-items-center mb-2">
                            <h6 className="mb-0 me-2">
                              <i className="fas fa-comment-dots me-1 text-primary"></i>
                              Feedback #{feedback.id}
                              {currentUser?.role === 'landlord' && (
                                <small className="text-muted ms-2">
                                  - Tenant ID: {feedback.tenant_id}
                                </small>
                              )}
                            </h6>
                          </div>
                          <div className="bg-light p-3 rounded mb-2">
                            <p className="mb-0 text-dark">{feedback.message}</p>
                          </div>
                          <small className="text-muted">
                            <i className="fas fa-calendar-alt me-1"></i>
                            Submitted: {formatDate(feedback.created_at)}
                          </small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Help Text */}
          <div className="text-center mt-4">
            <small className="text-muted">
              <i className="fas fa-heart me-1 text-danger"></i>
              Your feedback helps us improve our services. Thank you for taking the time to share your thoughts!
            </small>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedbackForm