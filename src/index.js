import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const inputText = document.querySelector('#search-box');
console.log(inputText);

fetch('https://restcountries.com/v3.1/all')
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
  .then(data => {
    createMarkup(data);
  })
  .catch(error => {});

function createMarkup({ name, capital, population, flags, languages }) {
  const aboutCountry = [];
    if (aboutCountry.length > 10) {
      console.log('Too many matches found. Please enter a more specific name.');
    } if (aboutCountry.length > 1) {
      
  }
}
