import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SearchItems from './pages/SearchItems';
import LostItem from './pages/LostItem';
import FoundItem from './pages/FoundItem';
import Notifications from './pages/Notifications';
import Chat from './pages/Chat';
import ProtectedRoute from './components/ProtectedRoute';

import './index.css';
import Welcome2 from './pages/Welcome2';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome2 />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <SearchItems />
          </ProtectedRoute>
        }
      />
      <Route
        path="/lost"
        element={
          <ProtectedRoute>
            <LostItem />
          </ProtectedRoute>
        }
      />
      <Route
        path="/found"
        element={
          <ProtectedRoute>
            <FoundItem />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
