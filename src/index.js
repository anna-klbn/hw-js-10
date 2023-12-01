import './css/styles.css';

import { fetchBreeds } from "./cat-api";

const select = document.querySelector('.breed-select');
const error = document.querySelector('.error');
const loader = document.querySelector('.loader');
const info = document.querySelector('.cat-info');


loader.classList.replace('loader', 'is-hidden');
error.classList.add('is-hidden');
info.classList.add('is-hidden');


select.addEventListener('change', onSelectBreed)

let arrBreedsId = [];
fetchBreeds()
.then(data => {
    data.forEach(element => {
        arrBreedsId.push({text: element.name, value: element.id});
    });
  new SlimSelect({
        select: select,
        data: arrBreedsId
    });
    })
.catch(onFetchError);


function onSelectBreed (event) {
    event.preventDefault();

    loader.classList.replace('is-hidden', 'loader');
    select.classList.add('is-hidden');
    info.classList.add('is-hidden');

    const breedId = event.currentTarget.value;
    fetchCatByBreed(breedId)
        .then(data => {
            loader.classList.replace('loader', 'is-hidden');
            select.classList.remove('is-hidden');
            const { url, breeds } = data[0];

            info.innerHTML = `<div class="box">
            <img src="${url}" alt="${breeds[0].name}" width="500"/>
            <h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><h3>Temperament:</h3> ${breeds[0].temperament}</p></div>`
            info.classList.remove('is-hidden');
        })
        .catch(onFetchError)
};


function onFetchError() {
    select.classList.remove('is-hidden');
    loader.classList.replace('loader', 'is-hidden');

    alert('Oops! Something went wrong! Try reloading the page or select another cat breed!')
}