const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = function () {
    if (this.read == true) {
      return `${this.title} by ${this.author} contains ${this.pages} pages and has been read`;
    } else {
      return `${this.title} by ${this.author} contains ${this.pages} pages and has not been read`;
    }
  };
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function displayLibrary() {
  let bookShelf = document.querySelector(".bookShelf");

  bookShelf.innerHTML = ``;

  myLibrary.forEach((book, index) => {
    let bookContent = `
            <tr>
                <th>${book.title}</th>
                <th>${book.author}</th>
                <th>${book.pages}</th>
                <th>${book.read}</th>
                <th><button onClick="removeBook(${index})">Remove</button></th>
                <th><button onClick="toggleRead(${index})">Toggle</button></th>
            </tr>
        `;
    bookShelf.insertAdjacentHTML("beforeend", bookContent);
  });
}

let addBookForm = document.querySelector("#addBookForm");

addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let bookTitle = document.querySelector("#title");
  let bookAuthor = document.querySelector("#author");
  let bookPages = document.querySelector("#pages");
  let bookRead = document.querySelector("#read");

  if (
    bookTitle.value == "" ||
    bookAuthor.value == "" ||
    bookPages.value == ""
  ) {
    alert("Sorry, all text fields must be filled!");
  } else {
    addBookToLibrary(
      bookTitle.value,
      bookAuthor.value,
      bookPages.value,
      bookRead.checked
    );
    alert("Book has been added successfully");

    displayLibrary();

    let allInputs = document.querySelectorAll("input");
    allInputs.forEach((input) => (input.value = ""));
  }
});

function removeBook(bookId) {
  console.log(bookId);
  alert(`${myLibrary[bookId].title} has been removed.`);
  myLibrary.splice(bookId, 1);
  displayLibrary();
}

function toggleRead(bookId) {
  myLibrary[bookId].toggleRead();
  displayLibrary();
}

addBookToLibrary("Pride and Prejudice", "Jane Austen", "100", false);
addBookToLibrary("To Kill A Mockingbird", "Harper Lee", "200", true);
addBookToLibrary("Robinson Crusoe", "Daniel Defoe", "200", false);

displayLibrary();
