import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Outlet, NavLink, Link, Navigate } from 'react-router-dom';

// AuthContext and AuthProvider
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const usersURL = "http://localhost:3001/users";

  useEffect(() => {
    const checkAuth = async () => {
      setLoadingAuth(true);
      const storedUser = localStorage.getItem('currentUser');
      const storedProfile = localStorage.getItem('profile');

      if (storedUser && storedProfile) {
        setCurrentUser(JSON.parse(storedUser));
        setProfile(JSON.parse(storedProfile));
      }
      setLoadingAuth(false);
    };
    checkAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch(usersURL);
      const users = await response.json();
      const user = users.find(u => u.username === username && u.password === password);

      if (user) {
        setCurrentUser(user);
        setProfile(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('profile', JSON.stringify(user));
        return true;
      } else {
        console.error('Login failed: Invalid username or password.');
        return false;
      }
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setProfile(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('profile');
  };

  return (
    <AuthContext.Provider value={{ currentUser, profile, login, logout, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth Hook
const useAuth = () => useContext(AuthContext);

// ProtectedRoute Component
const ProtectedRoute = ({ allowedRoles }) => {
  const { currentUser, profile, loadingAuth } = useAuth();
  // const navigate = useNavigate(); // Removed as Navigate component handles redirection

  if (loadingAuth) {
    return (
      <div className="app-loading-screen">
        <div className="spinner"></div>
        <p>Initializing application...</p>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && (!profile || !allowedRoles.includes(profile.role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

// Header Component
const Header = () => {
  const { currentUser, profile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="app-title">Accentra Property Management</h1>
        {currentUser && profile ? (
          <div className="user-controls">
            <span className="user-display">
              Welcome, {profile.name || profile.username}! ({profile.role})
            </span>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        ) : (
          <span className="user-display">Not Logged In</span>
        )}
      </div>
    </header>
  );
};

// Navigation Component
const Navigation = () => {
  const { profile } = useAuth();

  return (
    <nav className="app-nav">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink to="/" end>Home</NavLink>
        </li>
        {profile?.role === 'tenant' && (
          <li className="nav-item">
            <NavLink to="/maintenance">Maintenance Form</NavLink>
          </li>
        )}
        {profile?.role === 'landlord' && (
          <>
            <li className="nav-item">
              <NavLink to="/landlord-home">Tenants & Maintenance</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="app-footer">
      <p>&copy; {new Date().getFullYear()} Accentra Inc. All rights reserved.</p>
    </footer>
  );
};

// LoginPage Component
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const { login, currentUser, loadingAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loadingAuth && currentUser) {
      navigate('/');
    }
  }, [currentUser, loadingAuth, navigate]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    const success = await login(username, password);
    if (!success) {
      setLoginError('Login failed. Invalid username or password.');
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <h2>Welcome to Accentra</h2>
        <p>Please log in to access the property management system.</p>
        <form onSubmit={handleLoginSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {loginError && <p className="error-message">{loginError}</p>}
          <button type="submit">Login</button>
        </form>

        <div className="mock-login-section">
          <h3>Quick Login for Development:</h3>
          <button className="quick-login-button" onClick={() => login('landlord_john', 'adminpassword')}>
            Login as Landlord
          </button>
          <button className="quick-login-button" onClick={() => login('kikii_tenant', 'password123')}>
            Login as Kikii (Tenant A101)
          </button>
          <button className="quick-login-button" onClick={() => login('najma_tenant', 'password123')}>
            Login as Najma (Tenant B202)
          </button>
        </div>
      </div>
    </div>
  );
};

// TenantHomePage Component
const TenantHomePage = () => {
  const { profile, currentUser } = useAuth();
  const [tenantDetails, setTenantDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTenantDetails = async () => {
      if (profile?.tenantId) {
        try {
          setLoading(true);
          // Fetch tenant by userId from the users array, as tenantId in db.json maps to userId in users
          const response = await fetch(`http://localhost:3001/tenants?userId=${profile.id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          if (data.length > 0) {
            setTenantDetails(data[0]);
          } else {
            setError("Tenant details not found for your user ID.");
          }
        } catch (err) {
          console.error("Error fetching tenant details:", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        setError("Tenant ID not found in profile.");
      }
    };
    fetchTenantDetails();
  }, [profile]);

  if (loading) {
    return <div className="page-container">Loading tenant details...</div>;
  }

  if (error) {
    return <div className="page-container error-message">Error: {error}</div>;
  }

  return (
    <div className="page-container">
      <h1>Your Tenant Details</h1>
      {tenantDetails ? (
        <div className="tenant-card">
          <h3>{tenantDetails.name}</h3>
          <p>Unit: {tenantDetails.unit}</p>
          <p>Phone: {tenantDetails.phone}</p>
          <p>Email: {tenantDetails.email}</p>
          <p>Access Status: {tenantDetails.hasAccess ? 'Active' : 'N/A'}</p>
        </div>
      ) : (
        <p>No tenant details available.</p>
      )}
    </div>
  );
};

// LandlordHomePage Component
const LandlordHomePage = () => {
  const [tenants, setTenants] = useState([]);
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshData, setRefreshData] = useState(false);

  const tenantsURL = "http://localhost:3001/tenants";
  const maintenanceURL = "http://localhost:3001/maintenanceRequests";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const tenantsResponse = await fetch(tenantsURL);
        if (!tenantsResponse.ok) throw new Error(`HTTP error! status: ${tenantsResponse.status} for tenants`);
        const tenantsData = await tenantsResponse.json();
        setTenants(tenantsData);

        const maintenanceResponse = await fetch(maintenanceURL);
        if (!maintenanceResponse.ok) throw new Error(`HTTP error! status: ${maintenanceResponse.status} for maintenance requests`);
        const maintenanceData = await maintenanceResponse.json();
        setMaintenanceRequests(maintenanceData);

      } catch (err) {
        console.error("Error fetching data for landlord:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [refreshData]);

  const handleToggleAccess = async (tenantId, currentAccess) => {
    try {
      const response = await fetch(`${tenantsURL}/${tenantId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hasAccess: !currentAccess }),
      });
      if (!response.ok) throw new Error('Failed to toggle access');
      setRefreshData(prev => !prev); // Trigger re-fetch
    } catch (err) {
      console.error('Error toggling access:', err);
      alert('Failed to toggle access: ' + err.message); // Use alert for user feedback
    }
  };

  const handleMaintenanceStatusChange = async (requestId, newStatus) => {
    try {
      const response = await fetch(`${maintenanceURL}/${requestId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error('Failed to update maintenance status');
      setRefreshData(prev => !prev); // Trigger re-fetch
    } catch (err) {
      console.error('Error updating maintenance status:', err);
      alert('Failed to update maintenance status: ' + err.message); // Use alert for user feedback
    }
  };

  const handleDeleteMaintenanceRequest = async (requestId) => {
    if (!window.confirm("Are you sure you want to delete this maintenance request?")) {
      return;
    }
    try {
      const response = await fetch(`${maintenanceURL}/${requestId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete maintenance request');
      setRefreshData(prev => !prev); // Trigger re-fetch
    } catch (err) {
      console.error('Error deleting maintenance request:', err);
      alert('Failed to delete maintenance request: ' + err.message); // Use alert for user feedback
    }
  };

  if (loading) {
    return <div className="page-container">Loading landlord data...</div>;
  }

  if (error) {
    return <div className="page-container error-message">Error: {error}</div>;
  }

  return (
    <div className="page-container">
      <h1>Landlord Dashboard</h1>

      <section className="section-card">
        <h2>Tenant Details</h2>
        <div className="tenant-list-grid">
          {tenants.map(tenant => (
            <div key={tenant.id} className="tenant-card">
              <h3>{tenant.name}</h3>
              <p>Unit: {tenant.unit}</p>
              <p>Phone: {tenant.phone}</p>
              <p>Email: {tenant.email}</p>
              <p>Access: {tenant.hasAccess ? 'Granted' : 'Revoked'}</p>
              <button onClick={() => handleToggleAccess(tenant.id, tenant.hasAccess)}>
                {tenant.hasAccess ? 'Revoke Access' : 'Grant Access'}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="section-card">
        <h2>Maintenance Requests</h2>
        <MaintenanceListCard
          maintenanceRequests={maintenanceRequests}
          tenants={tenants}
          onStatusChange={handleMaintenanceStatusChange}
          onDelete={handleDeleteMaintenanceRequest}
        />
      </section>
    </div>
  );
};

// MaintenanceFormPage Component
const MaintenanceFormPage = () => {
  const { profile } = useAuth();
  const [tenants, setTenants] = useState([]);
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tenantsURL = "http://localhost:3001/tenants";
  const maintenanceURL = "http://localhost:3001/maintenanceRequests";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const tenantsResponse = await fetch(tenantsURL);
        if (!tenantsResponse.ok) throw new Error(`HTTP error! status: ${tenantsResponse.status} for tenants`);
        const tenantsData = await tenantsResponse.json();
        setTenants(tenantsData);

        const maintenanceResponse = await fetch(maintenanceURL);
        if (!maintenanceResponse.ok) throw new Error(`HTTP error! status: ${maintenanceResponse.status} for maintenance requests`);
        const maintenanceData = await maintenanceResponse.json();
        setMaintenanceRequests(maintenanceData);

      } catch (err) {
        console.error("Error fetching data for maintenance form:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleNewMaintenanceRequest = async (newRequestData) => {
    const requestToSend = {
      ...newRequestData,
      dateRequested: new Date().toISOString().split('T')[0],
      status: "Pending",
    };

    try {
      const response = await fetch(maintenanceURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestToSend),
      });
      if (!response.ok) throw new Error('Failed to add maintenance request');
      const addedRequest = await response.json();
      setMaintenanceRequests(prev => [...prev, addedRequest]);
      alert("Maintenance request submitted successfully!");
    } catch (err) {
      console.error('Error submitting maintenance request:', err);
      alert("Failed to submit maintenance request: " + err.message);
    }
  };

  if (loading) {
    return <div className="page-container">Loading form data...</div>;
  }

  if (error) {
    return <div className="page-container error-message">Error: {error}</div>;
  }

  const tenantForForm = profile?.role === 'tenant'
    ? tenants.find(t => t.userId === profile.id)
    : null;

  return (
    <div className="page-container">
      <h1>Submit Maintenance Request</h1>
      {profile?.role === 'tenant' && tenantForForm ? (
        <MaintenanceForm
          tenants={[tenantForForm]}
          maintanenceFeedback={maintenanceRequests} // Renamed prop for consistency
          setMaintanenceFeedback={setMaintenanceRequests} // Renamed prop for consistency
          onSubmit={handleNewMaintenanceRequest}
          isTenant={true}
        />
      ) : profile?.role === 'landlord' ? (
        <MaintenanceForm
          tenants={tenants}
          maintanenceFeedback={maintenanceRequests} // Renamed prop for consistency
          setMaintanenceFeedback={setMaintenanceRequests} // Renamed prop for consistency
          onSubmit={handleNewMaintenanceRequest}
          isTenant={false}
        />
      ) : (
        <p className="error-message">Please log in as a tenant or landlord to submit a request.</p>
      )}
    </div>
  );
};

// UnauthorizedPage Component
const UnauthorizedPage = () => {
  return (
    <div className="page-container unauthorized-container">
      <h1>Access Denied</h1>
      <p>You do not have the necessary permissions to view this page.</p>
      <Link to="/" className="back-button">Go to Home</Link>
    </div>
  );
};

// MaintenanceForm Component (was FeedbackForm)
const MaintenanceForm = ({ maintanenceFeedback, setMaintanenceFeedback, tenants, onSubmit, isTenant }) => {
  const { profile } = useAuth();
  const [selectedTenantId, setSelectedTenantId] = useState(isTenant && tenants.length > 0 ? tenants[0].id : "");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isTenant && tenants.length > 0) {
      setSelectedTenantId(tenants[0].id);
    }
  }, [isTenant, tenants]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedTenantId || !description) {
      alert("Please select a tenant and provide a description.");
      return;
    }

    const feedbackData = {
      tenantId: parseInt(selectedTenantId),
      description,
    };

    onSubmit(feedbackData);
    setDescription("");
  };

  return (
    <div className="form-card">
      <form onSubmit={handleSubmit}>
        <h2>Maintenance Issue Form</h2>
        {!isTenant && (
          <div className="form-group">
            <label>Tenant</label>
            <select
              value={selectedTenantId}
              onChange={(e) => setSelectedTenantId(e.target.value)}
              required
            >
              <option value="">-- Select Tenant --</option>
              {tenants.map((tenant) => (
                <option key={tenant.id} value={tenant.id}>
                  {tenant.name} ({tenant.unit})
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            required
          />
        </div>
        <button type='submit'>Submit Request</button>
      </form>
    </div>
  );
};

// MaintenanceListCard Component (was FeedbackListCard)
const MaintenanceListCard = ({ maintenanceRequests, tenants, onStatusChange, onDelete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const mergedData = maintenanceRequests.map(feedback => {
    const tenant = tenants.find(t => t.id === feedback.tenantId);
    return {
      ...feedback,
      tenant: tenant || { name: "Unknown", unit: "N/A", phone: "N/A", email: "N/A" }
    };
  });

  const dataIndex = mergedData[currentIndex];

  const handleNext = () => {
    if (currentIndex < mergedData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleStatusChangeInternal = (e) => {
    if (dataIndex && onStatusChange) {
      onStatusChange(dataIndex.id, e.target.value);
    }
  };

  const handleDeleteInternal = () => {
    if (dataIndex && onDelete) {
      onDelete(dataIndex.id);
    }
  };

  useEffect(() => {
    if (currentIndex >= mergedData.length && mergedData.length > 0) {
      setCurrentIndex(mergedData.length - 1);
    } else if (mergedData.length === 0) {
      setCurrentIndex(0);
    }
  }, [mergedData.length, currentIndex]);

  return (
    <div className="maintenance-list-card-container">
      <h2>Maintenance Requests Overview</h2>
      {mergedData.length > 0 ? (
        <div className="maintenance-card-display">
          <p>Request ID: {dataIndex.id}</p>
          <p>Name: {dataIndex.tenant.name}</p>
          <p>Unit: {dataIndex.tenant.unit}</p>
          <h3>Contact:</h3>
          <p>Phone: {dataIndex.tenant.phone}</p>
          <p>Email: {dataIndex.tenant.email}</p>
          <p>Feedback: {dataIndex.description}</p>
          <p>Date Requested: {dataIndex.dateRequested}</p>
          <p>
            Status:{' '}
            <select value={dataIndex.status} onChange={handleStatusChangeInternal} className={`status-select status-${dataIndex.status?.toLowerCase()}`}>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </p>
          <div className="button-group">
            <button onClick={handlePrevious} disabled={currentIndex === 0}>Prev</button>
            <button onClick={handleNext} disabled={currentIndex === mergedData.length - 1}>Next</button>
            <button onClick={handleDeleteInternal} className="delete-button">Delete</button>
          </div>
        </div>
      ) : (
        <p>No maintenance requests available.</p>
      )}
    </div>
  );
};


// Main App Component
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Header />
          <div className="main-content">
            <Navigation />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />
              <Route element={<ProtectedRoute allowedRoles={['tenant']} />}>
                <Route path="/" element={<TenantHomePage />} />
              </Route>
              <Route element={<ProtectedRoute allowedRoles={['landlord']} />}>
                <Route path="/landlord-home" element={<LandlordHomePage />} />
              </Route>
              <Route element={<ProtectedRoute allowedRoles={['tenant', 'landlord']} />}>
                <Route path="/maintenance" element={<MaintenanceFormPage />} />
              </Route>
              <Route path="*" element={<p className="page-not-found">Page Not Found (404)</p>} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
