
const book = [];

let submitObject = {
  title: [],
  author: [],
  genre: [],
  year: [],
  available: [],
};

// Create a function that will add a book to the array
function addBook() {
  submitObject.title.push(document.getElementById("title").value);
  submitObject.author.push(document.getElementById("author").value);
  submitObject.genre.push(document.getElementById("genre").value);
  submitObject.year.push(document.getElementById("year").value);
  submitObject.available.push(document.getElementById("available").value);
  console.log(submitObject);
  // Create a function that will add a book to the array
  // book.push({
  //   title: document.getElementById("title").value,
