const fs = require('fs');
const path = require('path');

const CHAT_FILE = path.join(__dirname, '../data/chat.json');

// Helpers
const readData = () => fs.existsSync(CHAT_FILE) ? JSON.parse(fs.readFileSync(CHAT_FILE)) : [];
const writeData = (data) => fs.writeFileSync(CHAT_FILE, JSON.stringify(data, null, 2));

// Send a message
exports.sendMessage = (req, res) => {
  const { toUserId, message } = req.body;
  const fromUserId = req.user.id;

  const chats = readData();

  const newMsg = {
    id: Date.now(),
    fromUserId,
    toUserId,
    message,
    timestamp: new Date().toISOString()
  };

  chats.push(newMsg);
  writeData(chats);
  res.status(201).json({ message: 'Message sent', chat: newMsg });
};

// Get messages between two users
exports.getMessages = (req, res) => {
  const chats = readData();
  const otherUserId = parseInt(req.params.userId);

  const filteredChats = chats.filter(chat =>
    (chat.fromUserId === req.user.id && chat.toUserId === otherUserId) ||
    (chat.fromUserId === otherUserId && chat.toUserId === req.user.id)
  );

  res.json(filteredChats);
};
