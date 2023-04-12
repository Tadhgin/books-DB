// client-side JavaScript code
const setEditModal = async (isbn) => {
    const response = await fetch(`/book/${isbn}`);
    const book = await response.json();
    const {
      title,
      author,
      publisher,
      publish_date,
      numOfPages
    } = book;
  
    // Filling information about the book in the form inside the modal
    document.getElementById('isbn').value = isbn;
    document.getElementById('title').value = title;
    document.getElementById('author').value = author;
    document.getElementById('publisher').value = publisher;
    document.getElementById('publish_date').value = publish_date;
    document.getElementById('numOfPages').value = numOfPages;
  
    // Setting up the action url for the book
    document.getElementById('editForm').action = `/book/${isbn}`;
  };
  
  const deleteBook = async (isbn) => {
    await fetch(`/book/${isbn}`, { method: 'DELETE' });
    location.reload();
  };
  
  const loadBooks = async () => {
    const response = await fetch('/book');
    const books = await response.json();
    const booksContainer = document.getElementById('books');
  
    for (let book of books) {
      const card = document.createElement('div');
      card.className = 'col-4';
      card.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${book.isbn}</h6>
  
            <div>Author: ${book.author}</div>
            <div>Publish_Date: ${book.publish_date}</div>
            <div>Number Of Pages: ${book.numOfPages}</div>
  
            <hr>
  
            <button type="button" class="btn btn-danger" onclick="deleteBook('${book.isbn}')">Delete</button>
            <button types="button" class="btn btn-primary" data-toggle="modal"
              data-target="#editBookModal" onClick="setEditModal('${book.isbn}')">
              Edit
            </button>
          </div>
        </div>
      `;
      booksContainer.appendChild(card);
    }
  };
  
  // server-side Node.js code
  const express = require('express');
  const bodyParser = require('body-parser');
  const app = express();
  const port = 3000;
  
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  
  let books = [
    {
      isbn: '1234567890',
      title: 'Book Title',
      author: 'John Doe',
      publisher: 'Publisher Name',
      publish_date: '2022-01-01',
      numOfPages: 200,
    },
    // add more books here
  ];
  
  app.get('/book', (req, res) => {
    res.json(books);
  });
  
  app.get('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const book = books.find(b => b.isbn === isbn);
    if (!book) {
      res.status(404).send('Book not found');
      return;
    }
    res.json(book);
  });
  
  app.delete('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    books = books.filter(b => b.isbn !== isbn);
    res.send('Book is deleted');
  });
  
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });