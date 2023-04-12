const { Sequelize, DataTypes } = require("sequelize");

const database = 'my_bookshelf_db';
const username = 'root';
const password = 'password';
const host = 'localhost';
const dialect = 'mysql';

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database: ', error);
  }
};

class Book extends Sequelize.Model {}

Book.init({
  title: DataTypes.STRING,
  author: DataTypes.STRING,
  ISBN: DataTypes.STRING
}, {
  sequelize,
  modelName: 'book'
});

const createBookTable = async () => {
  try {
    await sequelize.sync();
    console.log('Book table created successfully!');
  } catch (error) {
    console.error('Unable to create table: ', error);
  }
};

module.exports = {
  sequelize,
  testConnection,
  Book,
  createBookTable
};