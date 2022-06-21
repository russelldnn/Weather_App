let apikey = [];
let searchBtn = $("#searchBtn");
let userInput = $("#userInput");

for (let i = 0; i < localStorage.length; i++){
    let city = localStorage.getItem(i);
    let cityList = $("#listedCity")
    cityList.append("<li>" + city + "</li>");
}




