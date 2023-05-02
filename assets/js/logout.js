// Define an async function to handle user logout
const logout = async () => {
  // Send a POST request to the logout endpoint
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  // If the response is successful, redirect to the login page
  if (response.ok) {
    document.location.replace("/login");
  } else {
    // If unsuccessful, display an error message with the response status text
    alert(response.statusText);
  }
};

// Add a click event listener to the logout button
document.querySelector("#logout").addEventListener("click", logout);