import countryTmpl from './templates/item-country.hbs';
import oneCountryTmpl from './templates/country.hbs';
import API from './fetchCountries';
import { alert, defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/core/dist/BrightTheme.css';
import './styles.css';

var debounce = require('lodash.debounce');

const refs = {
    listCountries: document.querySelector('.js-list'),
    inputQuery: document.querySelector('.js-search'),
};

refs.inputQuery.addEventListener('input', debounce(onSearch, 500));

function onSearch(evt) {
    if (evt.target.value !== '') {
        API.fetchCountriesByName(evt.target.value)
            .then(createListOfCountries)
            .catch(error => console.log(error));
    } else {
        createListOfCountries('');
    };
    
};
    
function createListOfCountries(countries) {
    if (countries.length > 1 & countries.length <= 10) {
        const listMarkup = countryTmpl(countries);
        refs.listCountries.innerHTML = listMarkup;
    } else {
        refs.listCountries.innerHTML = '';
    };

    if (countries.length > 10) {
      
        alert({
            text: 'Too many matches found. Please enter a more specific query!'
        });
    };

    if (countries.length === 1) {
        const listMarkup = oneCountryTmpl(countries);
        refs.listCountries.innerHTML = listMarkup;
    };
};