const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const {
  sendMessage,
  getMessages
} = require('../controllers/chatController');

// Protect all chat routes
router.post('/', authenticate, sendMessage);      
router.get('/:userId', authenticate, getMessages);

module.exports = router;
