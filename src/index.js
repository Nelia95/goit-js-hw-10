import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-aio';

const DEBOUNCE_DELAY = 300;
const inputText = document.querySelector('#search-box');
console.log(inputText);
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputText.addEventListener(
  'input',
  debounce(searchCountryInfo, DEBOUNCE_DELAY)
);

function searchCountryInfo(event) {
  const searchCountry = event.target.value;
  if (searchCountry === '') {
    return;
  }
  const searchCountryNormal = searchCountry.trim();
  fetchCountries(searchCountryNormal)
    .then(countries => createMarkupCountry(countries))
    .catch(error => Notify.failure('Oops, there is no country with that name'));
}

function createMarkupCountry(countries) {
  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (countries.length > 1) {
    const markup = countries
      .map(({ name, flags }) => {
        return `<li class="country-item"><img class='flags' src="${flags.svg}" alt="${name.official}" width="50" height="60"><p class="country-name">${name.official}</p></li>`;
      })
      .join('');
    countryList.innerHTML = markup;
  } else if (countries.length === 1) {
    const languagesEl = Object.values(languages).join(', ');
    const markupInfo = countries
      .map(({ name, capital, flags, population, languages }) => {
        return `<img class="country-info-img" src="${flags.svg}" alt="${name.official}" width="50" height="60">
      <h2 class="country-info-title">${name.official}</h2>
      <ul class="country-info-list">
        <li class="country-info-item">
          <p class="country-info-text">Capital: ${capital}</p>
        </li>
        <li class="country-info-item">
          <p class="country-info-text">Population: ${population}</p>
        </li>
        <li class="country-info-item">
          <p class="country-info-text">Languages: ${languagesEl}</p>
        </li>
      </ul>`;
      })
      .join('');
    countryInfo.innerHTML = markupInfo;
  }
}
