import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 bg-light min-h-screen ml-0 lg:ml-64">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-dark">Welcome, {user?.name || 'User'}!</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Here’s your dashboard. Use the menu to navigate.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Dashboard Cards */}
          <div className="p-4 sm:p-6 bg-white shadow-md rounded-2xl hover:shadow-lg transition duration-300">
            <h2 className="text-lg sm:text-xl font-semibold text-primary mb-2">Search Lost Items</h2>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              Look through items posted by others that you may have lost.
            </p>
            <button
              className="w-full sm:w-auto px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary"
              onClick={() => navigate('/search')}
            >
              Go to Search
            </button>
          </div>

          <div className="p-4 sm:p-6 bg-white shadow-md rounded-2xl hover:shadow-lg transition duration-300">
            <h2 className="text-lg sm:text-xl font-semibold text-primary mb-2">Post Lost/Found Item</h2>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              Report a lost item or notify others of a found item.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="px-4 py-2 bg-success text-white rounded-md hover:bg-green-700"
                onClick={() => navigate('/lost')}
              >
                Lost Item
              </button>
              <button
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                onClick={() => navigate('/found')}
              >
                Found Item
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6 bg-white shadow-md rounded-2xl hover:shadow-lg transition duration-300">
            <h2 className="text-lg sm:text-xl font-semibold text-primary mb-2">Notifications</h2>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              Check alerts about items that may belong to you.
            </p>
            <button
              className="w-full sm:w-auto px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
              onClick={() => navigate('/notifications')}
            >
              View Notifications
            </button>
          </div>

          <div className="p-4 sm:p-6 bg-white shadow-md rounded-2xl hover:shadow-lg transition duration-300">
            <h2 className="text-lg sm:text-xl font-semibold text-primary mb-2">Chat</h2>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              Chat with users who found or lost items.
            </p>
            <button
              className="w-full sm:w-auto px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
              onClick={() => navigate('/chat')}
            >
              Open Chat
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
