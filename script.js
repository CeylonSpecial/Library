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
        displayBooks();
    }
})

cancel.addEventListener('click', () => {
    clearInput();
    closeForm();
})

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages`
    }
}

function addBookToLibrary() {
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let read = document.querySelector('#read-check').checked;

    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function displayBooks() {
    const library = document.querySelector("#book-container");

    removeAllChildNodes(library);

    myLibrary.forEach(function(book) {
        const newBook = document.createElement('div');
        const titleAndAuthor = document.createElement('div');
        const bookInfo = document.createElement('div');
        let read = document.createElement('input');
        read.type = 'checkbox';
        read.id = 'read-check';
        const label = document.createElement('label');
        label.htmlFor = 'read-check';
        label.appendChild(document.createTextNode('Read?'));
        if (book.read) {
            read.checked = true;
        }
        titleAndAuthor.textContent = book.info();
        newBook.classList.add('book');
        titleAndAuthor.classList.add('title-author');
        bookInfo.classList.add('book-info');
        library.appendChild(newBook);
        newBook.appendChild(titleAndAuthor);
        newBook.appendChild(bookInfo);
        bookInfo.appendChild(label);
        bookInfo.appendChild(read);
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

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}