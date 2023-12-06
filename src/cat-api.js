const url = "https://api.thecatapi.com/v1";
const api_key = "live_nBcdwsZCOeUWf4vXmur3MVuwar83P0nhjuBSI8o7dFRduj5FItkahjYz2ItOkE5m";


// Коллекция пород
export function fetchBreeds() {
    return fetch(`${url}/breeds?api_key=${api_key}`)
       .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
       
};


// Информация о коте
export function fetchCatByBreed(breedId) {
    return fetch(`${url}/images/search?api_key=${api_key}&breed_ids=${breedId}`)
    .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
       
};