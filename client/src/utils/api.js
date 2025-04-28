import axios from 'axios';

// Optional: Token utility (recommended for scalability)
const getToken = () => {
  return localStorage.getItem('token');
};

const api = axios.create({
  baseURL: 'https://lost-found-9yoj.onrender.com', // Update this if backend port changes http://localhost:5000
});

// Add JWT token to Authorization header for all requests
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
