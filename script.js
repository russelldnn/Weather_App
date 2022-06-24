let apikey = 0a183220c7da455b2dfc6ac2a25bb1d1;
let searchBtn = $("#searchBtn");
let clearBtn = $("#clearBtn");
let listHistory = $(".listHistory");
let History = [];
let cityName = titleCase($("#userInput")[0].value.trim());
let apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=0a183220c7da455b2dfc6ac2a25bb1d1";
let apiURLOneShot = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=minutely,hourly&units=imperial&appid=0a183220c7da455b2dfc6ac2a25bb1d1";


function findInput() {
    fetch(apiURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

            })
        }
    })
}










