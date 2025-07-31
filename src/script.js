(function () {
  const now = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const day = days[now.getDay()];
  const date = now.getDate();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  const apiKey = "d25te0840b6ed82ad3bbo7b9360f4674";
  const cityForm = document.querySelector(".form");
  const degree = document.querySelector(".degree");
  const fahrenheit = document.querySelector(".fahrenheit");
  const celsius = document.querySelector(".celsius");
  const humidity = document.querySelector(".Humidity");
  const wind = document.querySelector(".Wind");
  const feelsL = document.querySelector(".Feels_like");
  let lastTempShownAs = "C";
  let realDegree = 14;

  function currentDate() {
    const today = document.querySelector(".current-date");
    today.innerHTML = `${day} ${date}th ${month} ${year}, ${hours}:${minutes}`;
  }

  currentDate(new Date());

  function currentCity(event) {
    event.preventDefault();
    let searchInput = document.querySelector(".form-input");
    let city = document.querySelector(".current-city");
    city.innerHTML = searchInput.value;
    return searchInput.value;
  }

  function getDegreeValue() {
    return +degree.textContent;
  }

  function fahrenheiT(event) {
    event.preventDefault();
    event.target.classList.add("bold");
    celsius.classList.remove("bold");
    realDegree =
      lastTempShownAs !== "f" ? (realDegree * 9) / 5 + 32 : realDegree;
    console.log("fahrenheiT", realDegree);
    degree.innerHTML = Math.floor(realDegree);
    lastTempShownAs = "f";
  }

  fahrenheit.addEventListener("click", fahrenheiT);

  function celsiuS(event) {
    event.preventDefault();
    event.target.classList.add("bold");
    fahrenheit.classList.remove("bold");
    realDegree =
      lastTempShownAs !== "c" ? ((realDegree - 32) * 5) / 9 : realDegree;
    console.log("celsiuS", realDegree);
    degree.innerHTML = Math.floor(realDegree);
    lastTempShownAs = "c";
  }

  celsius.addEventListener("click", celsiuS);

  function showTemperature(response) {
    const temperature = Math.round(response.data?.temperature?.current || 0);
    degree.innerHTML = `${temperature}`;
    realDegree = temperature;
    celsius.classList.add("bold");
    fahrenheit.classList.remove("bold");
    lastTempShownAs = "c";
  }

  function showHumidity(response) {
    const humidityCurrent = response.data?.temperature?.humidity || 0;
    humidity.innerHTML = `Humidity: ${humidityCurrent}%`;
  }

  function showWind(response) {
    const windCurrent = response.data?.wind?.speed || 0;
    wind.innerHTML = `Wind: ${windCurrent} km/h`;
  }

  function feelsLike(response) {
    const feelsLikeCurrent = response.data?.temperature?.feels_like || 0;
    feelsL.innerHTML = `Feels Like: ${feelsLikeCurrent}`;
  }

  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
  }

  function getForecast(city) {
    const apiKey = "d25te0840b6ed82ad3bbo7b9360f4674";
    const apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
  }

  function displayForecast(response) {
    let forecastElement = document.querySelector(".week-weather-block");

    let forecastHtml = "";

    response.data.daily.forEach(function (day, index) {
      if (index < 5) {
        forecastHtml =
          forecastHtml +
          `<div class="week-weather-block-card">
        <p class="card-day">${formatDay(day.time)}</p>
        <img
          class="card-weather-icon"
          src="${day.condition.icon_url}"
          alt=""
        />
        <div class="card-degree">
          <p>${Math.round(day.temperature.maximum)}°</p>
          <p>${Math.round(day.temperature.minimum)}°</p>
        </div>
      </div>`;
      }
    });
    forecastElement.innerHTML = forecastHtml;
  }

  function todayForecast(response) {
    console.log(response);
    let todayForecastElement = document.querySelector(".weather-img");
    let today = response.data.condition;
    let iconUrl = today.icon_url;
    todayForecastElement.innerHTML = `<img class="weather-icon" src='${iconUrl}' alt='' />`;
  }

  function fetchData(city) {
    const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then((response) => {
      showTemperature(response);
      showHumidity(response);
      showWind(response);
      feelsLike(response);
      todayForecast(response);
    });
  }

  function updateData(event) {
    const city = currentCity(event);
    fetchData(city);
    getForecast(city);
  }

  cityForm.addEventListener("submit", updateData);
})();
