
import { Link } from 'react-router-dom'

export default function TenantDashboard() {
  return (
    <div className="container py-5">
      <h1 className="mb-4">Tenant Dashboard</h1>
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title">Submit Maintenance Request</h5>
              <p className="card-text">Let us know if something needs fixing in your unit.</p>
              <Link to="/maintenance" className="btn btn-primary mt-auto">Go</Link>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title">Send Feedback</h5>
              <p className="card-text">Give us your thoughts on your experience.</p>
              <Link to="/feedback" className="btn btn-secondary mt-auto">Send Feedback</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
