let myLibrary = [];
const newBook = document.querySelector('#new-book');

newBook.addEventListener('click', openForm);

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
    let title = prompt("Title");
    let author = prompt("Author");
    let pages = prompt("Number of pages");
    let read = prompt("Read or not?");

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