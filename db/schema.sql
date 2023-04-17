CREATE TABLE books (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  num_pages INT NOT NULL,
  year_release INT NOT NULL,
  isbn VARCHAR(255) NOT NULL,
  format VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE borrowers (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  PRIMARY KEY (id)
);

CREATE TABLE book_borrower (
  book_id INT NOT NULL,
  borrower_id INT NOT NULL,
  borrow_date DATE NOT NULL,
  return_date DATE,
  FOREIGN KEY (book_id) REFERENCES books(id),
  FOREIGN KEY (borrower_id) REFERENCES borrowers(id)
);
