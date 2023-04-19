const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const { Sequelize } = require('sequelize');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { registerUser, loginUser } = require('./authController');
const logoutRouter = require('./public/js/logout.js');
const errorHandler = require('./errorHandler');
const booksRouter = require('./controllers/books');
const Book = require('./models/book');

require('dotenv').config(); // load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

// Set up session
app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // set to true if using HTTPS
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  },
  store: new SequelizeStore({
    db: sequelize, // session store using Sequelize
  }),
}));

// Set up Handlebars as the view engine
app.engine('handlebars', exphbs({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');

// Define a route for the "new book" page
app.get('/new-book', (req, res) => {
  res.render('new-book', { pageTitle: 'Add a new book' });
});

// Set up body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files from the public directory
app.use(express.static('public'));

// Set up routes
app.use('/logout', logoutRouter); // logout route
app.use('/books', booksRouter); // books route

// GET route for home page
app.get('/', async (req, res) => {
  try {
    const books = await Book.findAll(); // get all books from the database using Sequelize
    res.render('index', { books }); // render the index view with the books data
  } catch (error) {
    errorHandler(error, req, res); // handle errors with the errorHandler middleware function
  }
});

// GET and POST routes for registration
app.get('/register', (req, res) => {
  res.render('register', { errors: [] }); // render the registration form with empty errors array
});

app.post('/register', async (req, res) => {
  try {
    await registerUser(req, res); // register the user using the registerUser function from authController
    res.redirect('/login'); // redirect to login page after successful registration
  } catch (error) {
    res.render('register', { errors: [error.message] }); // render the registration form with error message(s)
  }
});

// GET and POST routes for login
app.get('/login', (req, res) => {
  res.render('login', { error: null }); // render the login form with null error message
});

app.post('/login', async (req, res) => {
  try {
    await loginUser(req, res); // log in the user using the loginUser function from authController
    res.redirect('/books'); // redirect to books page after successful login
  } catch (error) {
    res.render('login', { error: error.message }); // render the login form with error message
  }
});

// Sequelize models and database connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'books.sqlite', // database file name and location
});

const { Model, DataTypes } = Sequelize;

class Book extends Model {} // Book model
Book.init({
  title: DataTypes.STRING,
  author: DataTypes.STRING,
  genre: DataTypes.STRING,
  year: DataTypes.INTEGER,
}, { sequelize });

class Author extends Model {} // Author model
Author.init({
  name: DataTypes.STRING,
}, { sequelize });

sequelize.sync().then(() => {
  console.log('Database and tables created successfully!'); // log successful database and table creation
});

// Start server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`); // log server start
});