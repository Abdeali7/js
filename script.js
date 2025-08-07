// Get references to the input fields
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.querySelector('input[name="read"][type="radio"]');

let library = document.querySelector(".library");

const myLibrary = [];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

document.getElementById("book-form").addEventListener("submit", function (event) {
    event.preventDefault();
    addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readInput.value);
  });

function addBookToLibrary(title, author, pages, read) {
  // Create an object to hold the current form submission's data
  const submissionData = new Book(
    title,
    author,
    pages,
    read
  );

  // Add the submission data object to the array
  myLibrary.push(submissionData);

  // You can now work with formDataArray, e.g., log it to the console
  library.insertAdjacentHTML(
    'beforeend',
    `<div class="book-card" id="${submissionData.id}">
        <h3>${submissionData.title}</h3>
        <p><strong>Author:</strong> ${submissionData.author}</p>
        <p><strong>Pages:</strong> ${submissionData.pages}</p>
        <p class="status"><strong>Status:</strong> <span>${submissionData.read}</span></p>
        <div class="card-buttons">
        <button class="toggle-btn">Toggle Status</button>
        <button class="delete-btn">Delete</button>
        </div>
      </div>`
  );

  // Optionally, clear the form fields after submission
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
}
  
library.addEventListener("click", function (e) {
  if (e.target.classList.contains('delete-btn')) {
    e.target.closest('.book-card').remove();
  }

  if(e.target.classList.contains('toggle-btn')){
    let status = e.target.closest('.book-card').querySelector('.status span');
    status.textContent = status.textContent === 'Read' ? 'Not Yet Read' : 'Read';
  }
});


addBookToLibrary('The Alchemist', 'Paulo Coelhoe', 208, 'Read');
addBookToLibrary('1984', 'George Orwell', 328, 'Not Yet Read');