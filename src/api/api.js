import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const loginUser = async ({ email, password }) => {
  const res = await axios.get(`${BASE_URL}/users`, {
    params: { email, password }
  });

  if (res.data.length === 0) {
    throw new Error('Invalid credentials');
  }

  return res.data[0]; // return matched user
};

export const signUpUser = async (data) =>
  axios.post(`${BASE_URL}/users`, data);

export const fetchFeedback = () => axios.get(`${BASE_URL}/feedback`);
export const submitFeedback = (data) => axios.post(`${BASE_URL}/feedback`, data);

export const fetchRequests = () => axios.get(`${BASE_URL}/maintenanceRequests`);
export const submitRequest = (data) => axios.post(`${BASE_URL}/maintenanceRequests`, data);
