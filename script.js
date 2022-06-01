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

const addButton = document.querySelector('.add');
addButton.addEventListener('pointerdown', toggleBookForm);

const closeForm = document.querySelector('.exit');
closeForm.addEventListener('pointerdown', toggleBookForm);

function toggleBookForm() {
  const bookForm = document.querySelector('.modal');
  console.log(bookForm.style.display)
  return bookForm.style.display === 'none' ? bookForm.style.display = 'flex' :
    bookForm.style.display = 'none';
}
const submitBookDetail = document.querySelector('.submit')
submitBookDetail.addEventListener('pointerdown', addBookToLib);

function addBookToLib(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);
  let book = new Book
  myLibrary.push(book);
}

function showBookCard (book) {

}