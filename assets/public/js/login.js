// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {

	// Get the form element
	var form = document.querySelector('form');

	// Attach an event listener to the form submit event
	form.addEventListener('submit', function(event) {

	  // Prevent the form from submitting
	  event.preventDefault();

	  // Get the input elements
	  var usernameInput = document.getElementById('username');
	  var passwordInput = document.getElementById('password');

	  // Get the input values
	  var username = usernameInput.value;
	  var password = passwordInput.value;

	  // Send a POST request to the server to log in the user
	  fetch('/login', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify({
		  username: username,
		  password: password
		})
	  })
	  .then(function(response) {
		// Handle the response from the server
		if (response.ok) {
		  // If the login was successful, redirect the user to the home page
		  window.location.href = '/';
		} else {
		  // If the login failed, display an error message
		  var errorElement = document.createElement('p');
		  errorElement.textContent = 'Invalid username or password';
		  form.prepend(errorElement);
		}
	  })
	  .catch(function(error) {
		// Handle any errors that may occur
		console.error('Error:', error);
		var errorElement = document.createElement('p');
		errorElement.textContent = 'An error occurred while logging in';
		form.prepend(errorElement);
	  });

	});

  });