import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const Welcome = () => {
  const {user, logout} = useAuth();
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-50 to-blue-100">
      <header className="flex justify-between items-center m-8 p-4 rounded-[50px] bg-white shadow-md">
        <h1 className="text-3xl font-bold text-blue-700">Track It Back</h1>
        <div className="space-x-4">

          {user && (<button onClick={() => logout()} className="text-blue-700 hover:text-blue-400">Logout</button>)}
          {!user && (
            <>
            <Link to="/login" className="text-blue-700 hover:text-blue-400">Login</Link>
            <Link to="/register" className="text-blue-700 hover:text-blue-400">Sign Up</Link>
            </>
            )}
          <Link to="/chat" className="text-blue-700 hover:text-blue-400">Chat</Link>
          <Link to="/notifications" className="text-blue-700 hover:text-blue-400">Notifications</Link>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center flex-grow text-center px-6">
        <h2 className="text-4xl font-extrabold text-blue-800 mb-4">Welcome to Track It Back Platform</h2>
        <p className="text-lg text-gray-600 max-w-2xl">
          Our platform helps you report, find, and recover lost or found items efficiently. Register or Login to get started.
        </p>

        <div className="mt-8 space-x-4">
          <Link to="/dashboard" className="bg-blue-600 text-white px-6 py-2 rounded-full shadow hover:bg-blue-700">Go to Dashboard</Link>
        </div>
      </main>

      <footer className="p-6 shadow-inner text-center">
        <p className="text-gray-500">&copy; 2025 Track It Back. All rights reserved.</p>
        <div className="mt-2">
          <span className="text-sm text-gray-400">Share | Rate Us | About Us</span>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
