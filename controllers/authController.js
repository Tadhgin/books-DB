// Import the necessary modules and models
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Book } = require('./models');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');

// Define the number of salt rounds to use for hashing and the secret key for JWT token signing
const saltRounds = 10;
const secretKey = 'your-secret-key-here';

// Define a function to generate a JWT token with the provided user object and expiration time
function generateAccessToken(user) {
  return jwt.sign(user, secretKey, { expiresIn: '15m' });
}

// Define a function to register a new user
async function registerUser(req, res) {
  // Extract the username and password from the request body
  const { username, password } = req.body;

  try {
    // Check if a user with the same username already exists in the database
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      // If a user with the same username exists, return an error response
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the provided password using bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user record in the database with the provided username and hashed password
    const newUser = await User.create({ username, password: hashedPassword });

    // Return a success response
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    // Log any errors that occur and return an error response
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Define a function to log in a user
async function loginUser(req, res) {
  // Extract the username and password from the request body
  const { username, password } = req.body;

  try {
    // Find the user with the provided username in the database
    const user = await User.findOne({ where: { username } });

    if (!user) {
      // If the user does not exist, return an error response
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare the provided password with the hashed password stored in the database using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // If the password is invalid, return an error response
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate a JWT token with the provided username
    const accessToken = generateAccessToken({ username });

    // Return the JWT token in a success response
    res.json({ accessToken });
  } catch (error) {
    // Log any errors that occur and return an error response
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Export the registerUser and loginUser functions as properties of an object
module.exports = { registerUser, loginUser };

// Define a Passport authentication strategy that uses the LocalStrategy to authenticate users against the User model and retrieve their associated Book records from the database
passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({
    where: { username: username },
    include: [{ model: Book, as: 'books' }]
  }).then(user => {
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  }).catch(err => done(err));
}));

// Define functions for serializing and deserializing user objects to and from the session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({
    where: { id: id },
    include: [{ model: Book, as: 'books' }]
  }).then(user => {
    done(null, user);
  }).catch(err => done(err));
});