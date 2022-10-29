
function formatDate(){
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[currentDate.getDay()];
  
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let month = months[currentDate.getMonth()];

  let date = currentDate.getDate();
  let year = currentDate.getFullYear();
  
  let fullDate = `${day} ${month} ${date}, ${year}`;
  return `Last updated at <br> ${fullDate}`;
}

function formatTime() {
  let hour = currentDate.getHours();
  let minute = currentDate.getMinutes();

  if (hour < 10) {hour= "0"+ hour;}
  if (minute < 10) {minute= "0" + minute;}

  let time = hour + ":" + minute;

  return time;
}

let currentDate = new Date();
let dateElement = document.querySelector("#dayMonthYear");
dateElement.innerHTML = formatDate();
let timeElement = document.querySelector("#hoursMinutes");
timeElement.innerHTML = formatTime();


function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return days[day];
}

function showMonthDate(timestamp){
  currentDate = new Date(timestamp * 1000);
  let month = Number(currentDate.getMonth())+1;
  date = currentDate.getDate();
  if (date < 10) date= "0"+ date;
  if (month < 10) date= "0"+ month;
  let monthDate = `${month} / ${date}`;
  return (monthDate);
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row row-cols-1 row-cols-md-5 g-5">`;
  forecast.forEach (function (forecastDay, index) {
    if (index >=1 && index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title">${formatDay(forecastDay.time)}
              </h3>
              <p class="card-text card-text-date" #month-date-forecast>${showMonthDate(forecastDay.time)} 
              </p>
              <img
              src="${
                forecastDay.condition.icon_url
              }"
                alt= "";
                class = "card-img-top"
                width="42"
              />
              <p class="card-text card-text-temp" id = "month-date-forecast">
                <span class="card-temp-max">${Math.round(forecastDay.temperature.maximum
                )}°</span>
                <span class="card-temp-min"> ${Math.round(forecastDay.temperature.minimum
                )}° </span>
              </p>
            </div>
          </div>
        </div>
        `;
    }
});

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function showCurrentWeather(response) {
  cityInputElement = response.data.city;
  console.log(cityInputElement);
  let currentCity = document.querySelector("#search-city");
  
  if(cityInputElement === undefined) {
    alert(`Are you sure you provided us with the city name 🏙️ and it is correct? If so, we are sorry, but we don't know the weather for this city. Try going to https://www.google.com/search?q=weather+${cityInputElement}. Good luck!`);
    currentCity.innerHTML = `Ooops, try again ⚠️`;
  } else {
    currentCity.innerHTML = cityInputElement;
  }
  
  // let dateTimeElement = response.data.dt *1000;
  // console.log(dateTimeElement);
  // let timezoneElement = response.data.timezone * 1000;
  // console.log(timezoneElement);
  // let newDate= new Date(response.data.dt*1000-(response.data.timezone));
  // console.log(newDate);

  let temperatureElement = document.querySelector("#current-temp-now");
  celsiusTemperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  let feelsLikeTemperature= document.querySelector("#feels-like");
  feelsLikeTemperatureElement = Math.round(response.data.temperature.feels_like)
  feelsLikeTemperature.innerHTML = `Feels like: ${feelsLikeTemperatureElement}°`;

  // let temperatureMaxElement =document.querySelector("#current-temp-max");
  // let maxTemperature = response.data.main.temp_max;
  // temperatureMaxElement.innerHTML = Math.round(maxTemperature);

  // let temperatureMinElement =document.querySelector("#current-temp-min");
  // let minTemperature = response.data.main.temp_min;
  // temperatureMinElement.innerHTML = Math.round(minTemperature);

  let description =response.data.condition.description;
  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = description;

  let humidity = response.data.temperature.humidity;
  let currentHumidity= document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity}% 💧`;

  let currentWind = document.querySelector("#wind");
  let wind = response.data.wind.speed;

  if (units === "metric") {
    wind = Math.round(response.data.wind.speed * 3.6);
    currentWind.innerHTML = `Wind: ${wind}km/h 💨`;
  } else if (units === "imperial") {
    wind = Math.round(response.data.wind.speed);
    console.log(wind);
    currentWind.innerHTML = `Wind: ${wind}mph 💨`;
  }
  
  let iconElement = document.querySelector("#icon");
  
  iconElement.setAttribute(
    "src",
    response.data.condition.icon_url,
  );
  iconElement.setAttribute("alt", response.data.condition.icon);

  getForecast(response.data.coordinates);
}

function search(city) { 
  
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  
  axios.get(apiUrl).then(showCurrentWeather);
  // .catch(err => {
  //     alert(
  //       `Are you sure you didn't forget to write your city name and it is correct?🏙️ If so, we are sorry, but we don't know the weather for this city. Try going to https://www.google.com/search?q=weather+${city}. Good luck!`);
  // });
}

function handleSubmit(event){
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");

  let cityInputElement= (searchInput.value).trim().toLowerCase();
  
  // if (cityInputElement === "") {
  //   alert("Please, type city name 🏙️")
  // } else {
    cityInputElement = cityInputElement.charAt(0).toUpperCase() + cityInputElement.slice(1);
  // };

  search(cityInputElement);
}


function showCurrentLocation(location) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${location.coords.longitude}&lat=${location.coords.latitude}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentWeather);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function getCurrentLocation(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let currentBtn= document.querySelector("#current-location");
currentBtn.addEventListener("click", getCurrentLocation);


function showFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  units = "imperial";
  search(cityInputElement);
}

function showCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  units = "metric";
  search(cityInputElement);
}

let celsiusTemperature = null;
let cityInputElement = "";
let units = "metric";
let apiKey = "9422f0o3bf27abc2b46fcabt0cf2c5f3";

let fahrenheitLink = document.querySelector("#fahrenheit-link-current");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius-link-current");
celsiusLink.addEventListener("click", showCelsius);

search("Kyiv");