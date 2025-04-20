const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const signToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRET); // this must use same key
};

module.exports = { signToken, verifyToken };
