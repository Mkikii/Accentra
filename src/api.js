// src/api/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const fetchFeedback = () => axios.get(`${BASE_URL}/feedback`);
export const submitFeedback = (data) => axios.post(`${BASE_URL}/feedback`, data);
export const fetchRequests = () => axios.get(`${BASE_URL}/maintenanceRequests`);
export const submitRequest = (data) => axios.post(`${BASE_URL}/maintenanceRequests`, data);
