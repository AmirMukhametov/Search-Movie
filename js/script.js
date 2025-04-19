const movieSearchBox = document.getElementById('movie-search-box'),
    searchList = document.getElementById('search-list'),
    resultGrid = document.getElementById('result-container');

async function loadMovies(searchTerms) {
    const URL = `http://www.omdbapi.com/?s=${searchTerms}&apikey=1662b30a`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    if(data.Response === 'True') {
        displayMovieList(data.Search);
    }
    
}

movieSearchBox.addEventListener('keyup', function(event) {
    const searchTerm = movieSearchBox.value.trim();
    if(searchTerm.length > 2) {
        loadMovies(searchTerm);
    } else {
        searchList.innerHTML = ''
    }
    console.log(searchTerm)
})

function displayMovieList(movies) {
    searchList.innerHTML = '';
    for(let idx = 0; idx < movies.length; idx++) {
        let movieListItem = document.createElement('div');
        movieListItem.classList.add('search-list-item');
        movieListItem.innerHTML = `
             <div class="search-item-thumbnail">
                <img src="${movies[idx].Poster !== 'N/A' ? movies[idx].Poster : 'no-image.jpg'}" alt="poster">
            </div>
            <div class="search-item-info">
                <h3>${movies[idx].Title}</h3>
                <p>${movies[idx].Year}</p>
            </div>
        `
        
        searchList.append(movieListItem);
        movieListItem.addEventListener('click', () => {
            renderMovieItem(movies[idx].Title)
        });

    }

}

async function renderMovieItem(movie) {
    const URL = `http://www.omdbapi.com/?t=${movie}&apikey=1662b30a`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    console.log(data);
    if (data.Response === "False") {
        resultGrid.innerHTML = `<p class="not-found">Фильм не найден :(</p>`;
        return;
    }
    const movieItem = document.createElement('div');
    movieItem.classList.add('result-grid');

    movieItem.innerHTML = `
                    <div class="movie-poster">
                        <img src="${data.Poster}">
                    </div>
                    <div class="movie-info">
                        <h3 class="movie-title">${data.Title}</h3>
                        <ul class="movie-misc-info">
                            <li class="year">${data.Year}</li>
                            <li class="rated">Rating: ${data.Rated}</li>
                            <li class="released">Released: ${data.Released}</li>
                        </ul>
                        <p class="genre"><b>Genre:</b> ${data.Genre}</p>
                        <p class="writer"><b>Writer:</b> ${data.Writer}</p>
                        <p class="actors"><b>${data.Actors}</b></p>
                        <p class="plot">${data.Plot}</p>
                        <p class="language"><b>Language:</b> ${data.Language}</p>
                    </div>
    `
    resultGrid.innerHTML = '';
    resultGrid.appendChild(movieItem);

    searchList.innerHTML = '';
    movieSearchBox.value = '';
}
