class Book {
    constructor (title, author, pages, read) {
        this.title = title,
        this.author = author,
        this.pages = pages,
        this.read = read,
        this.info = function() {
            return `${this.title}` + "\r\n\r\n" + `${this.author}` + "\r\n\r\n" + `${this.pages}` + " pages"
        }
    }
}

let myLibrary = [];
const mainBtns = document.querySelectorAll('.main-btn');
const submitBook = document.querySelector('.submit-book');
const cancel = document.querySelectorAll('.cancel');

window.addEventListener('load', async () => {
    await addDBToLibrary();
    displayBooks();
})

document.addEventListener('click', (e) => {
    if (e.target.className === 'deletebtn' || e.target.className === 'readbtn') {
        let bookMatch = myLibrary.findIndex(item => item.info() === e.target.getAttribute('data'));
        if (e.target.textContent === 'Delete') {
            deleteFromDB(myLibrary[bookMatch]);
            deleteFromLibrary(bookMatch);
        } else if (e.target.textContent === 'Read' || e.target.textContent === 'Unread') {
            editReadStatusInLibrary(bookMatch);
            editReadStatusInDB(myLibrary[bookMatch]);
        };
        displayBooks();
    };
})

mainBtns.forEach(button => {
    button.addEventListener('click', (e) => {
        openForm(e.target.getAttribute('data'));
    });
})

submitBook.addEventListener('click', (e) => {
    let isVerified = verifyForm();
    if (isVerified) {
        let title = document.querySelector('#title').value;
        let author = document.querySelector('#author').value;
        let pages = document.querySelector('#pages').value;
        let read = document.querySelector('#read-check').checked;
        
        addToDB(addBookToLibrary(title, author, pages, read));
        clearInput();
        closeForm(e.target.getAttribute('data'));
        displayBooks();
    };
})

cancel.forEach(button => {
    button.addEventListener('click', (e) => {
        clearInput();
        closeForm(e.target.getAttribute('data'));
    })
})

function addToDB(book) {

    db.collection("library").doc(`${book.info()}`).set({
        title: book.title,
        author: book.author,
        pages: book.pages,
        read: book.read
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}

function deleteFromDB(book) {
    
    db.collection("library").doc(`${book.info()}`).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}

function editReadStatusInDB(book) {

    db.collection('library').doc(`${book.info()}`).update({
        read: book.read
    });
}

async function addDBToLibrary() {

    const data = await db.collection("library").get();
    data.docs.forEach(doc => {
        let title = doc.data().title;
        let author = doc.data().author;
        let pages = doc.data().pages;
        let read = doc.data().read;

        addBookToLibrary(title, author, pages, read);
    });
}

function addBookToLibrary(title, author, pages, read) {

    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    return book;
}

function deleteFromLibrary(book) {
    myLibrary.splice(book, 1);
}

function editReadStatusInLibrary(book) {
    myLibrary[book].read = !myLibrary[book].read
}

function displayBooks() {
    const library = document.querySelector(".library-container");
    removeAllChildNodes(library);
    
    myLibrary.forEach(book => {
        const [container, bookInfo] = createDivs(library);
        let readButton = createButtons(container, book);

        bookInfo.textContent = book.info();
        if (book.read) {
            readButton.textContent = 'Read';
        } else {
            readButton.textContent = 'Unread';
        };
    });
}

function createDivs(parent) {
    const newBook = document.createElement('div');
    const bookInfo = document.createElement('div');
    const container = document.createElement('div');

    bookInfo.classList.add('book-info');
    newBook.classList.add('book');
    container.classList.add('book-container');
    parent.appendChild(container);
    container.appendChild(newBook);
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
    parent.appendChild(buttons);
    buttons.appendChild(readButton);
    buttons.appendChild(deleteButton);

    return readButton;
}

function openForm(formToOpen) {
    document.querySelector(`.${formToOpen}`).style.display = "block";
    document.querySelector('.library-container').classList.add('popup-selected');
    document.querySelector('.header-container').classList.add('popup-selected');
    document.querySelector('.nav').classList.add('popup-selected');
}
  
function closeForm(formToClose) {
    document.querySelector(`.${formToClose}`).style.display = "none";
    document.querySelector('.library-container').classList.remove('popup-selected');
    document.querySelector('.header-container').classList.remove('popup-selected');
    document.querySelector('.nav').classList.remove('popup-selected');
}

function verifyForm() {
    let input = [...document.querySelectorAll('.book-input')];

    input.forEach(function(entry) {
        if (!entry.validity.valid) {
            entry.classList.add('invalid');
        };
    });
    return input.every(entry => entry.validity.valid);
}

function clearInput() {
    let input = [...document.querySelectorAll('.input')];
    let readCheck = document.querySelector('#read-check');

    input.forEach(function(entry) {
        entry.value = '';
        entry.classList.remove('invalid');
    });
    readCheck.checked = false;
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    };
}