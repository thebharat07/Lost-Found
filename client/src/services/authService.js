import api from '../utils/api';
// services/authService.js
export const loginUser = async (credentials) => {
  const response = await api.post('/api/auth/login', credentials);
  return response.data; // ✅ return only the actual data, not full response
};


export const registerUser = async (userData) => {
  return await api.post('/api/auth/register', userData);
};

export const logoutUser = async () => {
  return await api.post('/api/auth/logout');
};

export const getUser = async () => {
  return await api.get('/api/auth/user');
};
