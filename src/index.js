// import './css/styles.css';



const select = document.querySelector('.breed-select');
const error = document.querySelector('.error');
const loader = document.querySelector('.loader');
const info = document.querySelector('.cat-info');



const url = "https://api.thecatapi.com/v1";
const api_key = "live_nBcdwsZCOeUWf4vXmur3MVuwar83P0nhjuBSI8o7dFRduj5FItkahjYz2ItOkE5m";


// Коллекция пород
function fetchBreeds() {
    return fetch(`${url}/breeds?api_key=${api_key}`).then(response => response.json());
       
};


// Информация о коте
function fetchCatByBreed(breedId) {
    return fetch(`${url}/images/search?api_key=${api_key}&breed_ids=${breedId}`).then(response => response.json());
       
}

let arrBreedsId = [];

fetchBreeds()
.then(data => {
    data.forEach(element => {
        arrBreedsId.push({text:element.name, value:element.id});
    });
 })
    .catch(onFetchError);

select.addEventListener('change', onSelectBreed);

function onSelectBreed(event) {
    const breedId = event.currentTarget.value;
    fetchCatByBreed(breedId)
        .then(data => {
      const { url, breeds } = data[0];
        
        divCatInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><h2>Temperament:</h2> ${breeds[0].temperament}</p></div>`
        divCatInfo.classList.remove('is-hidden');
    })
    .catch(onFetchError);
};

function onFetchError(error) {
    alert('Oops! Something went wrong! Try reloading the page or select another cat breed!')
}
