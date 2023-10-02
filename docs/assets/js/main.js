"use strict";const inputSearch=document.querySelector(".js-input"),btnSearch=document.querySelector(".js-btn-search"),btnReset=document.querySelector(".js-btn-reset"),container=document.querySelector(".js-container"),favs=document.querySelector(".js-favs");let showsList=[],showsFavorites=[];const showsFavoritesLS=JSON.parse(localStorage.getItem("FavsShows"));function getApi(){const e=inputSearch.value;fetch("//api.tvmaze.com/search/shows?q="+e).then(e=>e.json()).then(e=>{showsList=e,renderSeriesList(showsList)})}function renderSerie(e){let s="",t="";return t=e.show.image?e.show.image.medium:"https://via.placeholder.com/210x295/ffffff/666666/?text=TV",s+=`<ul id=${e.show.id} class= "js-each-serie showList">`,s+=`<li><img class="showList__img colorFavs" src="${t}" alt="Imagen de portada"></li>`,s+=`<li><h3 class="showList__name">${e.show.name}</h3></li>`,s+="</ul>",s}function renderSeriesList(e){container.innerHTML="";for(const s of e)container.innerHTML+=renderSerie(s);addEventFav()}function renderFavoritesList(e){favs.innerHTML="";for(const s of e)favs.innerHTML+=renderSerie(s);addEventFav()}function handleClickFav(e){e.preventDefault();const s=parseInt(e.currentTarget.id);let t=showsList.find(e=>e.show.id===s);const o=showsFavorites.findIndex(e=>e.show.id===s);-1===o?(showsFavorites.push(t),e.currentTarget.classList.add("colorFavs")):(showsFavorites.splice(o,1),e.currentTarget.classList.remove("colorFavs")),localStorage.setItem("FavsShows",JSON.stringify(showsFavorites)),renderFavoritesList(showsFavorites)}function addEventFav(){const e=document.querySelectorAll(".js-each-serie");for(const s of e)s.addEventListener("click",handleClickFav)}function handleClickSearch(e){e.preventDefault(),getApi()}function handleClickReset(e){e.preventDefault(),showsFavorites=[],localStorage.setItem("FavsShows",JSON.stringify(showsFavorites)),renderFavoritesList(showsFavorites);const s=document.querySelectorAll(".colorFavs");for(const e of s)e.classList.remove("colorFavs");addEventFav()}null!==showsFavoritesLS&&(showsFavorites=showsFavoritesLS,renderFavoritesList(showsFavorites)),btnSearch.addEventListener("click",handleClickSearch),btnReset.addEventListener("click",handleClickReset);