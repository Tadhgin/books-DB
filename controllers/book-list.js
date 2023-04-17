const bookList = document.querySelector('.book-list');

const renderBooks = (books) => {
  bookList.innerHTML = '';

  if (books.length === 0) {
    const noBooksMessage = document.createElement('p');
    noBooksMessage.textContent = 'No books found.';
    bookList.appendChild(noBooksMessage);
  } else {
    books.forEach((book) => {
      const bookItem = document.createElement('div');
      bookItem.classList.add('book-item');

      const title = document.createElement('h2');
      title.textContent = book.title;

      const author = document.createElement('p');
      author.textContent = `Author: ${book.author}`;

      const genre = document.createElement('p');
      genre.textContent = `Genre: ${book.genre}`;

      const year = document.createElement('p');
      year.textContent = `Year: ${book.year}`;

      bookItem.appendChild(title);
      bookItem.appendChild(author);
      bookItem.appendChild(genre);
      bookItem.appendChild(year);

      bookList.appendChild(bookItem);
    });
  }
};

export default renderBooks;