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
  
  