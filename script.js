let myLibrary = [];

function Book(id, title, author, pages, read) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  return myLibrary.push(book);
}

Book.prototype.toggleRead = function () {
  this.id = !this.id
  saveToLocalStorage(myLibrary);
}

const addButton = document.querySelector('.add');
addButton.addEventListener('pointerdown', toggleBookForm);

const closeForm = document.querySelector('.exit');
closeForm.addEventListener('pointerdown', () => {
  toggleBookForm();
  resetForm();
});

function toggleBookForm() {
  const bookForm = document.querySelector('.modal');
  return bookForm.style.display === 'flex' ?
    bookForm.style.display = 'none' :
    bookForm.style.display = 'flex';
}

function createBook(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  let formProps = Object.fromEntries(formData);
  if (formProps.read === 'true') 
    formProps.read = true;
  else formProps.read = false;
  formProps.id = 1;
  if (myLibrary.length !== 0) formProps.id =
    myLibrary[myLibrary.length - 1].id + 1;
  const book = new Book(
    formProps.id, formProps.title, formProps.author, formProps.pages, formProps.read);
  addBookToLibrary(book);
  showBookCard(myLibrary);
  saveToLocalStorage(myLibrary)
  toggleBookForm();
  resetForm();
}

function showBookCard(library) {
  //clear shelf so there won't be any duplicate book
  const shelf = document.querySelector('.shelf');
  shelf.textContent = '';

  library.forEach(book => {
    const bookWrapper = document.createElement('div');
    const ul = document.createElement('ul');
    const title = document.createElement('li');
    const author = document.createElement('li');
    const pages = document.createElement('li');
    const toggle = document.createElement('li');
    const editWrapper = document.createElement('li');
    const editBookButton = document.createElement('button');
    bookWrapper.className = 'book';
    bookWrapper.dataset.id = book.id;
    title.textContent = book.title;
    author.textContent = `By: ${book.author}`;
    pages.textContent = `Pages: ${book.pages}`;
    toggle.innerHTML = 
      `<div class="toggle">
        <input id="read" class="read" type="checkbox" role="switch" name="read" value="true">
        <label for="read" class="slot">
          <span class="slot-label">Haven't Read</span>
          <span class="slot-label">Already Read</span>
        </label>
      </div>`;
    editBookButton.className = 'del';
    editBookButton.textContent = 'Delete';
    editWrapper.appendChild(editBookButton);
    ul.appendChild(title);
    ul.appendChild(author);
    ul.appendChild(pages);
    ul.appendChild(toggle);
    ul.appendChild(editWrapper);
    bookWrapper.appendChild(ul);
    shelf.appendChild(bookWrapper);
    const checkbox = document.querySelector('li .toggle #read');
    if (book.read == true)
      checkbox.checked = true;
  });
  addRemovalFunction();
  addToggleRead();
}

function resetForm() {
  const form = document.querySelector('form');
  form.reset();
}

const form = document.querySelector('form');
form.addEventListener('submit', createBook);

function clearData() {
  localStorage.clear;
}

function saveToLocalStorage (object) {
  localStorage.setItem('library', JSON.stringify(myLibrary));
}

window.addEventListener('load', () => {
  getLibrary();
  showBookCard(myLibrary);
});

function getLibrary() {
  const library = localStorage.getItem('library');
  if (library)
    myLibrary = JSON.parse(localStorage.getItem('library'));
}

function getBookId(e) {
  const bookId =
    parseInt(e.target.parentNode.parentNode.parentNode.parentNode.dataset.id);
  return myLibrary.findIndex((book) => {
    return book.id == bookId;
  });
}

function removeBook(index) {
  if (index !== -1)
    myLibrary.splice(index, 1);
  saveToLocalStorage(myLibrary);
  showBookCard(myLibrary);
}

function addRemovalFunction() {
  const del = document.querySelectorAll('.del');
  del.forEach((button) => {
    button.addEventListener('pointerdown', (e) => {
      removeBook(getBookId(e));
    });
  })
}

function toggleRead(index) {
  if (index !== -1)
    myLibrary[index].read = !myLibrary[index].read;
  saveToLocalStorage(myLibrary);
}

function addToggleRead() {
  const toggle = document.querySelectorAll('#read');
  toggle.forEach((button) => {
    button.addEventListener('change', (e) => {
      toggleRead(getBookId(e));
    });
  })
}