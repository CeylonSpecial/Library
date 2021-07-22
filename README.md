About:
This was my first project in the Full Stack JavaScript learning path and my sixth project overall of The Odin Project's coursework.

Assignment:
Create a library web app where a user can add and store book information (title, author, number of pages, read/unread). The stored books and info should be displayed on the app.

Objectives:
- create a Book object constructor to call everytime the user added a new book
- store all book objects in an array
- display all the stored books on the page
- add ability for user to add new books and delete existing ones
- add ability for user to change read/unread status of books
- optional objectives:
    - add ability to store user input so that books wouldn't be lost when page was closed or refreshed
    - add ability for users to create accounts and log in to view their personal library

Reflection:
I really enjoyed this project, but it was also incredibly frustrating. I found applying everything that I had learned from The Odin Project (object contructors, arrays, etc.) to be pretty straightforward, but trying to add cloud storage was a whole different animal. I used Firebase to store user login info and library info. This was my first time creating a login interface and working with an API to store user information. The Odin Project had not yet covered APIs, account creation/login interfaces or cloud/local storage so this part of the project was completed based on my own research. I ran into many roadblocks along the way ("why aren't the books being displayed when the page loads?!" --> discovery of asynchronous functions, promises, etc.), but I am quite happy with how the project turned out!