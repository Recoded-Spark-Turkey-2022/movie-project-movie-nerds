'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";

const CONTAINER = document.querySelector(".container");
const home = document.getElementById("home")
const genersNav = document.getElementById("genres")
const actors = document.getElementById("actors")
const searchInput = document.getElementById("search")


// Don't touch this function please
const autorun = async () => {
  const movies = await fetchMovies();
  renderMovies(movies.results);
};


// Don't touch this function please
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};

// You may need to add to this function, definitely don't delete it.
const movieDetails = async (movie) => {
  const movieRes = await fetchMovie(movie.id);
  renderMovie(movieRes);
};

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async () => {
  const url = constructUrl(`movie/now_playing`);
  const res = await fetch(url);
  return res.json();
};




// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};



// //NOUR fetch releaseDates
// const releaseDates = async (movieId) => {
//   const url = constructUrl(`movie/${movieId}/release_dates`);
//   const res = await fetch(url);
//   return res.json();
// };


// //NOUR  fetch toprated
// const topRated= async () => {
//   const url = constructUrl(`movie/top_rated`);
//   const res = await fetch(url);
//   return res.json();
// };

// //NOUR fetch toprated
// const upComing= async () => {
//   const url = constructUrl(`movie/upcoming`);
//   const res = await fetch(url);
//   return res.json();
// };



//NOUR fetch actors
const fetchActors = async () => {
  const url = constructUrl(`person/popular`);
  const res = await fetch(url);
  const data = await res.json()
  return data.results
}

//NOUR fetch one actor 
const fetchActor = async (actorId) => {
  const url = constructUrl(`person/${actorId}`);
  const res = await fetch(url);
  const data = await res.json()
  return data.results
}


  


// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  CONTAINER.innerHTML= " "
  movies.map((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.innerHTML = `
        <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${
      movie.title
    } poster" >
        <h3>${movie.title}</h3>`;
    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    CONTAINER.appendChild(movieDiv);
  });
};



// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = (movie) => {
  CONTAINER.innerHTML = `
    <div class="row">
        <div class="col-md-4">
             <img id="movie-backdrop" src=${
               BACKDROP_BASE_URL + movie.backdrop_path
             }>
        </div>
        <div class="col-md-8">
            <h2 id="movie-title">${movie.title}</h2>
            <p id="movie-release-date"><b>Release Date:</b> ${
              movie.release_date
            }</p>
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
            <h3>Overview:</h3>
            <p id="movie-overview">${movie.overview}</p>
        </div>
        </div>
            <h3>Actors:</h3>
            <ul id="actors" class="list-unstyled"></ul>
    </div>`;
};


const renderfilter = (movies) => {
  movies.map((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.innerHTML = `
        <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${
      movie.title
    } poster" >
        <h3>${movie.title}</h3>`;
    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    CONTAINER.appendChild(movieDiv);
  });
};


document.addEventListener("DOMContentLoaded", autorun);


// NOUR filtering 

const filtersNav = document.getElementById("filter")

// popular
const popular= document.getElementById("popular")

const filterPopular = async () => {
  const url = constructUrl(`movie/popular`);
  const res = await fetch(url);
  const movies = await res.json();
  renderMovies(movies.results);
}
popular.addEventListener("click", filterPopular)



// toprated
const toprated= document.getElementById("topRated")

const filtertoprated= async () => {
  const url = constructUrl(`movie/top_rated`);
  const res = await fetch(url);
  const movies = await res.json();
  toprated(movies.results);
}
toprated.addEventListener("click", filtertoprated )



// upComing
const upComing= document.getElementById("upComing")

const filterupcoming= async () => {
  const url = constructUrl(`movie/upcoming`);
  const res = await fetch(url);
  const movies = await res.json();
  renderMovies(movies.results);
}
upComing.addEventListener("click", filterupcoming )


// nowPlaying
const nowPlaying= document.getElementById("nowPlaying")

const filternowPlaying= async () => {
  const url = constructUrl(`movie/now_playing`);
  const res = await fetch(url);
  const movies = await res.json();
  renderMovies(movies.results);
}
nowPlaying.addEventListener("click", filternowPlaying )




// NOUR homepage refresh function 
function refreshPage(){
  window.location.reload();
} 

function goBackAndRefresh() {
  window.history.go(-1);
  setTimeout(() => {
    location.reload();
  }, 0);
}
