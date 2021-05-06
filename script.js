let myLibrary = [];
const newBook = document.querySelector('.new-bookbtn');
const submit = document.querySelector('.btn');
const cancel = document.querySelector('.cancel');

displayBooks();

document.addEventListener('click', function(e) {
    if (e.target) {
        let index = myLibrary.findIndex(item => item.info() === e.target.getAttribute('data'));
        if (e.target.textContent === 'Delete') {
            myLibrary.splice(index, 1);
        } else if (e.target.textContent === 'Read' || e.target.textContent === 'Unread') {
            myLibrary[index].read = !myLibrary[index].read
        }
        displayBooks();
    }
})

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
        return `${this.title}` + "\r\n\r\n" + `${this.author}` + "\r\n\r\n" + `${this.pages}` + " pages"
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
    const library = document.querySelector(".library-container");

    removeAllChildNodes(library);

    myLibrary.forEach(function(book) {
        const [container, bookInfo] = createDivs(library);
        let readButton = createButtons(container, book);
        
        bookInfo.textContent = book.info();
        if (book.read) {
            readButton.textContent = 'Read';
        } else {
            readButton.textContent = 'Unread';
        }
    })
}

function createDivs(parent) {
    const newBook = document.createElement('div');
    const bookInfo = document.createElement('div');
    const container = document.createElement('div');

    bookInfo.classList.add('book-info');
    newBook.classList.add('book');
    container.classList.add('book-container');
    parent.appendChild(container);
    container.appendChild(newBook)
    newBook.appendChild(bookInfo);

    return [container, bookInfo];
}

function createButtons(parent, book) {
    const buttons = document.createElement('div');
    const deleteButton = document.createElement('button');
    let readButton = document.createElement('button');

    deleteButton.setAttribute('data', book.info());
    deleteButton.classList.add('deletebtn');
    deleteButton.textContent = 'Delete';
    readButton.setAttribute('data', book.info());
    readButton.classList.add('readbtn');
    buttons.classList.add('book-buttons');
    parent.appendChild(buttons)
    buttons.appendChild(readButton);
    buttons.appendChild(deleteButton);

    return readButton;
}

function openForm() {
    document.querySelector('.form-popup').style.display = "block";
    document.querySelector('.library-container').classList.add('popup-selected');
    document.querySelector('.header-container').classList.add('popup-selected');
}
  
function closeForm() {
    document.querySelector('.form-popup').style.display = "none";
    document.querySelector('.library-container').classList.remove('popup-selected');
    document.querySelector('.header-container').classList.remove('popup-selected');
}

function verifyForm() {
    let input = [...document.querySelectorAll('.input')];

    input.forEach(function(entry) {
        if (!entry.validity.valid) {
            entry.classList.add('invalid');
        }
    })
    return input.every(entry => entry.validity.valid);
}

function clearInput() {
    let input = [...document.querySelectorAll('.input')];
    let readCheck = document.querySelector('#read-check');

    input.forEach(function(entry) {
        entry.value = '';
        entry.classList.remove('invalid');
    })
    readCheck.checked = false;
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const firebaseConfig = {
    apiKey: "AIzaSyAzZ7ypOOw3gJgtLbamzlCCUM304WB2jc8",
    authDomain: "library-11bea.firebaseapp.com",
    projectId: "library-11bea",
    storageBucket: "library-11bea.appspot.com",
    messagingSenderId: "365258081852",
    appId: "1:365258081852:web:15d44c883bbb2d38612539"
  };
firebase.initializeApp(firebaseConfig);

const database = firebase.database().ref();

function writeLibraryData(myLibrary) {
    firebase.database().ref('library').set({
        library: myLibrary
    });
}