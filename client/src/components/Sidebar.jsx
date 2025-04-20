import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home, Search, PlusCircle, Bell, MessageCircle, LogOut, AlertCircle, X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { logout } = useAuth();

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
    { to: '/search', label: 'Search Items', icon: <Search className="w-5 h-5" /> },
    { to: '/lost', label: 'Report Lost', icon: <AlertCircle className="w-5 h-5" /> },
    { to: '/found', label: 'Report Found', icon: <PlusCircle className="w-5 h-5" /> },
    { to: '/notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
    { to: '/chat', label: 'Chat', icon: <MessageCircle className="w-5 h-5" /> },
  ];

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 shadow-lg p-5 hidden md:block">

      {/* Close Button for Mobile */}
      <div className="flex justify-between items-center mb-6 md:hidden">
        <h2 className="text-xl font-bold text-primary">Track It Back</h2>
        <button onClick={() => setIsOpen(false)}>
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Title for Desktop */}
      <h2 className="text-2xl font-bold text-primary mb-8 hidden md:block">Track It Back</h2>

      {/* Navigation */}
      <nav className="space-y-4">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-light'
              }`
            }
            onClick={() => setIsOpen(false)} // close sidebar after click
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}

        <button
          onClick={() => {
            logout();
            setIsOpen(false);
          }}
          className="flex items-center gap-3 p-3 rounded-lg text-sm font-medium text-danger hover:bg-red-50 transition w-full mt-10"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
