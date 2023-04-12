const { Book } = require('../public/js/models');

const getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createBook = async (req, res) => {
  try {
    const book = await Book.create({
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      ISBN: '9780446310789'
    });
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const findAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const findBookByISBN = async (req, res) => {
  try {
    const book = await Book.findOne({
      where: {
        ISBN: '9780446310789'
      }
    });
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateBook = async (req, res) => {
  try {
    const book = await Book.findOne({
      where: {
        ISBN: '9780446310789'
      }
    });
    book.title = 'Go Set a Watchman';
    await book.save();
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findOne({
      where: {
        ISBN: '9780446310789'
      }
    });
    await book.destroy();
    res.json({ message: 'Book deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getBooks,
  createBook,
  findAllBooks,
  findBookByISBN,
  updateBook,
  deleteBook
};