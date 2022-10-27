
function formatDate(timestamp){
  let currentDate = new Date(timestamp);
  console.log(timestamp);
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[currentDate.getDay()];
  
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let month = months[currentDate.getMonth()];

  let date = currentDate.getDate();
  let year = currentDate.getFullYear();
  
  let fullDate = `${day} ${month} ${date}, ${year}`;
  return `Last updated at <br> ${fullDate}`;
}

function formatTime(timestamp) {
  let currentDate = new Date(timestamp);
  console.log(timestamp);
  let hour = currentDate.getHours();
  console.log(hour);
  let minute = currentDate.getMinutes();

  if (hour < 10) {hour= "0"+ hour;}
  if (minute < 10) {minute= "0" + minute;}

  let time = hour + ":" + minute;

  return time;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return days[day];
}

function showMonthDate(timestamp){
  let currentDate = new Date(timestamp * 1000);
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
  forecast.forEach(function (forecastDay, index) {
    if (index >= 1 && index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title">${formatDay(forecastDay.dt)}
              </h3>
              <p class="card-text card-text-date" #month-date-forecast>${showMonthDate(forecastDay.dt)} 
              </p>
              <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                class="card-img-top"
                width="42"
              />
              <p class="card-text card-text-temp" id = "month-date-forecast">
                <span class="card-temp-max">${Math.round(forecastDay.temp.max
                )}°</span>
                <span class="card-temp-min"> ${Math.round(forecastDay.temp.min
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
  let apiKey = "502dc8f7ae36e57af1974e18d16a86f8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showCurrentWeather(response) {
  let city = response.data.name;
  let currentCity = document.querySelector("#search-city");
  currentCity.innerHTML = city;

  let temperatureElement = document.querySelector("#current-temp-now");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  let temperatureMaxElement =document.querySelector("#current-temp-max");
  let maxTemperature = response.data.main.temp_max;
  temperatureMaxElement.innerHTML = Math.round(maxTemperature);

  let temperatureMinElement =document.querySelector("#current-temp-min");
  let minTemperature = response.data.main.temp_min;
  temperatureMinElement.innerHTML = Math.round(minTemperature);

  let description =response.data.weather[0].main;
  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = description;

  let humidity = response.data.main.humidity;
  let currentHumidity= document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity}% 💧`;

  let wind = Math.round((response.data.wind.speed)*3.6);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `Wind: ${wind}km/h 💨`;

  let date = document.querySelector("#dayMonthYear");
  date.innerHTML = formatDate(response.data.dt * 1000);

  let time = document.querySelector("#hoursMinutes");
  time.innerHTML = formatTime(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) { 
  let apiKey = "502dc8f7ae36e57af1974e18d16a86f8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  axios.get(apiUrl).then(showCurrentWeather);
}

function handleSubmit(event){
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");

  let city= (searchInput.value).trim().toLowerCase();
  
  if (city !== "") {
    city = city.charAt(0).toUpperCase() + city.slice(1);
  } else {
    alert("Please, type city name 🏙️")
  };
  search(searchInput.value);
}

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp-now");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9)/5+32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

//   let mainTemperature = document.querySelector(".main-temp");
//   let mainMax = document.querySelector(".max");
//   let mainMin = document.querySelector(".min");
//   let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
//   let fahrenheitMax = (celsiusMax * 9) / 5 + 32;
//   let fahrenheitMin = (celsiusMin * 9) / 5 + 32;
//   mainTemperature.innerHTML = `${Math.round(fahrenheitTemperature)}º`;
//   mainMax.innerHTML = `${Math.round(fahrenheitMax)}º /`;
//   mainMin.innerHTML = `${Math.round(fahrenheitMin)}º`;
// }
}

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp-now");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link-current");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius-link-current");
celsiusLink.addEventListener("click", showCelsius);

search("Lutsk");

function showCurrentLocation(location) {
  let lat = location.coords.latitude;
  let lon = location.coords.longitude;
  let units = "metric";
  let apiKey = "502dc8f7ae36e57af1974e18d16a86f8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function getCurrentLocation(){
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let currentBtn= document.querySelector("#current-location");
currentBtn.addEventListener("click", getCurrentLocation);