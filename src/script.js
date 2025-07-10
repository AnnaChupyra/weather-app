(function () {
  const now = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednersday",
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
    degree.innerHTML = getDegreeValue() * 1.8 + 32;
  }

  fahrenheit.addEventListener("click", fahrenheiT);

  function celsiuS(event) {
    event.preventDefault();
    degree.innerHTML = getDegreeValue();
  }

  celsius.addEventListener("click", celsiuS);

  function showTemperature(response) {
    const temperature = Math.round(response.data?.temperature?.current || 0);
    degree.innerHTML = `${temperature}`;
  }

  function showHumidity(response) {
    const humidityCurrent = response.data?.temperature?.humidity || 0;
    humidity.innerHTML = `Humidity: ${humidityCurrent}%`;
  }

  function showWind(response) {
    const windCurrent = response.data?.wind?.speed || 0;
    wind.innerHTML = `Wind: ${windCurrent}km/h`;
  }

  function feelsLike(response) {
    const feelsLikeCurrent = response.data?.temperature?.feels_like || 0;
    feelsL.innerHTML = `Feels Like ${feelsLikeCurrent}`;
  }

  function fetchData(city) {
    const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(showTemperature);
    axios.get(apiUrl).then(showHumidity);
    axios.get(apiUrl).then(showWind);
    axios.get(apiUrl).then(feelsLike);
  }

  function updateData(event) {
    const city = currentCity(event);
    fetchData(city);
  }

  cityForm.addEventListener("submit", updateData);
})();
