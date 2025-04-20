const express = require('express'); // ✅ CORRECT
const router = express.Router();
const upload = require('../middleware/uploadMiddleware'); // ✅ Import it


const { authenticate } = require('../middleware/authMiddleware');
const {
  postItem,
  getAllItems,
  getUserItems,
  notifyUser,
  postFoundItem, // ✅ New Route
} = require('../controllers/itemController');

// Public route
router.get('/', getAllItems);

// Protected routes
router.post('/lost', authenticate, upload.single('image'), postItem);
router.post('/found', authenticate, postFoundItem); // ✅ New Route
router.get('/my', authenticate, getUserItems);
router.post('/notify/:itemId', authenticate, notifyUser);

module.exports = router;
