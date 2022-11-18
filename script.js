'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const API_KEY = 'api_key=NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI=';
const searchUrl = (search) => {
  return `${TMDB_BASE_URL}/search/multi?api_key=${atob('NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI=')}&query=${search}`;
}


const CONTAINER = document.querySelector(".container");




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


const constructGenreUrl = (genreId) => {
  return `${TMDB_BASE_URL}/discover/movie?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}&with_genres=${genreId}`;
}


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

// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  CONTAINER.innerHTML= " "
  movies.map((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.className = "card"
    movieDiv.innerHTML = `<div id = "card" class="card text-bg-dark movieDiv" ">
    <img "img-fluid rounded-start" class="card text-bg-dark movieImage" id="card-img-top" src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${movie.title} poster" style=" object-fit: cover;">
     <div class="card-body text-center" id = "card-body"> 
       <h5 class="card-title">${movie.title}</h5>
        <h6 class="card-text > " <span> Rating </span> <br> ${movie.vote_average} </br> </h5>
      </div>
    </div>`;
    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    CONTAINER.appendChild(movieDiv);
  });
};


// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = (movie) => {
  CONTAINER.innerHTML = `
<div class="card mb-3"  >
  <img src=${
    BACKDROP_BASE_URL + movie.backdrop_path
  } class="card-img-top" text-bg-dark" alt="...">
  <div class="card-body">
  <h3 class="card-title" >${movie.title}</h3>
    <p id="movie-release-date" class="card-title" ><b>Release Date:</b> ${
      movie.release_date
    }</p>
    <p id="movie-runtime" class="card-title" ><b>Runtime:</b> ${movie.runtime} Minutes</p>
    <h3>Overview:</h3>
    <p id="movie-overview" class="card-title" >${movie.overview}</p>
  </div>`};


document.addEventListener("DOMContentLoaded", autorun);

//Saeed
//Saerch box section//
const searchInput = document.getElementById("search-input");

let isKeyPressed = { 
  'a': false, // ASCII code for 'a'
  'q': false, // ASCII code for 'k'
   // ... Other key codes you want to track
};

document.onkeydown = (e) => {
  isKeyPressed[e.key] = true; 
  if (e.ctrlKey && isKeyPressed["q"]) {
    searchInput.focus();
  }
};

document.onkeyup = (e) => {
  isKeyPressed[e.key] = false;
};

// Handling search inputs
searchInput.addEventListener("input", (e) => {
  fetch(`https://api.themoviedb.org/3/search/multi?api_key=542003918769df50083a13c415bbc602&language=en-US&query=${e.target.value}&page=1&include_adult=false`)
  .then(resp => resp.json())
  .then(data => { 
    console.log(e.target.value)
    data.results.forEach(result => {
      if (result.media_type === "movie") {
        renderMovies(data.results)
      }else if (result.media_type == " " ){
        renderMovies(movies);
      }
    })  
  }
)
})

//Actor Section--------------------------------------------------------------
const actorsBtn=document.getElementById("actors")

const actorrun= async () => {
  const actors= await fetchActors();
  // console.log(actors)
  renderActors(actors)
}

actorsBtn.addEventListener("click", actorrun)

const actorDetails = async (actor) => {
  const actorRes = await fetchActor(actor.id);
  // console.log(actorRes)
  renderActor(actorRes);
};

// This function is to fetch actors.
const fetchActors = async () => {
  const url = constructUrl(`person/popular`);
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data.results[0][3]);
  return data.results;
};
// fetchActors()

// This function is to fetch actor.
const fetchActor = async (person_id) => {
  const url = constructUrl(`person/${person_id}`);
  const res = await fetch(url);
  const data = await res.json();
  return data
};

const renderActors = (actors) => {
  CONTAINER.innerHTML = "";
  const actorsContainer = document.createElement("div")

  actors.map((actor) => {
    // console.log(actor)
    const actorDiv = document.createElement("div");
    actorDiv.innerHTML = `
        <img class="actorsImages" src="${PROFILE_BASE_URL + actor.profile_path}" alt="${
      actor.name
    } poster">
        <h3>${actor.name}</h3>`;

    actorDiv.addEventListener("click", () => {
      actorDetails(actor);
    });
    
    actorsContainer.appendChild(actorDiv);
    CONTAINER.appendChild(actorsContainer)
  });
};

const renderActor = (actor) => {
  CONTAINER.innerHTML = "";
  CONTAINER.innerHTML = `
    <div class="row">
        <div class="col-md-4">
             <img id="actor-backdrop" src=${
               PROFILE_BASE_URL + actor.profile_path
             }>
        </div>
        <div class="col-md-8">
            <h2 id="actor-name">${actor.name}</h2>
            <p id="actor-gender"><b>Gender:</b> ${
              actor.gender == 1 ? "famale" : "male"
            }</p>
            <p id="actor-popularity"><b>Popularity:</b> ${actor.popularity}</p>
            <p id="actor-birthday"><b>Birthday:</b> ${actor.birthday}</p>
            <p id="actor-deathday"><b>Deathday:</b> ${actor.deathday}</p>
            <h4 id="actor-bio">${actor.biography}</h4>
        </div>
        <div>
          <h4  id="moviesBy" style="padding:1rem;"> Related Movies:</h4> 
          <div class="row justify-content-center" id="knownFor"></div>
        </div>
    </div>`;

    if (actor.deathday === null) {
      document.getElementById("actor-deathday").remove()
    }
};

// NOUR filtering 
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



//genres
// fetching list of movies for one genre
const moviefiltering = async (id) =>{
  const url = constructGenreUrl(id);
  const res = await fetch(url);
  const movies = await res.json();
  renderMovies(movies.results);
}

// NOUR Function to fetch data from API
const filtergenres= async () => {
  const url = constructUrl(`genre/movie/list`);
  console.log(url);
  const res = await fetch(url);
  const data = await res.json();
  return data['genres']
}
const genresnavbar = async () =>{
const genres = await filtergenres()
const genreslist = document.getElementById("genres")
for (let genre in genres) {
  const li = document.createElement("li")
  li.classList.add("dropdown-item")
  li.innerHTML = genres[genre]['name']
  genreslist.appendChild(li)

  //add event listener to each geners
  li.addEventListener("click", () =>{
    moviefiltering(genres[genre]['id'])
  })}}
 genresnavbar();



// NOUR homepage refresh function 
function refreshPage(){
  window.location.reload();
} 