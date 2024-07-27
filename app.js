import { apiOpenweathermap } from "./apikey.js";
import { apiGeo } from "./apikey.js";

const mainContainer = document.querySelector(".main-container");
inputCity();

let success = function (data) {
  let lat = data.coords.latitude;
  let lon = data.coords.longitude;

  let weatherResult = currentLocation(lat, lon);
  weatherResult.then((data) => getWeather(data));
};

async function currentLocation(lat, lon) {
  const weather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiOpenweathermap}&units=metric`
  );
  const data = await weather.json();
  return data;
}

let error = function () {
  console.log("error");
  fetch("https://api.ipify.org/?format=json")
    .then((response) => response.json())
    .then((data) => getIp(data))
    .catch(errorPage());
};

navigator.geolocation.getCurrentPosition(success, error);

function getIp(json) {
  console.log(json.ip);
  fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=${apiGeo}&ipAddress=${json.ip}`
  )
    .then((response) => response.json())
    .then((data) => getData(data.location.region));
}

function inputCity() {
  mainContainer.innerHTML = "";
  mainContainer.innerHTML = `
  <form action="" id="find">
  <input type="text" id="add" placeholder="Type your city here" />
  <input type="submit" value="Find" />
  </form>
  `;

  const form = document.querySelector("#find");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let cityName = document.querySelector("#add").value.trim();

    if (cityName != "") {
      getData(cityName);
    }
  });
}

async function getData(cityName) {
  const weather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api}&units=metric`
  );
  const data = await weather.json();

  if (data.cod === "404") {
    errorPage();
  } else {
    getWeather(data);
  }
}

function getWeather(data) {
  const name = data.name;
  const temp = Math.ceil(data.main.temp);
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;

  mainContainer.innerHTML = "";
  mainContainer.innerHTML = `
    <div class="step-2">
    <img class="picture" src="https://openweathermap.org/img/wn/${icon}@4x.png" alt="" />
        <div class="degrees">${temp}<span>&#176;C</span></div>
        <div class="condition">${description} in ${name}</div>
        <button id="change">Change city</button>
    </div>
  `;
  const changeCity = document.querySelector("#change");

  changeCity.addEventListener("click", function (event) {
    event.preventDefault();
    inputCity();
  });
}

function errorPage() {
  mainContainer.innerHTML = "";
  mainContainer.innerHTML = `
<div class="step-3"> 
<h1>ERROR!</h1>
<button id="try-again">Try again</button>
</div>
`;
  const tryAgain = document.querySelector("#try-again");
  tryAgain.addEventListener("click", function (event) {
    event.preventDefault();
    inputCity();
  });
}
