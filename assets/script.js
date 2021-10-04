// 3812ab6b9245b50574b00ffacfcd2e36 
var Wkey = "3812ab6b9245b50574b00ffacfcd2e36";
var button = document.querySelector('.btn');
var inputCity = document.querySelector('.form-input');
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
    searchWeather(query);
    searchInput.val("");
    addSearchToHistory(query);
  }
}
// Accepts a query and fetches data from the giphy api.
function searchWeather(query) {
  //var requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + inputCity.val + "&appid=3812ab6b9245b50574b00ffacfcd2e36";
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + inputCity.value + "&appid=3812ab6b9245b50574b00ffacfcd2e36";  
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      resultsContainer.empty();
      for (var i = 0; i < data.data; i++) {
        displayWeather(data.data[i]);
      }
    });
}
// display?
function displayWeather(weatherResult) {
  var title = weatherResult.title;
  var img = $("<img>").attr({
    src: imgUrl,
    class: "img-fluid",
    alt: title,
  });
  var col = $("<div>").addClass("col-12 col-lg-6 pb-4").append(img);
  resultsContainer.append(col);
}
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

