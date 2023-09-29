'use strict';


/**** Query selector****/

const inputSearch = document.querySelector('.js-input');
const btnSearch = document.querySelector('.js-btn-search');

const container = document.querySelector('.js-container');
const favs = document.querySelector('.js-favs');


let showsList = [];
let showsFavorites = [];


/**** Funciones ****/

// 1. BUSCAR SERIES

//1.1. Funcion getApi para meter el FETCH que trae del servidor el listado de series y los pinta en el HTML gracias a renderSeriesList que le he pasado como parametro mi array vacío showsList y lo llena con la dataApi

function getApi(){
  const inputValue = inputSearch.value;
  const url = `//api.tvmaze.com/search/shows?q=${inputValue}`;
  fetch(url)
    .then((response) => response.json())
    .then ((dataApi) => {
      showsList = dataApi;
      renderSeriesList(showsList);
    })
    .catch((error) => {
      console.error('Ahora mismo no podemos buscarlo, danos unos minutos', error);
    });
}

// 1.2. Devuelve el html de una serie

function renderSerie(eachSerie){
  let html = ''; //variable vacía de html para luego llenarla con lo que haré después 
  let imageUrl = '';// esto es una variable vacía para rellenarla según lo que haga el condicional
  if (eachSerie.show.image){
    imageUrl = eachSerie.show.image.medium;
  } else {
    imageUrl = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
  };

  html += `<ul id=${eachSerie.show.id} class= "js-each-serie">`;
  html += `<li><img class="img" src="${imageUrl}" alt="Imagen de portada"></li>`;
  html += `<li><h3>${eachSerie.show.name}</h3></li>`;
  html += `</ul>`;

  return html; // esto devuelve la variable de html con los datos de la serie
}

// 1.3. Funcion con un bucle que recorre el array y llena el container de lo que hice en las lineas 48-51

function renderSeriesList(listSeries) { 
  container.innerHTML = '';
  for (const item of listSeries) {
    container.innerHTML += renderSerie(item);
  }
  addEventFav ();
}


// 2. AÑADIR A FAVORITOS 

//2.4. Necesito pintarlo en el HTML, asi que creo una nueva funcion render pero que sea para las favoritas
function renderFavoritesList(seriesFavoritesList){
  favs.innerHTML = '';
  for (const item of seriesFavoritesList) {
    favs.innerHTML += renderSerie(item);
  }
  addEventFav ();
}
  

//2.2. Creo la funcion manejadora del handleClickFav que he hecho en la funcion addEventFav

function handleClickFav(event){
  event.preventDefault();
  console.log(event.currentTarget.id);// es current target porque como el id se lo he puesto a ul es el que escucha el evento
  const idShows = parseInt(event.currentTarget.id);
  
  //2.3. ahora necesito saber cual es el favorito asi que lo busco con el find sobre el array vacio de series
  let foundSeries = showsList.find(eachSerie => eachSerie.show.id === idShows);// esto busca dentro del array que tengamos (que no lo sabemos y por eso le he dado el id) qué ai necesito
  //necesito hacer un condicional para comprobar si está o no
  const indexFav = showsFavorites.findIndex(eachSerie => eachSerie.show.id === idShows);
  if(indexFav === -1){
    showsFavorites.push(foundSeries);
  } else {
    showsFavorites.splice(indexFav, 1);
  }
  renderFavoritesList(showsFavorites);
}

//2.1 Creo la funcion para recorrer el Array y coger cada una de las series para poderle añadir el evento
function addEventFav (){
  const seriesListAll = document.querySelectorAll('.js-each-serie');//coge cada una de las series
  for (const item of seriesListAll) {
    item.addEventListener('click', handleClickFav);
  }
}


//función manejadora del evento del botón Buscar
function handleClickSearch (event){
  event.preventDefault();
  getApi();
}


/**** Eventos****/

btnSearch.addEventListener('click', handleClickSearch);