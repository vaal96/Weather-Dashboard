// 3812ab6b9245b50574b00ffacfcd2e36 
var Wkey = "3812ab6b9245b50574b00ffacfcd2e36";
var button = document.querySelector('.btn');
// var inputCity = document.querySelector('.form-input');
var searchHistory = [];
var form = $("#search-form");
var searchInput = $("#search-input");
var resultsContainer = $("#result-content");
var searchHistoryContainer = $("#search-history");
// var city;
//var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + inputCity.value + "&appid=3812ab6b9245b50574b00ffacfcd2e36";
// var city = input('Search for a City : ');
// var rq = requests.get(url);
// inputCity.innerHTML = ; 
// print(rq);
// user input 
// store it in my variable

// "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + WKey;
// button.addEventListener('click', function(){
//     fetch(queryURL)
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(err => alert("Wrong City Search!"))
// });

// init search history
searchHistory = localStorage.getItem("search-history");
if (searchHistory) {
  searchHistory = JSON.parse(searchHistory);
} else {
  searchHistory = [];
}
function handleFormSubmit(event) {
  event.preventDefault();
  var query = searchInput.val().trim();
  if (query) {
    searchWeather();
    searchInput.val("");
    addSearchToHistory(query);
  }
};
// Accepts a query and fetches data from the giphy api.

  //var requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + inputCity.val + "&appid=3812ab6b9245b50574b00ffacfcd2e36";
  // var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + inputCity.value + "&appid=3812ab6b9245b50574b00ffacfcd2e36";  
  
// api 

function searchWeather() {   
  var inputCity = document.querySelector('.form-input').value;

  var cityURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + inputCity +"&limit=1&appid=3812ab6b9245b50574b00ffacfcd2e36"
  fetch(cityURL)
  .then(function(response){
   return response.json();
  })
  .then(function(data){
    console.log(data)
  //  lat = data[0].lat;
  //  lon = data[0].lon;
  })
const lat = data[0].lat;
const lon = data[0].lon;
  var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely,alerts&units=imperial&appid=3812ab6b9245b50574b00ffacfcd2e36" 
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var weather = data[0].weather;
      console.log(weather);
      var speed = data[0].speed;
      var wind = data[0].wind;
      var temp = data[0].temperature;
      displayWeather(data.data[i]);
      });
};
// display? !!!!! 
// function displayWeather(weatherResult) {
//   console.log(weatherResult);
//   var title = weatherResult.title;
//   var img = $("<img>").attr({
//     src: imgUrl,
//     class: "img-fluid",
//     alt: title,
//   });
//   var col = $("<div>").addClass("col-12 col-lg-6 pb-4").append(img);
//   resultsContainer.append(col);

//function displayResults(weatherResults) {
    // Var temp =
    // Var Uv =
    // Etc and then add and append
   
    
function displayButtons() {
  searchHistoryContainer.empty();
  // loop over searchHistory
  for (var i = searchHistory.length - 1; i >= 0; i--) {
    var button = $("<button>")
      .attr({
        type: "button",
        class: "btn btn-outline-secondary btn-block btn-search",
      })
      .text(searchHistory[i]);
    searchHistoryContainer.append(button);
  }
}
function handleSearchClick() {
  searchWeather(this.textContent);
}
function addSearchToHistory(query) {
  searchHistory.push(query);
  localStorage.setItem("search-history", JSON.stringify(searchHistory));
  displayButtons();
}

form.on("submit", handleFormSubmit);
searchHistoryContainer.on("click", ".btn-search", handleSearchClick);
displayButtons();

