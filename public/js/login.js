// Define an async function to handle the submission of the login form
const loginFormHandler = async (event) => {
	// Prevent the form from submitting in the default way
	event.preventDefault();

	// Get the values of the email and password fields and remove any whitespace
	const email = document.querySelector("#email-login").value.trim();
	const password = document.querySelector("#password-login").value.trim();

	// Check if both fields have values; if they do, continue with login
	if (email && password) {
	  // Make a POST request to the login endpoint with the email and password in the body
	  const response = await fetch("/api/users/login", {
		method: "POST",
		body: JSON.stringify({ email, password }),
		headers: { "Content-Type": "application/json" },
	  });

	  // If the response is successful, store user ID in local storage and redirect to home page
	  if (response.ok) {
		const data = await response.json();
		console.log(data);
		localStorage.setItem("user_id", data.user.id);
		document.location.replace("/");
	  } else {
		// If unsuccessful, display an alert
		alert("Failed to log in");
	  }
	}
  };

  // Add a submit event listener to the login form
  document.querySelector(".login-form").addEventListener("submit", loginFormHandler);