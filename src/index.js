import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';



const select = document.querySelector('.breed-select');
const error = document.querySelector('.error');
const loader = document.querySelector('.loader');
const info = document.querySelector('.cat-info');


loader.classList.replace('loader', 'is-hidden');
error.classList.add('is-hidden');
info.classList.add('is-hidden');

let arrBreedsId = [];

fetchBreeds()
.then(data => {
    data.forEach(element => {
        arrBreedsId.push({text:element.name, value:element.id});
    });
      new SlimSelect({
        select: select,
        data: arrBreedsId
    });
 })
.catch(onFetchError);

select.addEventListener('change', onSelectBreed);

function onSelectBreed(event) {
    const breedId = event.currentTarget.value;

    fetchCatByBreed(breedId)
        .then(data => {
            loader.classList.replace('loader', 'is-hidden');
            select.classList.remove('is-hidden');
            
      const { url, breeds } = data[0];
        
        info.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><h2>Temperament:</h2> ${breeds[0].temperament}</p></div>`
        info.classList.remove('is-hidden');
            
    })
    .catch(onFetchError);
};

function onFetchError(error) {
    select.classList.remove('is-hidden');
    loader.classList.replace('loader', 'is-hidden');

    Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!', {
        timeout: 3000,
        fontSize: '35px'
    });
};
