import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../api";

function FeedbackForm() {
  const [feedbackName, setFeedbackName] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/feedback`)
      .then((res) => setFeedbackList(res.data))
      .catch(() => setFeedbackList([]));
  }, []);

  const handleFeedbackSubmit = async () => {
    if (!feedbackName.trim() || !feedbackMsg.trim()) return;
    setLoading(true);
    try {
      const newFeedback = {
        name: feedbackName,
        message: feedbackMsg,
        createdAt: new Date().toISOString(),
      };
      await axios.post(`${API_URL}/feedback`, newFeedback);
      const res = await axios.get(`${API_URL}/feedback`);
      setFeedbackList(res.data);
      setFeedbackName("");
      setFeedbackMsg("");
      setSuccess(true);
      setLoading(false);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setLoading(false);
      alert("Error sending feedback");
    }
  };

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
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              <strong>Thank you!</strong> Your feedback has been submitted successfully.
              <button type="button" className="btn-close" onClick={() => setSuccess(false)}></button>
            </div>
          )}
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h3 className="mb-0">We'd love to hear from you!</h3>
            </div>
            <div className="card-body p-4">
              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-semibold">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter your name"
                  value={feedbackName}
                  onChange={(e) => setFeedbackName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="feedback" className="form-label fw-semibold">
                  Your Feedback
                </label>
                <textarea
                  id="feedback"
                  className="form-control"
                  rows="6"
                  placeholder="Share your thoughts, suggestions or concerns..."
                  value={feedbackMsg}
                  onChange={(e) => setFeedbackMsg(e.target.value)}
                />
                <div className="form-text">{feedbackMsg.length}/500 characters</div>
              </div>
              <button
                className="btn btn-primary btn-lg w-100"
                onClick={handleFeedbackSubmit}
                disabled={loading || !feedbackName.trim() || !feedbackMsg.trim()}
              >
                {loading ? "Sending..." : "Send Feedback"}
              </button>
              {(!feedbackName.trim() || !feedbackMsg.trim()) && (
                <small className="text-muted d-block text-center mt-2">
                  Please fill in both fields to submit your feedback
                </small>
              )}
            </div>
          </div>
          <div className="text-center mt-4">
            <small className="text-muted">
              Your feedback helps us improve our services. Thank you for taking the time to share your thoughts!
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedbackForm;