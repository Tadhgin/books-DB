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
    const { title, author, genre, year, available } = req.body;
    try {
      const book = await Book.create({
        title,
        author,
        genre,
        year,
        available
      });
      res.status(201).json(book);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  updateBookById: async (req, res) => {
    const { title, author, genre, year, available } = req.body;
    try {
      const book = await Book.findByPk(req.params.id);
      if (!book) {
        res.status(404).json({ message: 'Book not found' });
      } else {
        await book.update({
          title,
          author,
          genre,
          year,
          available
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
