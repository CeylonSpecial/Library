let myLibrary = [];
const newBook = document.querySelector('#new-book');
const submit = document.querySelector('#submit');
const cancel = document.querySelector('#cancel');
const readButton = document.querySelector('#read');
const deleteButton = document.querySelector('#delete');

displayBooks();

newBook.addEventListener('click', openForm);

if (readButton) {
    readButton.addEventListener('click', () => {
        console.log('hello!');
    })
}

if (deleteButton) {
    deleteButton.addEventListener('click', () => {
        console.log('ayyyy!');
    })
}

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
    //this.info = function() {
        //return `${this.title} by ${this.author}, ${this.pages} pages`
    //}
}

function addBookToLibrary() {
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let read = document.querySelector('#read-check').checked;
    
    if (read) {
        read = "Read";
    } else {
        read = "Unread";
    }

    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function displayBooks() {
    const library = document.querySelector("#book-container");

    removeAllChildNodes(library);

    myLibrary.forEach(function(book) {
        const [newBook, bookInfo] = createDivs(library);
        let readButton = createButtons(bookInfo, book);
        
        for (const value of Object.values(book)) {
            if (value === 'Read' || value === 'Unread') {
                readButton.textContent = value;
            } else {
                newBook.textContent += value + "\r\n\r\n";
            }
        }
    })
}

function createDivs(parent) {
    const newBook = document.createElement('div');
    const bookInfo = document.createElement('div');

    bookInfo.classList.add('book-info');
    newBook.classList.add('book');
    parent.appendChild(bookInfo);
    bookInfo.appendChild(newBook);

    return [newBook, bookInfo];
}

function createButtons(parent, book) {
    const buttons = document.createElement('div');
    const deleteButton = document.createElement('button');
    let readButton = document.createElement('button');

    deleteButton.id = book;
    deleteButton.classList.add('delete');
    deleteButton.textContent = 'Delete';
    readButton.id = book;
    readButton.classList.add('read');
    buttons.classList.add('book-buttons');
    parent.appendChild(buttons)
    buttons.appendChild(readButton);
    buttons.appendChild(deleteButton);

    return readButton;
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