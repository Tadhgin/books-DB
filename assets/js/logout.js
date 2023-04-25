// Get the logout button
const logoutButton = document.querySelector('form[action="/logout"] button[type="submit"]');

// Attach an event listener to the logout button click event
if (logoutButton) {
  logoutButton.addEventListener('click', async (event) => {
    // Prevent the form from submitting
    event.preventDefault();

    try {
      // Send a POST request to the server to log out the user
      const response = await fetch('/logout', {
        method: 'POST',
      });
      if (response.ok) {
        // If the logout was successful, redirect the user to the home page
        window.location.href = '/';
      } else {
        // If the logout failed, display an error message
        console.error('Logout failed:', response);
      }
    } catch (error) {
      // Handle any errors that may occur
      console.error('Error:', error);
      const errorElement = document.createElement('p');
      errorElement.textContent = 'An error occurred while logging out';
      document.body.prepend(errorElement);
    }
  });
}