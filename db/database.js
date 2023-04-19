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

module.exports = router;

// Import the Sequelize library and DataTypes
const { Sequelize, DataTypes } = require('sequelize');

// Set up the database connection with additional configuration options
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
host: process.env.DB_HOST,
dialect: 'mysql',
define: {
timestamps: false, // Disable timestamps for all models
},
logging: false, // Disable logging for all queries
});

// Define a Book model with four columns, including a required title column
const Book = sequelize.define('Book', {
title: {
type: DataTypes.STRING,
allowNull: false, // Disallow null values for the title column
},
author: DataTypes.STRING,
num_pages: DataTypes.INTEGER,
isbn: DataTypes.STRING,
});

// Define an Author model with a single name column
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