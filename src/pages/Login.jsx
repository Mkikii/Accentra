import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [role, setRole] = useState('tenant');
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem('role', role);
    navigate(`/${role}`);
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: "url('/login-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="row w-100 justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white text-center py-4">
              <h2 className="mb-0">ACCENTRA</h2>
              <br />
              <p className="mb-0 opacity-75">Property Management System</p>
            </div>
            <div className="card-body p-5">
              <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                <div className="mb-4">
                  <label htmlFor="role" className="form-label fw-semibold">
                    Select Your Role
                  </label>
                  <select
                    id="role"
                    className="form-select form-select-lg"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="tenant">🏠 Tenant</option>
                    <option value="landlord">🏢 Landlord</option>
                  </select>
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg py-3"
                  >
                    Login as {role === 'tenant' ? 'Tenant' : 'Landlord'}
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer text-center py-3 bg-light">
              <small className="text-muted">
                Select your role and click login to continue
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
