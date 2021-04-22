let myLibrary = [];
const newBook = document.querySelector('#new-book');
const submit = document.querySelector('#submit');
const cancel = document.querySelector('#cancel');

displayBooks();
newBook.addEventListener('click', openForm);
submit.addEventListener('click', () => {
    let isVerified = verifyForm();
    if (isVerified) {
        addBookToLibrary();
        clearInput();
        closeForm();
    }
});
cancel.addEventListener('click', closeForm);


function Book(title, author, pages, have_read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.have_read = have_read
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.have_read}`
    }
}

function addBookToLibrary() {
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let read = "placeholder";

    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function displayBooks() {
    const library = document.querySelector("#book-container");

    myLibrary.forEach(function(book) {
        const newBook = document.createElement('div');
        newBook.textContent = book.info();
        newBook.classList.add('book');
        library.appendChild(newBook);
    })
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
}
  
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function verifyForm() {
    let input = [...document.querySelectorAll('.input')];

    return input.every(entry => entry.validity.valid);
}

function clearInput() {
    let input = [...document.querySelectorAll('.input')];

    input.forEach(entry => entry.value = '');
}