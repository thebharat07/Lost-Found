const { verifyToken } = require('../utils/jwt');
const fs = require('fs');
const path = require('path');

const getUsers = () => {
  const data = fs.readFileSync(path.join(__dirname, '../data/users.json'));
  return JSON.parse(data);
};

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  console.log('Auth Header:', authHeader); // ✅ Log token

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];
  let decoded;

  try {
    decoded = verifyToken(token);
    console.log('Decoded User:', decoded); // ✅ Log decoded
  } catch (err) {
    console.error('JWT Error:', err.message);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }

  const users = getUsers();

  // ✅ FIX: Use loose equality to handle string vs number ID
  const user = users.find(u => u.id == decoded.id);

  if (!user) {
    console.error('User not found');
    return res.status(401).json({ message: 'Unauthorized: User not found' });
  }

  req.user = user;
  next();
}

module.exports = { authenticate };
