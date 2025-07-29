import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../api";

function LandlordDashboard() {
  const [requests, setRequests] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get(`${API_URL}/maintenanceRequests`),
      axios.get(`${API_URL}/feedback`),
    ])
      .then(([reqRes, fbRes]) => {
        setRequests(reqRes.data);
        setFeedback(fbRes.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const updateRequestStatus = async (id, status) => {
    try {
      await axios.patch(`${API_URL}/maintenanceRequests/${id}`, { status });
      const res = await axios.get(`${API_URL}/maintenanceRequests`);
      setRequests(res.data);
    } catch {}
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="ml-3 text-gray-600">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Landlord Dashboard</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Maintenance Requests</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {requests.length} total
                </span>
              </div>
              <div className="p-6">
                {requests.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No maintenance requests yet.</p>
                ) : (
                  <div className="space-y-4">
                    {requests.map((r) => (
                      <div key={r.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <h6 className="font-medium text-gray-900">Request #{r.id}</h6>
                          <small className="text-gray-500">{formatDate(r.createdAt)}</small>
                        </div>
                        <div className="mb-3">
                          <p className="mb-2">
                            <strong className="text-gray-700">Issue:</strong>{" "}
                            <span className="capitalize text-gray-900">{r.issue}</span>
                          </p>
                          <p className="mb-3">
                            <strong className="text-gray-700">Description:</strong>{" "}
                            <span className="text-gray-900">{r.description}</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              r.status === "open"
                                ? "bg-yellow-100 text-yellow-800"
                                : r.status === "in-progress"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {r.status}
                          </span>
                          {r.status !== "completed" && (
                            <div className="flex gap-2">
                              {r.status === "open" && (
                                <button
                                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded"
                                  onClick={() => updateRequestStatus(r.id, "in-progress")}
                                >
                                  Start Work
                                </button>
                              )}
                              {r.status === "in-progress" && (
                                <button
                                  className="px-3 py-1 text-sm bg-green-600 text-white rounded"
                                  onClick={() => updateRequestStatus(r.id, "completed")}
                                >
                                  Mark Complete
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Tenant Feedback</h3>
              </div>
              <div className="p-6">
                {feedback.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No feedback yet.</p>
                ) : (
                  <div className="space-y-4">
                    {feedback.map((fb) => (
                      <div key={fb.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                        <div className="flex-1">
                          <h6 className="font-medium text-gray-900 mb-1">{fb.name}</h6>
                          <p className="text-gray-700 text-sm mb-2">{fb.message}</p>
                          <small className="text-gray-500">{formatDate(fb.createdAt)}</small>
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
    </div>
  );
}

export default LandlordDashboard;