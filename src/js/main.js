'use strict';

/**** Query selector****/

const inputSearch = document.querySelector('.js-input');
const btnSearch = document.querySelector('.js-btn-search');
const btnReset = document.querySelector('.js-btn-reset');

const container = document.querySelector('.js-container');
const favs = document.querySelector('.js-favs');

let showsList = [];
let showsFavorites = [];

/**** Local Storage****/
//3. Necesito guardar los favoritos en el Local Storage
//como me interesa que cuando reinicio la pagina la serie este ahí perenne, lo pongo fuera de cualquier funcion

const showsFavoritesLS = JSON.parse(localStorage.getItem('FavsShows'));

if (showsFavoritesLS !== null) {
  showsFavorites = showsFavoritesLS;
  renderFavoritesList(showsFavorites);
}

/**** Funciones ****/

// 1. BUSCAR SERIES

//1.1. Funcion getApi para meter el FETCH que trae del servidor los datos de las series y los pinta en el HTML gracias a renderSeriesList que le he pasado como parametro mi array vacío showsList y lo llena con la dataApi

function getApi() {
  const inputValue = inputSearch.value;
  const url = `//api.tvmaze.com/search/shows?q=${inputValue}`;

  fetch(url)
    .then((response) => response.json())
    .then((dataApi) => {
      showsList = dataApi;

      renderSeriesList(showsList);
    });
}

// 1.3. Devuelve el html de una serie

function renderSerie(eachSerie) {
  let html = '';
  let imageUrl = '';

  if (eachSerie.show.image && eachSerie.show.image.medium) {
    imageUrl = eachSerie.show.image.medium;
  } else {
    imageUrl = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
  }

  html += `<ul id="${eachSerie.show.id}" class= "js-each-serie showList">
  <li><img class="showList__img colorFavs" src="${imageUrl}" alt="${eachSerie.show.name}">
  <h3 class="showList__name">${eachSerie.show.name}</h3></li>`;

  return html;
}

// 1.2. Funcion con un bucle que recorre el array y pinta la lista de series ¿como? llena el container de lo que hago en la funcion renderSerie, en las lineas 58-61

function renderSeriesList(listSeries) {
  container.innerHTML = '';
  for (const eachSerie of listSeries) {
    container.innerHTML += renderSerie(eachSerie);
  }
  addEventFav();
}

// 2. AÑADIR A FAVORITOS

//2.4. Necesito pintarlo en el HTML, asi que creo una nueva funcion render pero que sea para las favoritas

function renderFavoritesList(seriesFavoritesList) {
  favs.innerHTML = '';
  for (const item of seriesFavoritesList) {
    const favHtml = renderSerie(item, false);
    favs.innerHTML += favHtml;
  }
  addEventFav();
}

//2.2. Creo la funcion manejadora handleClickFav que he hecho en la funcion addEventFav, para que cuando haga click identifique la serie con su id

function handleClickFav(event) {
  event.preventDefault();
  const idShows = parseInt(event.currentTarget.id); // es current target porque el id se lo he puesto a ul (es el que escucha el evento)

  //2.3. ahora necesito saber cuál es el favorito y me lo devuelva, asi que lo busco con el find sobre el array vacio de series y lo compara con la serie
  let foundSeries = showsList.find(
    (eachSerie) => eachSerie.show.id === idShows
  );

  //necesito hacer un condicional para buscar la posicion y así comprobar si está o no, y además añadirlo o quitarlo
  const indexFav = showsFavorites.findIndex(
    (eachSerie) => eachSerie.show.id === idShows
  );
  if (indexFav === -1) {
    showsFavorites.push(foundSeries);
    event.currentTarget.classList.add('colorFavs'); //esto es para añadir la clase colorsFavs y cambie el color y la fuente de la serie cuando pincho
  } else {
    showsFavorites.splice(indexFav, 1);
    event.currentTarget.classList.remove('colorFavs');
  }
  localStorage.setItem('FavsShows', JSON.stringify(showsFavorites)); //3.1. lo pongo aqui porque es lo que quiero guardar y justo el momento que lo quiero guardar

  renderFavoritesList(showsFavorites);

  // const favClicked = document.getElementById(idShows);
  // if (favClicked) {
  //   favClicked.classList.add('colorFavs');
  // }
}

//2.1 Creo la funcion con un bucle para recorrer el Array y con el query selectorAll obtengo todas las series y le añado un evento click
function addEventFav() {
  const seriesListAll = document.querySelectorAll('.js-each-serie'); //coge cada una de las series
  for (const item of seriesListAll) {
    item.addEventListener('click', handleClickFav);
  }
}

// BOTONES

/****funciones manejadoras de los botones****/

function handleClickSearch(event) {
  event.preventDefault();
  getApi();
}

function handleClickReset(event) {
  event.preventDefault();
  showsFavorites = []; //declaro dentro de la funcion el array vacio, para borrar la lista
  localStorage.setItem('FavsShows', JSON.stringify(showsFavorites)); //borro el localStorage
  renderFavoritesList(showsFavorites); // se actualiza la vista de la lista vacía

  const colorFavElements = document.querySelectorAll('.colorFavs'); //recojo todos los elementos que tengan la clase colorFavs
  for (const element of colorFavElements) {
    element.classList.remove('colorFavs');
  }
  addEventFav();
}

/**** Eventos***/

btnSearch.addEventListener('click', handleClickSearch);
btnReset.addEventListener('click', handleClickReset);
