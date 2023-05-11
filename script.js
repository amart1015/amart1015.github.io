const apiKey="8ec824aa410e8832079ac8eedaa438ec";
const submbutton= document.querySelector("#submitButton")
const leabutton= document.querySelector("#exitButton")
const mBox= document.querySelector("#Button");
let movieI;
let page=1;
var pstatus;
var search;
var doneFindingTrailer=false;
let nText= document.querySelector("#now-playing");
let movieCard= document.querySelector("#movie-card");
let movieForm= document.querySelector("#search-input");
let searchBox= document.querySelector(".search-input");
let movieArea= document.querySelector("#movie-grid");
let moviePic= document.querySelector("#movie-poster");
let popUp= document.querySelector("#pop-up");

window.onload = popularfunction();

function popularfunction(){
    pstatus=1;
    page=1;
    movieCard.innerHTML = ``;
    nText.innerHTML = `Now Playing:`;
    let apiUrl= "https://api.themoviedb.org/3/movie/now_playing?api_key=" + apiKey +"&language=en-US&page="+page;
    console.log(apiUrl);
    console.log(getResults(apiUrl));
};

movieForm.addEventListener("input", (evt) =>{
    console.log(searchBox.value);
    if(searchBox.value==""){
        popularfunction();
    }else{
        page=1;
        pstatus=2;
        movieCard.innerHTML = ``;
        evt.preventDefault();
        let apiUrl= "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey +"&language=en-US&query=" + searchBox.value + "&page=" + page + "&include_adult=false"
        search=searchBox.value;
        nText.innerHTML = `Showing results for "${search}"`;
        console.log(apiUrl);
        console.log(getResults(apiUrl));
    }
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

async function getInfo(apiUrl, videoUrl){
    let response= await fetch(apiUrl);
    let videoResponse= await fetch(videoUrl);
    console.log("response is ", response);
    console.log("video response is ", videoResponse);
    let responseData= await response.json();
    let videoResponseData= await videoResponse.json();
    popUpp(responseData, videoResponseData);
    return responseData, videoResponseData;
}

function image(i){
    popUp.innerHTML='';
    let apiUrl= "https://api.themoviedb.org/3/movie/"+i+ "?api_key=8ec824aa410e8832079ac8eedaa438ec&language=en-US"
    let videoUrl= "https://api.themoviedb.org/3/movie/" + i + "/videos?api_key=8ec824aa410e8832079ac8eedaa438ec&language=en-US"
    getInfo(apiUrl, videoUrl)
}

function popUpp(movieData, videoData){
    console.log(videoData)
    doneFindingTrailer=false;
    popUp.innerHTML+=(`
    <div class= "popUp1">
            <iframe class = "ytplayer" id="ytplayer" type="text/html" width="640" height="360"
            src="https://www.youtube.com/embed/${videoData.results.map((i)=>{
                if(i.type=="Trailer" && doneFindingTrailer==false){
                    doneFindingTrailer=true;
                    return i.key;
                }
            }).join('')}"
            frameborder="0"></iframe>
            <h4>${movieData.title}</h4>
            <div class="movieinfo">
                <h4>${movieData.runtime} min |</h4>
                <h4>${movieData.release_date} | </h4>
                <h4>${movieData.genres.map((i) =>{
                    return i.name;
                }).join(', ')} |</h4>
                <h4>&#9733;${movieData.vote_average}/10</h4>
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
    }}


window.addEventListener("scroll", function extrapage(){
// Calculate the distance between the bottom of the page and the current scroll position
  var windowHeight = window.innerHeight;
  var documentHeight = document.documentElement.scrollHeight;
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  var scrollBottom = scrollTop + windowHeight;

  // Check if the user has reached the bottom of the page
  if (scrollBottom >= documentHeight) {
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
  }
})

