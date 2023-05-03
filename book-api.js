const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

const books = [];

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.post('/books', (req, res) => {
  const book = req.body;
  books.push(book);
  console.log(book);
  res.status(201).send('Book added to the database');
});

app.put('/books/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const newBook = req.body;

  // Find the index of the book with the given ISBN
  const index = books.findIndex(book => book.isbn === isbn);

  if (index === -1) {
    return res.status(404).send('Book not found');
  }

  // Replace the book at the given index with the new book
  books[index] = newBook;
  console.log(newBook);

  res.status(200).send('Book edited');
});

// Start the server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});