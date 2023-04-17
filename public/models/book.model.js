const { Sequelize, DataTypes } = require("sequelize");

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