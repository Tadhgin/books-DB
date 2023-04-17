const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const fs = require('fs');
const { User } = require('./models');

const app = express();

// Set up session middleware
app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // set to true if using HTTPS
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// Middleware to handle JSON parsing errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    res.status(400).json({ error: 'Invalid JSON payload' });
  } else {
    next();
  }
});

// Middleware to require authentication for certain routes
const requireLogin = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }

  next();
};

// Serve static files from the public directory
app.use(express.static('public'));

// Parse request bodies as JSON
app.use(express.json());

// Render the login page
app.get('/login', (req, res) => {
  res.render('login');
});

// Authenticate the user and set the session ID
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).render('login', { error: 'Invalid email or password' });
  }

  req.session.userId = user.id;
  res.redirect('/');
});

// Log the user out and destroy the session
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// Render the dashboard page
app.get('/', requireLogin, (req, res) => {
  res.render('dashboard');
});

// Read user data from the users.json file
let users = JSON.parse(fs.readFileSync('./users/users.json'));

// Return all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Return a specific user by ID
app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Add a new user
app.post('/api/users', (req, res) => {
  const user = req.body;
  if (!user || !user.name || !user.email) {
    res.status(400).json({ error: 'Invalid user data' });
  } else {
    user.id = users.length + 1;
    users.push(user);
    fs.writeFileSync('./users/users.json', JSON.stringify(users));
    res.json(user);
  }
});

// Update a user by ID
app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) {
    res.status(404).json({ error: 'User not found' });
  } else {
    const user = { ...users[userIndex], ...req.body, id };
    if (!user || !user.name || !user.email) {
      res.status(400).json({ error: 'Invalid user data' });
    } else {
      users[userIndex] = user;
      fs.writeFileSync('./users/users.json', JSON.stringify(users));
      res.json(user);
    }
  }
});

// Delete a user by ID
app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) {
    res.status(404).json({ error: 'User not found' });
  } else {
    const user = users[userIndex];
    users.splice(userIndex, 1);
    fs.writeFileSync('./users/users.json', JSON.stringify(users));
    res.json(user);
  }
});

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

// Handle other errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));