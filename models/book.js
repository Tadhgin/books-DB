const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Book extends Model {}

Book.init({
  title: DataTypes.STRING,
  author: DataTypes.STRING,
  genre: DataTypes.STRING,
  year: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'book'
});

module.exports = Book;

config/database.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;

routes/books.js

const express = require('express');
const router = express.Router();
const db = require('../models');

// Route handler for displaying all books
router.get('/', async (req, res) => {
  try {
    const books = await db.Book.findAll();
    res.render('books/index', { books });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// Route handler for displaying a single book
router.get('/:id', async (req, res) => {
  try {
    const book = await db.Book.findByPk(req.params.id);
    if (!book) {
      res.sendStatus(404);
      return;
    }
    res.render('books/show', { book });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// Route handler for displaying the form for adding a new book
router.get('/new', (req, res) => {
  res.render('books/new');
});

// Route handler for adding a new book
router.post('/', async (req, res) => {
  try {
    await db.Book.create(req.body);
    res.redirect('/books');
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;
