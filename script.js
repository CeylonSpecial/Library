class Book {
    constructor (title, author, pages, read) {
        this.title = title,
        this.author = author,
        this.pages = pages,
        this.read = read
    }
    info = () => {
        return `${this.title}` + "\r\n\r\n" + `${this.author}` + "\r\n\r\n" + `${this.pages}` + " pages";
    }
}

let myLibrary = [];
const newBookBtn = document.querySelector('.new-bookbtn');
const submitBook = document.querySelector('.submit-book');
const cancel = document.querySelectorAll('.cancel');


//check if there is a user logged in//
auth.onAuthStateChanged(async function(user) {
    const logoutBtn = document.querySelector('.logout-btn');
    if (user) {
        logoutBtn.style.visibility = 'visible';
        await addDBToLibrary();
    } else {
        myLibrary = [];
        logoutBtn.style.visibility = 'hidden';
    }
    displayBooks();
})

//listen for book deletion or change in read status//
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

newBookBtn.addEventListener('click', (e) => {
    openForm(e.target.getAttribute('data'));
})

submitBook.addEventListener('click', (e) => {
    let isVerified = verifyForm();
    if (isVerified) {
        let title = document.querySelector('#title').value;
        let author = document.querySelector('#author').value;
        let pages = document.querySelector('#pages').value;
        let read = document.querySelector('#read-check').checked;
        
        addToDB(addBookToLibrary(title, author, pages, read));
        resetForm(submitBook.parentElement);
        closeForm(e.target.getAttribute('data'));
        displayBooks();
    };
})

cancel.forEach(button => {
    button.addEventListener('click', (e) => {
        resetForm(button.parentElement);
        closeForm(e.target.getAttribute('data'));
    })
})

function addToDB(book) {
    db.collection('users').doc(`${auth.currentUser.uid}`).collection('library').doc(`${book.info()}`).set({
        title: book.title,
        author: book.author,
        pages: book.pages,
        read: book.read
    }) .then(() => {
        console.log("Document successfully written!");
    }) .catch((error) => {
        console.error("Error adding document: ", error);
    });
}

function deleteFromDB(book) {
    db.collection('users').doc(`${auth.currentUser.uid}`).collection('library').doc(`${book.info()}`).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}

function editReadStatusInDB(book) {
    db.collection('users').doc(`${auth.currentUser.uid}`).collection('library').doc(`${book.info()}`).update({
        read: book.read
    });
}

//read database on startup and add any stored books to library array//
async function addDBToLibrary() {
    const data = await db.collection('users').doc(`${auth.currentUser.uid}`).collection('library').get();
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
        const [container, bookInfo] = createBookDivs(library);
        let readButton = createBookButtons(container, book);

        bookInfo.textContent = book.info();
        if (book.read) {
            readButton.textContent = 'Read';
        } else {
            readButton.textContent = 'Unread';
        };
    });
}

function createBookDivs(parent) {
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

function createBookButtons(parent, book) {
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

function openForm(form) {
    document.querySelector(`.${form}`).style.display = "block";
    document.querySelector('.library-container').classList.add('popup-selected');
    document.querySelector('.header-container').classList.add('popup-selected');
    document.querySelector('.nav').classList.add('popup-selected');
}
  
function closeForm(form) {
    document.querySelector(`.${form}`).style.display = "none";
    document.querySelector('.library-container').classList.remove('popup-selected');
    document.querySelector('.header-container').classList.remove('popup-selected');
    document.querySelector('.nav').classList.remove('popup-selected');
}

function verifyForm() {
    let input = [...document.querySelectorAll('.book-input')];
    
    return input.every(entry => entry.validity.valid);
}

function resetForm(form) {
    form.reset();
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    };
}