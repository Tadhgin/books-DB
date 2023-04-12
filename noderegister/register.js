const { User } = require('./models');

// Register a new user
async function registerUser(name, email, password) {
    try {
      // Validate input data
      if (!name || !email || !password) {
        throw new Error('Name, email, and password are required');
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user object
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });
  
      // Return the new user object
      return newUser;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to register user');
    }
  }