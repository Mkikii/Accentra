import axios from 'axios';

// Use environment variable or fallback to localhost
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User Authentication
export const loginUser = async ({ email, password, role }) => {
  const response = await api.get('/users');
  const users = response.data;
  
  const user = users.find(u => 
    u.email === email && 
    u.password === password && 
    u.role === role
  );

  if (!user) {
    throw new Error('Invalid credentials');
  }

  return user;
};

export const signUpUser = async (userData) => {
  return await api.post('/users', userData);
};

// Maintenance Requests
export const fetchMaintenanceRequests = async (tenantId = null) => {
  const url = tenantId ? `/maintenanceRequests?tenantId=${tenantId}` : '/maintenanceRequests';
  return await api.get(url);
};

export const submitMaintenanceRequest = async (requestData) => {
  return await api.post('/maintenanceRequests', requestData);
};

export const updateMaintenanceRequest = async (id, updateData) => {
  return await api.patch(`/maintenanceRequests/${id}`, updateData);
};

// Feedback
export const fetchFeedback = async () => {
  return await api.get('/feedback');
};

export const submitFeedback = async (feedbackData) => {
  return await api.post('/feedback', feedbackData);
};

// Properties
export const fetchProperties = async () => {
  return await api.get('/properties');
};

export const createProperty = async (propertyData) => {
  return await api.post('/properties', propertyData);
};

// Users
export const fetchUsers = async () => {
  return await api.get('/users');
};

export default api;