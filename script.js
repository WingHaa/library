let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  return myLibrary.push(book);
}

Book.prototype.toggleRead = function (e) {
  return !e.read;
}