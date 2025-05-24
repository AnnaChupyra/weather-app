/*let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednersday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];
let date = now.getDate();
let months = [
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
let month = months[now.getMonth()];
let year = now.getFullYear();
let hours = now.getHours();
let minutes = now.getMinutes();

function currentDate() {
  let today = document.querySelector(".current-date");
  today.innerHTML = `${day} ${date}th ${month} ${year}, ${hours}:${minutes}`;
}

currentDate(new Date());

function currentCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".form-input");
  let city = document.querySelector(".current-city");
  city.innerHTML = searchInput.value;
}

let cityForm = document.querySelector(".form");
cityForm.addEventListener("submit", currentCity);

let degree = document.querySelector(".degree");
let degreeValue = degree.textContent;

function fahrenheiT(event) {
  event.preventDefault();
  degree.innerHTML = +degreeValue * 1.8 + 32;
}
let fahrenheit = document.querySelector(".fahrenheit");
fahrenheit.addEventListener("click", fahrenheiT);

function celsiuS(event) {
  event.preventDefault();
  degree.innerHTML = +degreeValue;
}
let celsius = document.querySelector(".celsius");
celsius.addEventListener("click", celsiuS);

let apiKey = "d25te0840b6ed82ad3bbo7b9360f4674";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityForm}&key=${apiKey}`;

function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.temperature.current);
  let temperatureElement = document.querySelector(".degree");
  temperatureElement.innerHTML = `${temperature}`;
}
axios.get(apiUrl).then(showTemperature);*/
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

  function fetchData(city) {
    const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(showTemperature);
  }

  function updateData(event) {
    const city = currentCity(event);
    fetchData(city);
  }

  cityForm.addEventListener("submit", updateData);
})();
