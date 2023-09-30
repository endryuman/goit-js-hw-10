import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_bhjUdxcI1QxvsIsUnHuPTh3P4g76Z6r6nZuDeDnfWC1wVk8FdvGeWzjb3kQIDaAh';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix, { Notify } from 'notiflix';
import SlimSelect from 'slim-select';

const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorMsg = document.querySelector('.error');

const styleSelect = new SlimSelect({
  select: '.breed-select',
});

let firstChange = true;

fetchBreeds().then(markupOptions).catch(errorMsg);

select.addEventListener('change', onChangeInfo);

function markupOptions(data) {
  const options = data.map(breed => ({
    text: breed.name,
    value: breed.id,
  }));
  styleSelect.setData(options);
  loaderMsg();
}

function onChangeInfo() {
  if (!firstChange) {
    InfoPage();
  } else {
    firstChange = false;
  }
}

function InfoPage() {
  const breedId = select.value;
  loaderMsg();

  fetchCatByBreed(breedId).then(markupCatInfo).catch(errorMsg);
}

function markupCatInfo(catData) {
  loaderMsg();
  catInfo.innerHTML = markingCatInfo(catData);
}

function markingCatInfo(data) {
  return `
    <img src="${data.url}" alt="${data.breeds[0].name}">
    <div class="box-info">
    <h2 class="cat-title">${data.breeds[0].name}</h2>
    <p class="text-des">${data.breeds[0].description}</p>
    <p >
    <span class="text-tem">Temperament:</span> ${data.breeds[0].temperament}
    </p>
    </div> 
`;
}

function error() {
  Notify.failure(error.textContent);
  loader.classList.add('hidden');
  select.classList.add('hidden');
  catInfo.classList.add('hidden');
}

function loaderMsg() {
  loader.classList.toggle('hidden');
  select.classList.remove('hidden');
  catInfo.classList.toggle('hidden');
}
