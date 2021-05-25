const signupForm = document.querySelector('.signup-container');
const loginForm = document.querySelector('.signin-container');
const logoutBtn = document.querySelector('.logout-btn');


//check if there is a user logged in//
auth.onAuthStateChanged(function(user) {
    if (!user) {
        const loginBtn = document.querySelector('#open-login');
        const signUpBtn = document.querySelector('#open-sign-up');
        const cancelLogin = document.querySelectorAll('.cancel-login');
        
        openForm('welcome-popup');
        loginBtn.addEventListener('click', (e) => {
            closeForm('welcome-popup');
            openForm(e.target.getAttribute('data'));
        })
        signUpBtn.addEventListener('click', (e) => {
            closeForm('welcome-popup');
            openForm(e.target.getAttribute('data'));
        })
        cancelLogin.forEach(button => {
            button.addEventListener('click', (e) => {
                resetForm(button.parentElement);
                clearErrorMsg();
                closeForm(e.target.getAttribute('data'));
                openForm('welcome-popup');
            })
        })
    }
})

logoutBtn.addEventListener('click', (e) => {
    auth.signOut();
})

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    userSignUp();
})

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    userLogin();
})

function userSignUp() {
    const email = signupForm['email'].value;
    const password = signupForm['password'].value;
    const errMsgCont = document.querySelector('.signup-error');

    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        const userID = cred.user.uid;
        createUserDB(userID, email);
        clearErrorMsg();
        closeForm(signupForm.parentElement.classList);
    }) .catch(err => {
        insertErrorMsg(err.message, errMsgCont);
    }) .finally(() => {
        resetForm(signupForm);
    })
}


//creates DB collection for future user data//
function createUserDB(userID, email) {
    db.collection('users').doc(`${userID}`).set({
        userID: userID,
        email: email
    });
}

function userLogin() {
    const email = loginForm['email'].value;
    const password = loginForm['password'].value;
    const errMsgCont = document.querySelector('.login-error');

    auth.signInWithEmailAndPassword(email, password).then(() => {
        clearErrorMsg();
        closeForm(loginForm.parentElement.classList);
    }) .catch(err => {
        insertErrorMsg(err.message, errMsgCont);
    }) .finally(() => {
        resetForm(loginForm);
    })
}

function insertErrorMsg(error, errMsgCont) {
    errMsgCont.textContent = error;
    errMsgCont.style.paddingBottom = '20px';
}

function clearErrorMsg() {
    document.querySelector('.signup-error').textContent = '';
    document.querySelector('.login-error').textContent = '';
}