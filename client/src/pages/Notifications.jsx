// src/pages/Notifications.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const Notifications = () => {
  const { token } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/notifications', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotifications(res.data);
      } catch (err) {
        console.error('Error fetching notifications:', err);
      }
    };

    fetchNotifications();
  }, [token]);

  const markAsRead = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, read: true } : notif
        )
      );
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Notifications</h1>

          <div className="p-6 bg-white shadow-md rounded-2xl hover:shadow-lg transition duration-300 mb-6">
            <h2 className="text-xl font-semibold text-primary mb-2">Chat</h2>
            <p className="text-gray-600 mb-4">Chat with users who found or lost items.</p>
            <button
              className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
              onClick={() => navigate('/chat')}
            >
              Go to Chat
            </button>
          </div>

          <ul className="space-y-4">
            {notifications.map((notif) => (
              <li
                key={notif.id}
                className={`p-4 border rounded-md shadow-sm ${
                  notif.read ? 'bg-gray-200' : 'bg-white'
                }`}
              >
                <div className="flex justify-between items-center">
                  <p className="text-gray-800">{notif.message}</p>
                  {!notif.read && (
                    <button
                      onClick={() => markAsRead(notif.id)}
                      className="ml-4 px-3 py-1 bg-primary text-white rounded hover:bg-secondary transition"
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(notif.timestamp).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Notifications;
