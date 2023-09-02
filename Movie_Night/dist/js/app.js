const api_url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c';
const img_path = 'https://image.tmdb.org/t/p/w500';
const search_url = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');


const getMovie = async (url) => {
   const res = await fetch(url);
   const data = await res.json();

   const showMovie = (movies) => {
      main.innerHTML = ``;

      const getClassByrate = (vote) => {
         if (vote >= 8) {
            return 'green';
         } else if (vote >= 5) {
            return 'orange';
         } else {
            return 'red'
         }
      }

      movies.forEach(function (item) {
         const {
            title,
            poster_path,
            vote_average,
            overview
         } = item;

         const movieEl = document.createElement('div');
         movieEl.classList.add('movie');
         movieEl.innerHTML = `<img src="${img_path+poster_path}" alt="${title}">
         <div class="movie-info">
             <h3>${title}</h3>
             <span class="${getClassByrate(vote_average)}">${vote_average}</span>
         </div>
         <div class="overview">
             <h3>Overview</h3>
             ${overview}
         </div>`;

         main.appendChild(movieEl);
      });
   }

   showMovie(data.results);
}

getMovie(api_url);

form.addEventListener('submit', function (e) {
   const searchTerm = search.value;

   if (searchTerm && searchTerm !== '') {
      getMovie(search_url + searchTerm);
      search.value = '';
   } else {
      location.reload();
   }

   e.preventDefault();
});
