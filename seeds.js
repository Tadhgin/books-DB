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

  const mysql = require('mysql2/promise');

// Create a connection to the MySQL database
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database',
});

// Insert a new user into the "users" table
const [rows, fields] = await connection.execute(
  'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
  ['johndoe', 'johndoe@example.com', 'password123']
);

console.log(rows);
// Output: OkPacket {
//   fieldCount: 0,
//   affectedRows: 1,
//   insertId: 1,
//   serverStatus: 2,
//   warningCount: 0,
//   message: '',
//   protocol41: true,
//   changedRows: 0
// }

// Close the database connection
await connection.end();