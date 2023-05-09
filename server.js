const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const { Sequelize, DataTypes } = require('sequelize');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

require('dotenv').config(); // load environment variables from .env file

const { registerUser, loginUser } = require('./utils/authController.js');
const logoutRouter = require('./public/js/logout.js');
const booksRouter = require('./controllers/booksController.js');
const Book = require('./models/book');

// Set up database connection using Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  define: {
    timestamps: false, // Disable timestamps for all models
  },
  logging: false, // Disable logging for all queries
});

// Define Book and Author models
/*const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false, // Disallow null values for the title column
  },
  author: DataTypes.STRING,
  genre: DataTypes.STRING,
  year: DataTypes.INTEGER,
});
*/
const Author = sequelize.define('Author', {
  name: DataTypes.STRING,
});

// Define a "belongsTo" association between Book and Author
//Book.belongsTo(Author);

// Synchronize the models with the database
sequelize.sync().then(() => {
  console.log('Database and tables created successfully!'); // log successful database and table creation
});

const app = express();
const PORT = process.env.PORT || 3000;

// Set up session middleware
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
//app.engine('handlebars', exphbs({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');

// Middleware to parse request bodies
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
    console.error(error);
    res.sendStatus(500); // handle errors with a 500 status code
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

// Delete a user by ID
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  // Your code to delete the user with the specified ID from the database using Sequelize
  });

  // Update a user by ID
  app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  // Your code to update the user with the specified ID in the database using Sequelize
  });

  // GET route for retrieving all users
  app.get('/api/users', (req, res) => {
  // Your code to retrieve all users from the database using Sequelize
  });

  // GET route for retrieving a user by ID
  app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  // Your code to retrieve the user with the specified ID from the database using Sequelize
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
  });

  // Start the server
  app.listen(PORT, () => {
  console.log(Server, listening, on, port, $,{PORT});
  });

  module.exports = app; // export the app for testing purposes