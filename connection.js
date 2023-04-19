const Sequelize = require('sequelize');
require('dotenv').config();
let sequelize;

// Set up the database connection based on the environment variables
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  const { DB_NAME, DB_USER, DB_PW } = process.env;
  sequelize = new Sequelize(DB_NAME, DB_USER, DB_PW, {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
  });
}

module.exports = sequelize;

// In db.js:
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./connection');

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

// Export the sequelize instance, the Book model, and the Author model
module.exports = {
  sequelize,
  Book,
  Author,
};
