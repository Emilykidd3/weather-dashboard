
var searchBtn = document.querySelector("#search-btn");
var pastSearches = document.querySelector("#past-searches");
var currentTemp = document.querySelector("#current-temperature");
var currentHumid = document.querySelector("#current-humidity");
var currentWind = document.querySelector("#current-wind-speed");
var currentUV = document.querySelector("#current-uv-index");
// var uvClass = document.querySelector
var cityNameTitle = document.querySelector("#city-name");
var color = document.querySelector("#color");

// day1
var day0 = document.querySelector("#day0");
var temp5 = document.querySelector("#temp5");
var hum5 = document.querySelector("#hum5");
// day2
var day1 = document.querySelector("#day1");
var temp13 = document.querySelector("#temp13");
var hum13 = document.querySelector("#hum13");
// day3
var day2 = document.querySelector("#day2");
var temp21 = document.querySelector("#temp21");
var hum21 = document.querySelector("#hum21");
// day4
var day3 = document.querySelector("#day3");
var temp29 = document.querySelector("#temp29");
var hum29 = document.querySelector("#hum29");
// day5
var day4 = document.querySelector("#day4");
var temp37 = document.querySelector("#temp37");
var hum37 = document.querySelector("#hum37");
// emojis
var emoji1 = document.querySelector("#emoji1");
var emoji2 = document.querySelector("#emoji2");
var emoji3 = document.querySelector("#emoji3");
var emoji4 = document.querySelector("#emoji4");
var emoji5 = document.querySelector("#emoji5");
// var cityName = document.querySelector("#city-search").value;

// MY API KEY= 0420478afd4088e10f4d86ff30133f32

// questions: LOCAL STORAGE, make background colors fill whole page

// display the current weather
var getCurrentWeather = function(event) {
    // saveSearchHistory();
    event.preventDefault();
    var cityName = document.querySelector("#city-search").value;
    if (!cityName) {
        alert("please enter a city name!");
        return;
    }
    getFiveDayForecast();
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
            // ?????
            var icon = document.createElement("img");
            icon.setAttribute('src', "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
            document.getElementById("city-name").appendChild(icon);
            console.log(data.weather[0].icon);
            // fetch for uv index
            var apiURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=0420478afd4088e10f4d86ff30133f32"
            fetch(apiURL)
                .then(function(response){
                    return response.json();
                })
                .then(function(data){
                    currentUV.textContent = "UV Index: " + data.value;
                    // adding color for uv index ?????
                    if (data.value < 2) {
                        currentUV.classList.remove("bg-warning", "bg-danger", "bg-dark", "text-light");
                        currentUV.classList.add("bg-success");
                    } else if (data.value < 5) {
                        currentUV.classList.remove("bg-success", "bg-danger", "bg-dark", "text-light");
                        currentUV.classList.add("bg-warning");
                    } else if (data.value < 10) {
                        currentUV.classList.remove("bg-success", "bg-warning", "bg-dark", "text-light");
                        currentUV.classList.add("bg-danger");
                    } else {
                        currentUV.classList.remove("bg-success", "bg-warning", "bg-danger");
                        currentUV.classList.add("bg-dark text-light");
                    }
                });
        });
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
            // temperatures
            temp5.textContent = "Temp: " + data.list[5].main.temp + "°F";
            temp13.textContent = "Temp: " + data.list[13].main.temp + "°F";
            temp21.textContent = "Temp: " + data.list[21].main.temp + "°F";
            temp29.textContent = "Temp: " + data.list[29].main.temp + "°F";
            temp37.textContent = "Temp: " + data.list[37].main.temp + "°F";
            // emojis
            console.log(data);
            var icon = document.createElement("img");
            icon.setAttribute('src', "https://openweathermap.org/img/w/" + data.list[5].weather.main + ".png");
            emoji1.appendChild(icon);
            // humidity
            hum5.textContent = "Humidity: " + data.list[5].main.humidity + "%";
            hum13.textContent = "Humidity: " + data.list[13].main.humidity + "%";
            hum21.textContent = "Humidity: " + data.list[21].main.humidity + "%";
            hum29.textContent = "Humidity: " + data.list[29].main.humidity + "%";
            hum37.textContent = "Humidity: " + data.list[37].main.humidity + "%";
            // dates
            day0.textContent = moment().add(1, 'days').format("l");
            day1.textContent = moment().add(2, 'days').format("l");
            day2.textContent = moment().add(3, 'days').format("l");
            day3.textContent = moment().add(4, 'days').format("l");
            day4.textContent = moment().add(5, 'days').format("l");
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