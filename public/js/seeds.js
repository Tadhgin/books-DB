const { Book } = require('./models'); // Import the Book model

// Define an array of book objects
const books = [
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    year: 1954,
    available: true
  },
  {
    title: 'The Hitchhiker\'s Guide to the Galaxy',
    author: 'Douglas Adams',
    genre: 'Science Fiction',
    year: 1979,
    available: false
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    year: 1813,
    available: true
  }
];

// Use the Book model to bulk create the books in the database
Book.bulkCreate(books)
  .then(() => console.log('Books seeded successfully'))
  .catch(err => console.error('Error seeding books:', err));