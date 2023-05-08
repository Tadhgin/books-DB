const { Book } = require('../models');

const bookController = {
  getAllBooks: async (req, res) => {
    try {
      const books = await Book.findAll();
      res.status(200).json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getBookById: async (req, res) => {
    try {
      const book = await Book.findByPk(req.params.id);
      if (!book) {
        res.status(404).json({ message: 'Book not found' });
      } else {
        res.status(200).json(book);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  createBook: async (req, res) => {
    const { title, author, num_pages, isbn } = req.body;
    try {
      const book = await Book.create({
        title,
        author,
        num_pages,
        isbn
      });
      res.status(201).json(book);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  updateBookById: async (req, res) => {
    const { title, author, num_pages, isbn } = req.body;
    try {
      const book = await Book.findByPk(req.params.id);
      if (!book) {
        res.status(404).json({ message: 'Book not found' });
      } else {
        await book.update({
          title,
          author,
          num_pages,
          isbn
        });
        res.status(200).json(book);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  deleteBookById: async (req, res) => {
    try {
      const book = await Book.findByPk(req.params.id);
      if (!book) {
        res.status(404).json({ message: 'Book not found' });
      } else {
        await book.destroy();
        res.status(204).end();
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

//const bookList = document.querySelector('.book-list');

const renderBooks = (books) => {
  bookList.innerHTML = '';

  if (books.length === 0) {
    const noBooksMessage = document.createElement('p');
    noBooksMessage.textContent = 'No books found.';
    bookList.appendChild(noBooksMessage);
  } else {
    books.forEach((book) => {
      const bookItem = document.createElement('div');
      bookItem.classList.add('book-item');

      const title = document.createElement('h2');
      title.textContent = book.title;

      const author = document.createElement('p');
      author.textContent = `Author: ${book.author}`;

      const genre = document.createElement('p');
      genre.textContent = `Genre: ${book.genre}`;

      const year = document.createElement('p');
      year.textContent = `Year: ${book.year}`;

      bookItem.appendChild(title);
      bookItem.appendChild(author);
      bookItem.appendChild(genre);
      bookItem.appendChild(year);

      bookList.appendChild(bookItem);
    });
  }
};

module.exports = renderBooks;