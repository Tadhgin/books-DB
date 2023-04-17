const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./models');

const saltRounds = 10;
const secretKey = 'your-secret-key-here';

function generateAccessToken(user) {
  return jwt.sign(user, secretKey, { expiresIn: '15m' });
}

async function registerUser(req, res) {
  const { username, password } = req.body;
  const existingUser = await db.User.findOne({ where: { username } });
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = await db.User.create({ username, password: hashedPassword });
  res.json({ message: 'User registered successfully' });
}

async function loginUser(req, res) {
  const { username, password } = req.body;
  const user = await db.User.findOne({ where: { username } });
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
  const accessToken = generateAccessToken({ username });
  res.json({ accessToken });
}

module.exports = { registerUser, loginUser };