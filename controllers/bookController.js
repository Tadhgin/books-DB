const { Book } = require('../models');

async function getBooks(req, res) {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  getBooks,
};

// create a new book record in the database
await Book.create({
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    ISBN: '9780446310789'
  });
  
  // find all books in the database
  const books = await Book.findAll();
  
  // find a book by its ISBN
  const book = await Book.findOne({
    where: {
      ISBN: '9780446310789'
    }
  });
  
  // update a book record
  book.title = 'Go Set a Watchman';
  await book.save();
  
  // delete a book record
  await book.destroy();