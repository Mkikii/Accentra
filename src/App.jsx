import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import TenantDashboard from "./pages/TenantDashboard";
import LandlordDashboard from "./pages/LandlordDashboard";
import FeedbackForm from "./pages/FeedbackForm";
import MaintenanceForm from "./pages/MaintenanceForm";

function App() {
  return (
    <div className="min-vh-100">
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/tenant"
              element={
                <ProtectedRoute>
                  <TenantDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/landlord"
              element={
                <ProtectedRoute>
                  <LandlordDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/maintenance"
              element={
                <ProtectedRoute>
                  <MaintenanceForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/feedback"
              element={
                <ProtectedRoute>
                  <FeedbackForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/unauthorized"
              element={
                <div className="container py-5 text-center">
                  <h2>Unauthorized Access</h2>
                  <p>You do not have permission to view this page.</p>
                  <Link to="/" className="btn btn-primary">
                    Go to Login
                  </Link>
                </div>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;