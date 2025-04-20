import React from 'react';
import { X } from 'lucide-react';

const NotificationPopup = ({ notifications, onClose }) => {
  return (
    <div className="fixed top-5 right-5 z-50 w-80 max-h-[80vh] overflow-y-auto bg-white shadow-xl rounded-2xl border border-gray-200 animate-fadeIn">
      <div className="flex justify-between items-center p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-dark">Notifications</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-danger transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="p-4 space-y-3">
        {notifications.length === 0 ? (
          <p className="text-sm text-gray-500">No notifications available.</p>
        ) : (
          notifications.map((note, idx) => (
            <div
              key={idx}
              className="bg-light rounded-lg p-3 shadow-sm hover:bg-gray-100 transition"
            >
              <p className="text-sm text-gray-700">{note.message}</p>
              <span className="text-xs text-gray-400 block mt-1">
                {new Date(note.timestamp).toLocaleString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPopup;
