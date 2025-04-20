import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const Chat = () => {
  const { token, user } = useAuth();
  const [users, setUsers] = useState([]);
  const [recipientId, setRecipientId] = useState('');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const chatBoxRef = useRef(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const fetchMessages = async (receiverId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/chats/${receiverId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChat(res.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message || !recipientId) return;

    try {
      await axios.post(
        'http://localhost:5000/api/chats',
        { toUserId: recipientId, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage('');
      // Re-fetch messages after sending
      fetchMessages(recipientId);
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const handleUserClick = (id) => {
    setRecipientId(id);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (recipientId) {
      fetchMessages(recipientId);
    }
  }, [recipientId]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-hidden">
          <h1 className="text-2xl font-semibold mb-4">Chat</h1>
          <div className="flex h-[500px]">
            {/* Users list */}
            <div className="w-1/4 bg-white border-r p-4 overflow-y-auto">
              <h2 className="text-lg font-medium mb-2">Users</h2>
              {users
                .filter((u) => u.id !== user.id)
                .map((u) => (
                  <div
                    key={u.id}
                    className={`cursor-pointer p-2 rounded hover:bg-gray-200 ${
                      recipientId === u.id ? 'bg-gray-300' : ''
                    }`}
                    onClick={() => handleUserClick(u.id)}
                  >
                    {u.name || u.email}
                  </div>
                ))}
            </div>

            {/* Chat area */}
            <div className="flex-1 flex flex-col">
              <div
                ref={chatBoxRef}
                className="flex-1 bg-white border-b p-4 overflow-y-auto"
              >
                {recipientId === '' ? (
                  <p className="text-gray-500">Select a user to chat with</p>
                ) : chat.length === 0 ? (
                  <p className="text-gray-500">No messages yet</p>
                ) : (
                  chat.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        msg.fromUserId === user.id ? 'justify-end' : 'justify-start'
                      } mb-2`}
                    >
                      <div
                        className={`px-4 py-2 rounded-lg text-white max-w-xs ${
                          msg.fromUserId === user.id ? 'bg-blue-500' : 'bg-green-500'
                        }`}
                      >
                        <div>{msg.message}</div>
                        <div className="text-xs text-gray-300 mt-1 text-right">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Message input */}
              {recipientId && (
                <form onSubmit={sendMessage} className="flex items-center gap-2 p-4 bg-white border-t">
                  <input
                    type="text"
                    className="flex-1 px-4 py-2 border rounded-md shadow-sm focus:ring focus:border-blue-400"
                    placeholder="Type a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Send
                  </button>
                </form>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Chat;
