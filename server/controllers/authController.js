const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const USERS_FILE = path.join(__dirname, '../data/users.json');
const SECRET_KEY = process.env.JWT_SECRET; // Use env var in production

// Helper to read users
function readUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  const data = fs.readFileSync(USERS_FILE, 'utf-8');
  return JSON.parse(data || '[]');
}

// Helper to write users
function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Register user
exports.registerUser = (req, res) => {
  const { username, email, password } = req.body;
  const users = readUsers();

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = { id: Date.now(), username, email, password: hashedPassword };
  users.push(newUser);
  writeUsers(users);

  res.status(201).json({ message: 'User registered successfully' });
};

// Login user
exports.loginUser = async(req, res) => {
  const { email, password } = req.body;
  const users = readUsers();

  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  console.log("Login Attempt:", email);
  if (!user) {
    console.log("User not found");
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  console.log("Password Match:", passwordMatches);

  if (!passwordMatches) {
    console.log("Incorrect password");
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: '1h'
  });

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email
    }
  });
};
