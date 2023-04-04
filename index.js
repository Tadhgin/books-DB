pp.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define your API routes here

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
app.get('/api/users', (req, res) => {
  // Return all users
});

app.get('/api/users/:id', (req, res) => {
  // Return a specific user by ID
});

app.post('/api/users', (req, res) => {
  // Add a new user
});

app.put('/api/users/:id', (req, res) => {
  // Update a user by ID
});

app.delete('/api/users/:id', (req, res) => {
  // Delete a user by ID
});

const exphbs = require('express-handlebars');

const app = express();

// Set up Handlebars.js as the template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.get('/', (req, res) => {
    res.render('index', { title: 'My App', message: 'Hello, world!' });
  });