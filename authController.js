const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('./models'); // Import the User model from the ./models module

const saltRounds = 10; // Define the number of salt rounds to use for hashing
const secretKey = 'your-secret-key-here'; // Define the secret key to use for JWT token signing

function generateAccessToken(user) {
  return jwt.sign(user, secretKey, { expiresIn: '15m' }); // Generate a JWT token with the provided user object and the specified expiration time
}

async function registerUser(req, res) {
  const { username, password } = req.body; // Extract the username and password from the request body
  try {
    const existingUser = await User.findOne({ where: { username } }); // Check if a user with the same username already exists in the database
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' }); // If a user with the same username exists, return an error response
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash the provided password using bcrypt
    const newUser = await User.create({ username, password: hashedPassword }); // Create a new user record in the database with the provided username and hashed password
    res.json({ message: 'User registered successfully' }); // Return a success response
  } catch (error) {
    console.error(error); // Log any errors that occur
    res.status(500).json({ error: 'Internal server error' }); // Return an error response
  }
}

async function loginUser(req, res) {
  const { username, password } = req.body; // Extract the username and password from the request body
  try {
    const user = await User.findOne({ where: { username } }); // Find the user with the provided username in the database
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' }); // If the user does not exist, return an error response
    }
    const isPasswordValid = await bcrypt.compare(password, user.password); // Compare the provided password with the hashed password stored in the database using bcrypt
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' }); // If the password is invalid, return an error response
    }
    const accessToken = generateAccessToken({ username }); // Generate a JWT token with the provided username
    res.json({ accessToken }); // Return the JWT token in a success response
  } catch (error) {
    console.error(error); // Log any errors that occur
    res.status(500).json({ error: 'Internal server error' }); // Return an error response
  }
}

module.exports = { registerUser, loginUser }; // Export the registerUser and loginUser functions as properties of an object