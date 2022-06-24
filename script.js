
let searchBtn = $("#searchBtn");

let listHistory = $(".listHistory");










function findInput() {

    let cityName = ($("#userInput")[0].value);
    console.log(cityName);

    let apiURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=0a183220c7da455b2dfc6ac2a25bb1d1";

    fetch(apiURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                listHistory.append('<button type="button" class="list-group-item list-group-item-light list-group-item-action fastSearch">' + cityName);
                
                const lat = data.coord.lat;
                const long = data.coord.lon;

                let pairedLocate = lat.toString() + " " + long.toString();

                localStorage.setItem(cityName, pairedLocate);

                let apiURLOneShot = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+long+"&exclude=minutely,hourly&appid=0a183220c7da455b2dfc6ac2a25bb1d1";

                fetch(apiURLOneShot).then(function (anotherResponse){
                    if (anotherResponse.ok) {
                        anotherResponse.json().then(function (moredata) {
                            currentWeather (moredata);
                        })
                    }
                })
            })
        }
    })
}

function currentWeather(data) {
    $(".1Forecast").addClass("visible");

    $("#currentIcon")[0].src = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png";
    $("#temperature")[0].textContent = "Temperature: " + data.current.temp.toFixed(1) + " \u2109";
    $("#humidity")[0].textContent = "Humidity: " + data.current.humidity + "% ";
    $("#wind-speed")[0].textContent = "Wind Speed: " + data.current.wind_speed.toFixed(1) + " MPH";
    $("#uv-index")[0].textContent = "  " + data.current.uvi;

    if (data.current.uvi < 3) {
        $("#uv-index").removeClass("moderate severe");
        $("#uv-index").addClass("favorable");
    } else if (data.current.uvi < 6) {
        $("#uv-index").removeClass("favorable severe");
        $("#uv-index").addClass("moderate");
    } else {
        $("#uv-index").removeClass("favorable moderate");
        $("#uv-index").addClass("severe");
    }

    getFutureWeather(data);
}

function getFutureWeather(data) {
    for (let i = 0; i < 5; i++) {
        let futureWeather = {
            
            icon: "http://openweathermap.org/img/wn/" + data.daily[i + 1].weather[0].icon + "@2x.png",
            temp: data.daily[i + 1].temp.day.toFixed(1),
            humidity: data.daily[i + 1].humidity
        }

        var currentSelector = "#day-" + i;
            $(currentSelector)[0].textContent = futureWeather.date;
            currentSelector = "#img-" + i;
            $(currentSelector)[0].src = futureWeather.icon;
            currentSelector = "#temp-" + i;
            $(currentSelector)[0].textContent = "Temp: " + futureWeather.temp + " \u2109";
            currentSelector = "#hum-" + i;
            $(currentSelector)[0].textContent = "Humidity: " + futureWeather.humidity + "%";

    }}


searchBtn.on("click", function (start) {
    start.preventDefault();
    findInput();
})
