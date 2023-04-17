const logoutRouter = require('/public/js/logout.js');
const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./models');
const { registerUser, loginUser } = require('./authController');

const PORT = process.env.PORT || 3000;

// Set up session
app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // set to true if using HTTPS
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// Set up template engine
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Set up body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set up routes
app.use('/logout', logoutRouter);
app.get('/', (req, res) => {
  const books = require('./controllers/book-list.js');
  res.render('index', { books });
});

app.get('/register', (req, res) => {
  res.render('register', { errors: [] });
});

app.post('/register', async (req, res) => {
  try {
    await registerUser(req, res);
    res.redirect('/login');
  } catch (error) {
    res.render('register', { errors: [error.message] });
  }
});

app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

app.post('/login', async (req, res) => {
  try {
    await loginUser(req, res);
    res.redirect('/books');
  } catch (error) {
    res.render('login', { error: error.message });
  }
});

// Start server
db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
});