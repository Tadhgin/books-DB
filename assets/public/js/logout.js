// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {

  // Get the logout button
  var logoutButton = document.querySelector('form[action="/logout"] button[type="submit"]');

  // Attach an event listener to the logout button click event
  if (logoutButton) {
    logoutButton.addEventListener('click', function(event) {
      // Prevent the form from submitting
      event.preventDefault();

      // Send a POST request to the server to log out the user
      fetch('/logout', {
        method: 'POST'
      })
      .then(function(response) {
        // Handle the response from the server
        if (response.ok) {
          // If the logout was successful, redirect the user to the home page
          window.location.href = '/';
        } else {
          // If the logout failed, display an error message
          console.error('Logout failed:', response);
        }
      })
      .catch(function(error) {
        // Handle any errors that may occur
        console.error('Error:', error);
        var errorElement = document.createElement('p');
        errorElement.textContent = 'An error occurred while logging out';
        document.body.prepend(errorElement);
      });
    });
  }

});