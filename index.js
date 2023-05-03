// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {

    // Get the "Add New Book" link
    var addNewBookLink = document.querySelector('a[href="/books/new?addingNewBook=true"]');

    // Attach an event listener to the link click event
    if (addNewBookLink) {
      addNewBookLink.addEventListener('click', function(event) {
        // Prevent the link from navigating to a new page
        event.preventDefault();

        // Hide the "View Books" and "Add New Book" links
        var viewBooksLink = document.querySelector('a[href="/books"]');
        if (viewBooksLink) {
          viewBooksLink.style.display = 'none';
        }
        addNewBookLink.style.display = 'none';

        // Show the "Add New Book" form
        var form = document.querySelector('form[action="/books/new"]');
        if (form) {
          form.style.display = 'block';
        }
      });
    }

  });