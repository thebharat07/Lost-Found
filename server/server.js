// File: backend/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()


const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const chatRoutes = require('./routes/chatRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes); // ✅ Removed authenticateToken
app.use('/api/chats', chatRoutes); // ✅ Removed authenticateToken
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/users', userRoutes); // ✅ Removed authenticateToken

// Socket.IO setup
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('sendMessage', (data) => {
    io.emit('receiveMessage', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});



const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
