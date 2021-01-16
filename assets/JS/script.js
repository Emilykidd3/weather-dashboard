
var searchBtn = document.querySelector("#search-btn");
var pastSearches = document.querySelector("#past-searches");
var currentTemp = document.querySelector("#current-temperature");
var currentHumid = document.querySelector("#current-humidity");
var currentWind = document.querySelector("#current-wind-speed");
var currentUV = document.querySelector("#current-uv-index")
var cityNameTitle = document.querySelector("#city-name");
// var cityName = document.querySelector("#city-search").value;

// MY API KEY= 0420478afd4088e10f4d86ff30133f32

// questions: LOCAL STORAGE, MOMENT FOR DATE?, make background colors fill whole page

// display the current weather
var getCurrentWeather = function(event) {
    // saveSearchHistory();
    getFiveDayForecast();
    event.preventDefault();
    var cityName = document.querySelector("#city-search").value;
    // api key??
    
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=0420478afd4088e10f4d86ff30133f32&units=imperial"
    fetch(apiURL)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            var temp = data.main.temp;
            currentTemp.textContent = "Temperature: " + temp + "°F";
            cityNameTitle.textContent = data.name + " (" + moment().format("l") + ")";
            currentHumid.textContent = "Humidity: " + data.main.humidity + "%";
            currentWind.textContent = "Wind Speed: " + data.wind.speed + "MPH";
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            var apiURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=0420478afd4088e10f4d86ff30133f32"
            fetch(apiURL)
                .then(function(response){
                    return response.json();
                })
                .then(function(data){
                    currentUV.textContent = "UV Index: " + data.value;
                })
        })
};

// display the 5-day forecast
var getFiveDayForecast = function() {
    event.preventDefault();
    var cityName = document.querySelector("#city-search").value;
    var apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=0420478afd4088e10f4d86ff30133f32&units=imperial"
    fetch(apiURL)
        .then(function(response){
            return response.json();
        })
        .then(function(data) {
            console.log(data.list[0].main.temp);
        })
}
// loop for 5 day forecast, clear div first

// make buttons of past search results// pull from local storage 
var getSearchHistory = function() {
    var searchArray = localStorage.getItem('searchHistory');
    var searchHistoryDiv = document.createElement("div");
    for (var i = 0; i < searchArray.length; i++) {
        var searchHistoryContent = searchHistoryDiv.textContent(searchHistory[i]);
        pastSearches.appendChild(searchHistoryContent);
    };
};

// save search results to local storage
var saveSearchHistory = function () {
    // need to make an array and add each city name to array
    localStorage.setItem('searchHistory', cityName)
}

searchBtn.addEventListener("click", getCurrentWeather);
getSearchHistory();