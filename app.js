

// Set up database connection using Sequelize
{
    const sequelize = new Sequelize
}
dialect: 'mysql',
storage; 'books_db', // database file name and location;

// Define Book and Author models
class Book extends Model {}
Book.init({
title: DataTypes.STRING,
author: DataTypes.STRING,
genre: DataTypes.STRING,
year: DataTypes.INTEGER,
}, { sequelize });
 
class Author extends Model {}
Author.init({
name: DataTypes.STRING,
}, { sequelize });

// Sync the models with the database
sequelize.sync().then(() => {
console.log('Database and tables created successfully!'); // log successful database and table creation
});

// Middleware to handle errors
function errorHandler(err, req, res, next) {
console.error(err.stack);
res.status(err.statusCode || 500).json({ error: err.message });
}

// Start server
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`); // log server start
});

// Import necessary modules and instantiate the app
const express = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs');

// Authenticate the user and set the session ID
app.post('/login', async (req, res) => {
// Extract the email and password from the request body
const { email, password } = req.body;
// Find the user with the given email address
const user = await User.findOne({ where: { email } });

// Check if the user exists and if the password is correct
if (!user || !bcrypt.compareSync(password, user.password)) {
// If not, return an error message
return res.status(401).render('login', { error: 'Invalid email or password' });
}

// If the user is authenticated, set the session ID to the user's ID
req.session.userId = user.id;
// Redirect to the dashboard page
res.redirect('/');
});

// Log the user out and destroy the session
app.get('/logout', (req, res) => {
// Destroy the session
req.session.destroy();
// Redirect to the home page
res.redirect('/');
});

// Render the dashboard page
app.get('/', requireLogin, (req, res) => {
// Render the dashboard page
res.render('dashboard');
});

// Read user data from the users.json file
let users = JSON.parse(fs.readFileSync('./users/users.json'));

// Return all users
app.get('/api/users', (req, res) => {
// Return the list of users as a JSON response
res.json(users);
});

// Return a specific user by ID
app.get('/api/users/:id', (req, res) => {
// Extract the user ID from the request parameters
const id = parseInt(req.params.id);
// Find the user with the given ID
const user = users.find(user => user.id === id);
if (user) {
// If the user is found, return it as a JSON response
res.json(user);
} else {
// If not, return an error message
res.status(404).json({ error: 'User not found' });
}
});

// Add a new user
app.post('/api/users', (req, res) => {
// Extract the user data from the request body
const user = req.body;
// Check if the user data is valid
if (!user || !user.name || !user.email) {
// If not, return an error message
res.status(400).json({ error: 'Invalid user data' });
} else {
// If the user data is valid, assign a new ID to the user and add it to the list of users
user.id = users.length + 1;
users.push(user);
// Write the updated list of users back to the users.json file
fs.writeFileSync('./users/users.json', JSON.stringify(users));
// Return the new user as a JSON response
res.json(user);
}
});

// Update a user by ID
app.put('/api/users/:id', (req, res) => {
// Extract the user ID from the request parameters
const id = parseInt(req.params.id);
// Find the index of the user with the given ID in the list of users
const userIndex = users.findIndex(user => user.id === id);
if (userIndex === -1) {
// If the user is not found, return an error message
res.status(404).json({ error: 'User not found' });
} else {
// If the user is found, update its data
const user = { ...users[userIndex], ...req.body, id };
// Check if the updated user data is valid
if (!user || !user.name || !user.email) {
// If not, return an error message
res.status(400).json({ error: 'Invalid user data' });
} else {
// If the user data is valid, update the list of users and write it back to the users.json file
users[userIndex] = user;
fs.writeFileSync('./users/users.json', JSON.stringify(users));
// Return the updated user as a JSON response
res.json(user);
}
}
});

// Import the Sequelize library and the Book model
const express = require('express');
const router = express.Router();
const { Book } = require('../models');

// Route handler for displaying all books
router.get('/', async (req, res) => {
try {
const books = await Book.findAll();
res.render('books/index', { books });
} catch (error) {
console.error(error);
res.sendStatus(500);
}
});

// Import the necessary modules
const express = require('express');
const fs = require('fs');
const { Sequelize, DataTypes } = require('sequelize');

// Create an instance of the Express application
const app = express();

// Set up the database connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

// Define the Book and Author models
const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  publicationDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
});

const Author = sequelize.define('Author', {
  name: DataTypes.STRING,
});

// Define a "belongsTo" association between Book and Author
Book.belongsTo(Author);

// Synchronize the models with the database
sequelize.sync();

// Export the sequelize instance, the Book model, and the Author model
module.exports = {
  sequelize,
  Book,
  Author,
};

// Delete a user by ID
app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    await User.destroy({ where: { id } });
    res.json({ success: true });
  });

  // Extract the user ID from the request parameters
  const id = parseInt(req.params.id);
  // Find the index of the user with the given ID in the list of users
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) {
    // If the user is not found, return an error message
    res.status(404).json({ error: 'User not found' });
  } else {
    // If the user is found, remove it from the list of users and write the updated list back to the users.json file
    const user = users[userIndex];
    users.splice(userIndex, 1);
    fs.writeFileSync('./users/users.json', JSON.stringify(users));
    // Return the deleted user as a JSON response
    res.json(user);
  };

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

// Handle other errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running, on port ${PORT}`));
