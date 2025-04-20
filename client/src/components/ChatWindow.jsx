import React from 'react';

const ChatWindow = ({ messages, currentUserId }) => {
  return (
    <div className="bg-white p-4 rounded-lg border shadow-md max-h-[400px] overflow-y-auto">
      {messages.length === 0 ? (
        <p className="text-gray-500 text-center">No messages yet</p>
      ) : (
        messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.senderId === currentUserId ? 'justify-end' : 'justify-start'
            } mb-2`}
          >
            <div
              className={`px-4 py-2 rounded-xl text-white max-w-[70%] break-words ${
                msg.senderId === currentUserId ? 'bg-primary' : 'bg-secondary'
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatWindow;
