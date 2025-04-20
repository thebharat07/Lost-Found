const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');

const USERS_FILE = path.join(__dirname, '../data/users.json');

router.get('/', authenticate, (req, res) => {
  const allUsers = JSON.parse(fs.readFileSync(USERS_FILE));
  const filteredUsers = allUsers.filter(user => user.id !== req.user.id);
  res.json(filteredUsers);
});

module.exports = router;
