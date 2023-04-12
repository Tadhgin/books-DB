const express = require('express');
const { getBooks } = require('../controllers/bookController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/users', (req, res) => {
  // Return all users
});

app.get('/api/users/:id', (req, res) => {
  // Return a specific user by ID
});

app.post('/api/users', (req, res) => {
  // Add a new user
});

app.put('/api/users/:id', (req, res) => {
  // Update a user by ID
});

app.delete('/api/users/:id', (req, res) => {
  // Delete a user by ID
});

app.use('/books', getBooks);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});