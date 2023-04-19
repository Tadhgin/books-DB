const { User, Book } = require('./models');

// Add a book to the user's book list
app.post('/books/:id/add', async function(req, res) {
  try {
    // Find the user's document in the database
    const user = await User.findOne({ where: { id: req.user.id } });

    // Find the book to add to the user's book list
    const book = await Book.findOne({ where: { id: req.params.id } });

    // Add the book to the user's book list
    await user.addBook(book);

    // Add the book reference to the user's session
    req.user.books.push(req.params.id);

    // Redirect the user to the book detail page
    res.redirect('/books/' + req.params.id);
  } catch (error) {
    // Return an error response if there was an error adding the book to the user's book list
    console.error(error);
    res.status(500).send(error);
  }
});

// Remove a book from the user's book list
app.post('/books/:id/remove', async function(req, res) {
  try {
    // Find the user's document in the database
    const user = await User.findOne({ where: { id: req.user.id } });

    // Find the book to remove from the user's book list
    const book = await Book.findOne({ where: { id: req.params.id } });

    // Remove the book from the user's book list
    await user.removeBook(book);

    // Remove the book reference from the user's session
    req.user.books.splice(req.user.books.indexOf(req.params.id), 1);

    // Redirect the user to the book detail page
    res.redirect('/books/' + req.params.id);
  } catch (error) {
    // Return an error response if there was an error removing the book from the user's book list
    console.error(error);
    res.status(500).send(error);
  }
});