'use strict';


/**** Query selectors****/

const inputSearch = document.querySelector('.js-input');
const btnSearch = document.querySelector('.js-btn-search');

const container = document.querySelector('.js-container');
// const favsSeries = document.querySelector('.js-favs');


/**** Funciones ****/

// 1. Funcion getApi para meter el FETCH que trae del servidor el listado de series y los pinta en el HTML

function getApi(event){
  event.preventDefault();
  const inputValue = inputSearch.value;
  const url = `//api.tvmaze.com/search/shows?q=${inputValue}`;
  fetch(url)
    .then((response) => response.json())
    .then ((dataApi) => {
      console.log(dataApi);
      renderSeriesList(dataApi);
    });
}

// recorre el listado con el bucle y lo devuelve pintandolo en la funcion renderSeriesList

function renderSeriesList(seriesList){
  let html = '';
  for (const eachSerie of seriesList) {
    html += `<h2>${eachSerie.show.name}</h2>`;//show es el nombre del objeto de la API
    html += `<img class="img" src="${eachSerie.show.image.medium}">`;
  }
  container.innerHTML = html;
}

//función manejadora del evento del boton Buscar

function handleClickSearch (event){
  event.preventDefault();
  getApi(event);
  renderSeriesList(seriesList);
}


/**** Eventos****/

//Añadir evento del botón buscar

btnSearch.addEventListener('click', handleClickSearch);