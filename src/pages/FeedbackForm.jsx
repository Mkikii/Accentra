import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL;

function FeedbackForm() {
  const [feedbackName, setFeedbackName] = useState('')
  const [feedbackMsg, setFeedbackMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleFeedbackSubmit = async () => {
    if (!feedbackName.trim() || !feedbackMsg.trim()) {
      return;
    }
    setLoading(true)
    try {
      await axios.post(`${API_BASE_URL}/feedback`, {
        name: feedbackName,
        message: feedbackMsg,
        createdAt: new Date().toISOString()
      })
      setFeedbackName('')
      setFeedbackMsg('')
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error('Error submitting feedback:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>Send Feedback</h1>
            <Link to="/tenant" className="btn btn-outline-secondary">
              ← Back to Dashboard
            </Link>
          </div>
          {success && (
            <div className="alert alert-success" role="alert">
              Thank you! Your feedback has been submitted successfully.
            </div>
          )}
          <div className="card">
            <div className="card-header">
              <h3>We'd love to hear from you!</h3>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Your Name</label>
                <input
                  id="name"
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                  value={feedbackName}
                  onChange={(e) => setFeedbackName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="feedback" className="form-label">Your Feedback</label>
                <textarea
                  id="feedback"
                  className="form-control"
                  rows="5"
                  placeholder="Share your thoughts, suggestions, or concerns..."
                  value={feedbackMsg}
                  onChange={(e) => setFeedbackMsg(e.target.value)}
                />
              </div>
              <button
                className="btn btn-primary w-100"
                onClick={handleFeedbackSubmit}
                disabled={loading || !feedbackName.trim() || !feedbackMsg.trim()}
              >
                {loading ? 'Sending...' : 'Send Feedback'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedbackForm;
