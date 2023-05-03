// Require the Handlebars module
var exphbs  = require('express-handlebars');

// Create an instance of the Handlebars engine
var hbs = exphbs.create();

// Register the "add-new-book" partial
hbs.registerPartial('add-new-book', '{{> add-new-book}}');

// Set the Handlebars engine as the default view engine for your Express app
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Define the route for the "Add New Book" page
app.get('/books/new', function(req, res) {
  // Render the "Add New Book" form
  res.render('add-new-book', { user: req.user, addingNewBook: true });
});