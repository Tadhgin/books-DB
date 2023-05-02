// Wrap the code in a function that executes when the DOM is loaded
function initForm() {
  // Get the form element
  var form = document.querySelector('form');

  // Attach an event listener to the form submit event
  form.addEventListener('submit', function(event) {
    // Prevent the form from submitting
    event.preventDefault();

    // Get the input elements
    var usernameInput = document.getElementById('username');
    var newPasswordInput = document.getElementById('newpassword');
    var confirmPasswordInput = document.getElementById('confirm-password');

    // Get the input values
    var username = usernameInput.value;
    var newPassword = newPasswordInput.value;
    var confirmPassword = confirmPasswordInput.value;

    // Validate the input values
    if (newPassword !== confirmPassword) {
      // If the passwords don't match, display an error message
      var errorList = document.createElement('ul');
      var errorMessage = document.createElement('li');
      errorMessage.textContent = 'Passwords do not match';
      errorList.appendChild(errorMessage);
      form.prepend(errorList);
    } else {
      // If the passwords match, submit the form
      form.submit();
    }
  });
}

// Attach an event listener to the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', initForm);