const movieSearchBox = document.getElementById('movie-search-box'),
    searchList = document.getElementById('search-list'),
    resultGrid = document.getElementById('result-grid');

async function loadMovies(searchTerms) {
    const URL = `http://www.omdbapi.com/?s=${searchTerms}&apikey=1662b30a`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    if(data.Response === 'True') {
        console.log(data)
    }
    
}

movieSearchBox.addEventListener('keyup', function(event) {
    const searchTerm = movieSearchBox.value.trim();
    if(searchTerm.length > 2) {
        loadMovies(searchTerm);
    } else {
        searchList.innerHTML = ''
    }
})


