let api = "APIKEY";

const mainContainer = document.querySelector(".main-container");
inputCity();

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

  mainContainer.innerHTML = "";
  mainContainer.innerHTML = `
    <div class="step-2">
        <div class="degrees">${temp}<span>&#176;C</span></div>
        <div class="condition">${description} in ${name}</div>
        <button id="change">Change city</button>
    </div>
  `;
  /*const test = document.querySelector("#test");*/
  const changeCity = document.querySelector("#change");

  changeCity.addEventListener("click", function (event) {
    event.preventDefault();
    inputCity();
  });

  /*test.addEventListener("click", function (event) {
    event.preventDefault();
    errorPage();
  });*/
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
