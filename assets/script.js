var Wkey = "3812ab6b9245b50574b00ffacfcd2e36";
//var button = document.querySelector('.btn');
//var inputCity = document.querySelector('.form-input');
var searchHistory = [];
var form = $("#search-form");
var searchInput = $("#search-city-input");
var resultsContainer = $("#result-content");
var searchHistoryContainer = $("#search-history");

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
//    searchInput.value(); dont need!
//    addSearchToHistory(query);
  }
};

function searchWeather(query) {   

  var cityURL = "https://api.openweathermap.org/geo/1.0/direct?q="+query+"&limit=1&appid=3812ab6b9245b50574b00ffacfcd2e36"
  fetch(cityURL)
  .then(function(response){
   return response.json();
  })
  .then(function(data){
   var lat = data[0].lat;
   var lon = data[0].lon;
   var cityName = data[0].name;
   var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" +lat+ "&lon=" +lon+ "&exclude=minutely,hourly,alerts&appid=3812ab6b9245b50574b00ffacfcd2e36" 

   fetch(queryURL)
   .then(function (response) {
     return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.current.temp);
      console.log(data.current.humidity);
      console.log(data.current.uvi);
      console.log(data.current.wind_speed);
      console.log(data.current.weather[0].icon)
      console.log(data.daily[0].weather[0].icon)
      console.log(data.daily[0].temp.min);
      console.log(data.daily[0].humidity);
      console.log(data.daily[0].wind_speed); //couldnt get speed
      displayCurrentDay(data, cityName);
      displayFiveDay(data)
    });
  })
    
};
function displayCurrentDay(data, cityName){
  $("#city-searched").empty()
  var citySearchedData = `<h1>${cityName}</h1>
  <p>Temp: ${data.current.temp}</p>
  <p>Humidity: ${data.current.humidity} </p>
  <p>Wind: ${data.current.wind_speed}</p>
  <img src="https://openweathermap.org/img/w/${data.current.weather[0].icon}.png" />
  <p>UVI: ${data.current.uvi}</p>`
  $("#city-searched").append(citySearchedData)
}

function displayFiveDay(data){
  $("#five-day-forecast").empty()
  var heading = `<h2 class="col-12">5 Day Forecast</h2>`
  $("#five-day-forecast").append(heading) 
  for (let index = 1; index <= 5; index++) {
    const element = `<div class="card col-2 bg-primary text-white mr-2">
    <div class="card-body">
        <p>Date: </p>  
        <p>Temp: ${data.daily[index].temp.min}</p>
        <p>Hum: ${data.daily[index].humidity}</p>
        <p>Wind: ${data.daily[index].wind_speed}</p>
        <p>UVI: ${data.daily[index].uvi}</p>
    </div>
</div>`
$("#five-day-forecast").append(element)

    
  }





function displayButtons() {
  searchHistoryContainer.empty();
  // loop over searchHistory
  for (var i = searchHistory.length - 1; i >= 0; i--) {
    var button = $("<button>")
      .attr({
        type: "button",
        class: "btn btn-secondary btn-block btn-search",
      })
      .text(searchHistory[i]);
    searchHistoryContainer.append(button);

  }
}

function handleSearchClick() {
  searchWeather(this.textContent);
}
// trying --

// function addSearchToHistory(query){
//   searchHistory.push(query)
//   localStorage.setItem("search-history", JSON.stringify(searchHistory));


  

// }

//--------------------PREVIOUS CODE -------------------------//
function addSearchToHistory(query) {
  searchHistory.push(query);
  localStorage.setItem("search-history", JSON.stringify(searchHistory));
  displayButtons();
  for(var i=searchHistory.length-1; i >-1; i--){
    var citiesSearched = searchHistory[i];

    var historyButton = document.createElement('button')

    historyButton.textContent = citiesSearched;
    historyButton.setAttribute('data-index', i);
    historyButton.setAttribute('class', 'btn btn-primary');
    searchHistory.append(historyButton);
  }
};

form.on("submit", handleFormSubmit);
searchHistoryContainer.on("click", ".btn-search", handleSearchClick);
displayButtons();
//--------------------PREVIOUS CODE -------------------------//