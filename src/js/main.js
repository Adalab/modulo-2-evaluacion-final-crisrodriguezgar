'use strict';


/**** Query selectors****/

const inputSearch = document.querySelector('.js-input');
const btnSearch = document.querySelector('.js-btn-search');

const container = document.querySelector('.js-container');
// const favsSeries = document.querySelector('.js-favs');


let showsList = [];
//let seriesfavorites = [];




/**** Funciones ****/

// 1. Funcion getApi para meter el FETCH que trae del servidor el listado de series y los pinta en el HTML

function getApi(){
  const inputValue = inputSearch.value;
  const url = `//api.tvmaze.com/search/shows?q=${inputValue}`;
  fetch(url)
    .then((response) => response.json())
    .then ((dataApi) => {
      showsList = dataApi;
      console.log(dataApi);
      renderSeriesList(showsList);
    });
}

// recorre el listado con el bucle y lo devuelve pintandolo en la funcion renderSeriesList

function renderSeriesList(seriesList){
  let html = '';
  for (const eachSerie of seriesList) {
    let imageUrl = '';
    if (eachSerie.show.image) {
      imageUrl = eachSerie.show.image.medium;
    } else {
      imageUrl = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
    };
    html += `<img class="img" src="${imageUrl}">`;
    html += `<h2>${eachSerie.show.name}</h2>`;//show es el nombre del objeto de la API
  }
  container.innerHTML = html;
}

//función manejadora del evento del boton Buscar

function handleClickSearch (event){
  event.preventDefault();
  getApi();
}




/**** Eventos****/

//Evento del botón buscar

btnSearch.addEventListener('click', handleClickSearch);