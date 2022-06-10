const apiKey="8ec824aa410e8832079ac8eedaa438ec";
const submbutton= document.querySelector("#submitButton")
const leabutton= document.querySelector("#exitButton")
const mBox= document.querySelector("#Button");
let movieI;
let page=1;
var pstatus;
var search;
let nText= document.querySelector("#now-playing");
let movieCard= document.querySelector("#movie-card");
let movieForm= document.querySelector("form");
let movieArea= document.querySelector("#movie-grid");
let moviePic= document.querySelector("#movie-poster");
let popUp= document.querySelector("#pop-up");
let genre1= document.querySelector("genres1");

window.onload = function popularfunction(){
    pstatus=1;
    let apiUrl= "https://api.themoviedb.org/3/movie/now_playing?api_key=" + apiKey +"&language=en-US&page="+page;
    console.log(apiUrl);
    console.log(getResults(apiUrl));
};

movieForm.addEventListener("submit", (evt) =>{
    page=1;
    pstatus=2;
    movieCard.innerHTML = ``;
    evt.preventDefault();
    console.log("evt.target.movie.value -", evt.target.movie.value);
    let apiUrl= "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey +"&language=en-US&query=" + evt.target.movie.value + "&page=" + page + "&include_adult=false"
    search=evt.target.movie.value;
    nText.innerHTML = `Showing results for "${search}"`;
    console.log(apiUrl);
    console.log(getResults(apiUrl));
})

function leaveButton(){
    popUp.innerHTML='';
}

async function getResults(apiUrl){
    let response= await fetch(apiUrl);
    console.log("response is ", response);
    let responseData= await response.json();
    displayResults(responseData);
    return responseData;
    
}
async function getInfo(apiUrl){
    let response= await fetch(apiUrl);
    console.log("response is ", response);
    let responseData= await response.json();
    popUpp(responseData);
    return responseData;
    
}

function image(i){
    popUp.innerHTML='';
    let apiUrl= "https://api.themoviedb.org/3/movie/"+i+ "?api_key=8ec824aa410e8832079ac8eedaa438ec&language=en-US"
    getInfo(apiUrl)
}

function popUpp(movieData){
    popUp.innerHTML+=(`
    <div class= "popUp1">
            <iframe class = "ytplayer" id="ytplayer" type="text/html" width="640" height="360"
            src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com"
            frameborder="0"></iframe>
            <h4>${movieData.title}</h4>
            <div class="movieinfo">
                <h4>${movieData.runtime} min |</h4>
                <h4>${movieData.release_date} | </h4>
                <h4>${movieData.genres[0].name} |</h4>
                <h4>&#9733;${movieData.vote_average}</h4>
            </div>
            <div class="movie-description">
                <h4>${movieData.overview}</h4>
            </div>
            <div class= "exitButton" id="exitButton">
                <input type="submit" value="Exit" onClick="leaveButton()">
            </div>
    </div>
    `)
}

function displayResults(movieData) {
    for (let i = 0; i < movieData.results.length; i++) {
        var source;
        if(movieData.results[i].poster_path){
            movieCard.innerHTML += `
            <div>
                <img onClick= "image(${movieData.results[i].id})" class="movie-poster" id="movie-poster" src="https://image.tmdb.org/t/p/w500${movieData.results[i].poster_path}" alt="Movie promotional picture">
                <p class="movie-votes">&#9733;${movieData.results[i].vote_average}/10</p>
                <p class="movie-title"><b>${movieData.results[i].title}<b></p> 
            </div>
            `}
        else{
            movieCard.innerHTML += `
            <div>
                <img onClick= "image()" class="movie-poster" id="movie-poster" src="No-image-found.jpg" alt="No image found">
                <p class="movie-votes">&#9733;${movieData.results[i].vote_average}/10</p>
                <p class="movie-title"><b>${movieData.results[i].title}<b></p>
            </div>
            `}
    mBox.innerHTML=`
        <input id="load-more-movies-btn" type="submit" value="View more!">
    `
    }}


mBox.addEventListener("click", function extrapage(){
    mBox.innerHTML=``
    if(pstatus==1){
        page++;
        let apiUrl= "https://api.themoviedb.org/3/movie/now_playing?api_key=" + apiKey +"&language=en-US&page="+page;
        console.log(apiUrl);
        console.log(getResults(apiUrl));
    }
    else if(pstatus==2){
        page++;
        let apiUrl= "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey +"&language=en-US&query=" + search + "&page=" + page + "&include_adult=false"
        console.log(apiUrl);
        console.log(getResults(apiUrl));
    }
})

