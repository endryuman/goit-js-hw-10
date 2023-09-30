import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_bhjUdxcI1QxvsIsUnHuPTh3P4g76Z6r6nZuDeDnfWC1wVk8FdvGeWzjb3kQIDaAh';

export function fetchBreeds() {
  const url = 'https://api.thecatapi.com/v1/breeds';
  return axios.get(url).then(res => res.data);
}

export function fetchCatByBreed(breedId) {
  const apiUrl = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios.get(apiUrl).then(res => {
    console.log(res.data[0]);
    return res.data[0];
  });
}
