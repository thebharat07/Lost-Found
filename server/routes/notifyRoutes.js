const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const {
  getNotifications,
  markAsRead
} = require('../controllers/notificationController');

// Protect notification routes
router.get('/', authenticate, getNotifications);
router.patch('/:notificationId/read', authenticate, markAsRead);

module.exports = router;
