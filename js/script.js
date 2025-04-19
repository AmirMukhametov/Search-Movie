const movieSearchBox = document.getElementById('movie-search-box'),
    searchList = document.getElementById('search-list'),
    resultGrid = document.getElementById('result-grid');

async function loadMovies(searchTerms) {
    const URL = `http://www.omdbapi.com/?s=${searchTerms}&apikey=1662b30a`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    if(data.Response === 'True') {
        displayMovieList(data.Search);
        console.log(data.Search)
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
        console.log(movieListItem)
    }
}




