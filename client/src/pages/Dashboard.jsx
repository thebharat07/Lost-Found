import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="ml-64 flex-1 p-6 bg-light min-h-screen">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-dark">Welcome, {user?.name || 'User'}!</h1>
          <p className="text-gray-600 mt-1">Here’s your dashboard. Use the menu to navigate.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dashboard Cards */}
          <div className="p-6 bg-white shadow-md rounded-2xl hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold text-primary mb-2">Search Lost Items</h2>
            <p className="text-gray-600 mb-4">Look through items posted by others that you may have lost.</p>
            <button
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary"
              onClick={() => navigate('/search')}
            >
              Go to Search
            </button>
          </div>

          <div className="p-6 bg-white shadow-md rounded-2xl hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold text-primary mb-2">Post Lost/Found Item</h2>
            <p className="text-gray-600 mb-4">Report a lost item or notify others of a found item.</p>
            <div className="space-x-3">
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

          <div className="p-6 bg-white shadow-md rounded-2xl hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold text-primary mb-2">Notifications</h2>
            <p className="text-gray-600 mb-4">Check alerts about items that may belong to you.</p>
            <button
              className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
              onClick={() => navigate('/notifications')}
            >
              View Notifications
            </button>
          </div>

          <div className="p-6 bg-white shadow-md rounded-2xl hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold text-primary mb-2">Chat</h2>
            <p className="text-gray-600 mb-4">Chat with users who found or lost items.</p>
            <button
              className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
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
