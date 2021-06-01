import './style.css';

const form = document.querySelector('.form');
const inputFieled = document.querySelector('.form__input');
const resultsList = document.querySelector('.results');

const API_URL = `https://cors-anywhere.herokuapp.com/https://www.goodreads.com/book/auto_complete?format=json&q=`;
const maxListLength = 5;

function renderSpinner(parentEl) {
  const markup = `
    <div class="cssload-container">
      <div class="cssload-zenith"></div>
    </div>`;
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
  console.log(parentEl);
}

async function fetchBooks(e) {
  e.preventDefault();
  try {
    const searchedBook = inputFieled.value;
    if (!searchedBook) {
      return;
    }
    renderSpinner(resultsList);
    const res = await fetch(`${API_URL}${searchedBook}`);
    if (!res.ok) {
      throw new Error(
        "We couldn't get you the books you were looking for. Please try again later"
      );
    }
    const data = await res.json();
    console.log(data);
    displayBooks(data.slice(0, maxListLength));
  } catch (err) {
    console.log(err.message);
    resultsList.innerHTML =
      "<p>We couldn't get you the books you were looking for. Please try again later</p>";
  } finally {
    inputFieled.value = '';
  }
}
function displayBooks(data) {
  let markup = data
    .map(
      ({ title, imageUrl }) => `<li class="entry">
      <img class="entry__image" src=${imageUrl} alt="Cover">
      <p class="entry__name">${title}</p>
    </li>`
    )
    .join('');

  if (data.length === 0) {
    markup = `<p>Sorry. Looks like we can't find the book you are looking for...</p>`;
  }
  resultsList.innerHTML = markup;
}

form.addEventListener('submit', fetchBooks);
