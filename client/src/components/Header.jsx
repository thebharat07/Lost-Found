import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-primary text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          Lost & Found
        </Link>

        <nav className="flex items-center space-x-6 text-sm font-medium">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <Link to="/search" className="hover:underline">
                Search
              </Link>
              <Link to="/lost" className="hover:underline">
                Report Lost
              </Link>
              <Link to="/found" className="hover:underline">
                Report Found
              </Link>
              <Link to="/notifications" className="hover:underline relative">
                Notifications
              </Link>
              <Link to="/chat" className="hover:underline">
                Chat
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white text-primary px-3 py-1 rounded hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
