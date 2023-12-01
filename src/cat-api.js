
const url = "https://api.thecatapi.com/v1";

const api_key = "live_CQRt497D5k0kClGss5CQBeAMp6Gt5szVqTUUgmJeoCHE71vXdoF3X4Wzy9y4Vn2j";




export function fetchBreeds() {
   return fetch(`${url}/breeds?api_key=${api_key}`)
        .then(response => response.json())
}

export function fetchCatByBreed(breedId) {
    return fetch(`${url}/images/search?api_key=${api_key}&breed_ids=${breedId}`)
        .then(response => response.json())
}
