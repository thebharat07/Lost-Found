// AuthContext.jsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, removeToken, saveToken } from '../utils/tokenUtils';
import { loginUser } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setTokenState] = useState(null);
  const [loading, setLoading] = useState(true); // 🟡 Track if auth is loading
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserRaw = localStorage.getItem('user');
    const storedToken = getToken();

    if (storedUserRaw && storedToken) {
      try {
        const storedUser = JSON.parse(storedUserRaw);
        setUser(storedUser);
        setTokenState(storedToken);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        localStorage.removeItem('user');
        removeToken();
      }
    }

    setLoading(false); // ✅ Done checking
  }, []);

  const login = async (email, password) => {
    try {
      const { user, token } = await loginUser({ email, password });
      setUser(user);
      setTokenState(token);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(user));
      saveToken(token);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setTokenState(null);
    localStorage.removeItem('user');
    removeToken();
    navigate('/login');
  };

  if (loading) {
    return <div className="text-center mt-10 text-gray-600">Loading authentication...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
