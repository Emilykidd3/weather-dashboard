
var searchBtn = document.querySelector("#search-btn");

var getCurrentWeather = function() {
    event.preventDefault();
    var cityName = document.querySelector("#city-search").value;
    // api key??
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=0420478afd4088e10f4d86ff30133f32"
    fetch(apiURL).then(function(response) {
        console.log(response);
    });
};

searchBtn.addEventListener("click", getCurrentWeather);