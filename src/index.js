let apiKey = "a710bd8bd76400c9658ef649d9e81728";
let units = "metric";
function showAllFeatures(response) {
  let nameCity = response.data.name;
  let cityName = document.querySelectorAll(".city");
  for (let i = 0; i < cityName.length; i++) {
    cityName[i].innerHTML = nameCity;
  }
  let temp = Math.round(response.data.main.temp);
  let degree = document.querySelector("#degree");
  degree.innerHTML = temp;

  let precipitation = Math.round(response.data.main.pressure / 100);

  let precipitationElement = document.querySelector("#precipitation");
  precipitationElement.innerHTML = `Precipitation : ${precipitation}%`;
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind : ${wind}km/h`;
  let howWeather = response.data.weather[0].main;
  let howWeatherElemnt = document.querySelector("#howWeather");
  howWeatherElemnt.innerHTML = howWeather;
}

//mainpulate the name

function showCityName(event) {
  event.preventDefault();
  let cityName = document.querySelectorAll(".city");

  let cityNameValue = document.querySelector("#search-city").value;

  for (let i = 0; i < cityName.length; i++) {
    cityName[i].innerHTML = cityNameValue;
  }
  let headingHasDot = document.querySelector("h1 span");
  headingHasDot.classList.add("dot");
  //search engine
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityNameValue}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showAllFeatures);
}
let formWeather = document.querySelector("#form-weather");
formWeather.addEventListener("submit", showCityName);
//mainpulate the time
let day = document.querySelector(".day");
let time = document.querySelector(".time");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let now = new Date();
let currentDay = now.getDay();

day.innerHTML = `${days[currentDay]}`;
let currentHour = now.getHours();

let currentMinutes = now.getMinutes();

if (currentHour < 10 && currentMinutes < 10) {
  time.innerHTML = `0${currentHour}:0${currentMinutes}`;
} else if (currentHour < 10) {
  time.innerHTML = `0${currentHour}:${currentMinutes}`;
} else if (currentMinutes < 10) {
  time.innerHTML = `${currentHour}:0${currentMinutes}`;
} else {
  time.innerHTML = `${currentHour}:${currentMinutes}`;
}
//conver cel to far
let celcius = document.querySelector("#celcius");

let showFarenheit = (function () {
  let flag = false;
  return function () {
    if (!flag) {
      flag = true;

      let degree = document.querySelector("#degree");
      let degreeNum = degree.innerHTML;
      let farenheitConver = Math.round(degreeNum * 1.8 + 32);
      degree.innerHTML = farenheitConver;
    }
  };
})();

let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click", showFarenheit);

let showCelcius = (function () {
  let flag = false;
  return function () {
    if (!flag) {
      flag = true;
      let degree = document.querySelector("#degree");
      let degreeNum = degree.innerHTML;
      let celciusConver = Math.round((degreeNum - 32) * 0.55);
      degree.innerHTML = celciusConver;
    }
  };
})();

celcius.addEventListener("click", showCelcius);
//search engine
//current
function showCurrentTempInHere(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showAllFeatures);
}
function showCurrentTemp() {
  navigator.geolocation.getCurrentPosition(showCurrentTempInHere);
}
let buttonSubmit = document.querySelector("#button-submit");
buttonSubmit.addEventListener("click", showCurrentTemp);
