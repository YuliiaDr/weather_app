// Current date

function formatDate(timestamp){
  let currentDate = new Date(timestamp);
  
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
  let hour = currentDate.getHours();
  let minute = currentDate.getMinutes();

  if (hour < 10) hour= "0"+ hour;
  if (minute < 10) minute= "0" + minute;

  let time = hour + ":" + minute;

  return (time);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return days[day];
}
// setInterval(clock, 1000);
// clock();

// }, 1000);

// Searched date

// function formatDate(timestamp){   
//   // setInterval(function(){
//     let currentDate = new Date(timestamp);
    
//     let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     let day = days[currentDate.getDay()];
    
//     let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//     let month = months[currentDate.getMonth()];
    
//     let date = currentDate.getDate();
//     let year = currentDate.getFullYear();

//     let hour = currentDate.getHours();
//     if (hour < 10) {hour= "0"+ hour;}
//     let minute = currentDate.getMinutes();
//     if (minute < 10) {minute= "0" + minute};

//     let time = hour + ":" + minute;
    
//     return `${day} ${month} ${date}, ${year}    ${time}`; 
    // let nowDate = document.querySelector("#dayMonthYear");
    // nowDate.innerHTML = fullDate;

    // let hour = currentDate.getHours();
    // let minute = currentDate.getMinutes();

    // if (hour < 10) hour= "0"+ hour;
    // if (minute < 10) minute= "0" + minute;

    // let time = hour + ":" + minute;

    // let nowTime = document.querySelector("#hoursMinutes");
    // nowTime.innerHTML = time;
  // }, 1000);
// }

// Searched time

// Current time

// setInterval(function() {
//   let date = new Date(); 
//   let hour = date.getHours();
//   let minute = date.getMinutes();

//   if (hour < 10) hour= "0"+ hour;
//   if (minute < 10) minute= "0" + minute;

//   let time = hour + ":" + minute;

//   let nowTime = document.querySelector("#hoursMinutes");
//   nowTime.innerHTML = time;
// }, 1000);


// Search city

// function handleSubmit(event){
//   event.preventDefault();
//   let searchInput = document.querySelector("#search-text-input");

//   let city= (searchInput.value).trim().toLowerCase();
  
//   if (city !== "") {
//     city = city.charAt(0).toUpperCase() + city.slice(1);
//   } else {
//     alert("Please, type city name 🏙️")
//   };
  
//   let units = "metric";
//   let apiKey = "502dc8f7ae36e57af1974e18d16a86f8";
//   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
//   axios.get(apiUrl).then(showCurrentWeather);
// }

// let form = document.querySelector("#search-form");

// form.addEventListener("submit", handleSubmit);


// // Current temperature

// function showCelsius(event) {
//   event.preventDefault();
//   let currentTemp = document.querySelector(".current-temp-now");
//   let formulaCelsius = currentTemp.innerHTML;
//   formulaCelsius = Number(formulaCelsius);
//   currentTemp.innerHTML = Math.round((formulaCelsius - 32)/ 1.8);
// }

// let tempCelsius = document.querySelector("#celsius-link-current");
// tempCelsius.addEventListener("click", showCelsius);

// function showFahrenheit(event) {
//   event.preventDefault();
//   let currentTemp = document.querySelector(".current-temp-now");
//   let formulaFahrenheit = currentTemp.innerHTML;
//   formulaFahrenheit = Number(formulaFahrenheit);
//   currentTemp.innerHTML = Math.round((formulaFahrenheit * 9)/5+32);
// }

// let tempFahrenheit = document.querySelector("#fahrenheit-link-current");
// tempFahrenheit.addEventListener("click", showFahrenheit);


// // Current weather

// function showCurrentWeather(response) {
  
//   let city = response.data.name;
//   let currentCity = document.querySelector("#search-city");
//   currentCity.innerHTML = city;

//   let temp = Math.round(response.data.main.temp);
//   let currentTemp = document.querySelector(".current-temp-now");
//   currentTemp.innerHTML = temp;

//   let description =response.data.weather[0].main;
//   let currentDescription = document.querySelector("#description");
//   currentDescription.innerHTML = description;

//   let humidity = response.data.main.humidity;
//   let currentHumidity= document.querySelector("#humidity");
//   currentHumidity.innerHTML = `Humidity: ${humidity}% 💧`;

//   let wind = Math.round((response.data.wind.speed)*3.6);
//   let currentWind = document.querySelector("#wind");
//   currentWind.innerHTML = `Wind: ${wind}km/h 💨`;

//   let nowDate = document.querySelector("#dayMonthYear");
//   nowDate.innerHTML = formatDate(response.data.dt * 1000);
// }


// // Current location + weather

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
              <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                class="card-img-top"
                width="42"
              />
              <p class="card-text card-text-temp">
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
  let units = "metric";
  let apiKey = "502dc8f7ae36e57af1974e18d16a86f8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function showCurrentWeather(response) {
  let city = response.data.name;
  let currentCity = document.querySelector("#search-city");
  currentCity.innerHTML = city;

  let temperatureElement = document.querySelector("#current-temp-now");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  // let temperatureMaxElement =document.querySelector("#current-temp-max");
  // let maxTemperature = response.data.main.temp_max;
  // temperatureMaxElement.innerHTML = Math.round(maxTemperature);

  // let temperatureMinElement =document.querySelector("#current-temp-min");
  // let minTemperature = response.data.main.temp_min;
  // temperatureMinElement.innerHTML = Math.round(minTemperature);

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
  let units = "metric";
  let apiKey = "502dc8f7ae36e57af1974e18d16a86f8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
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

  // let temperatureMaxElement =document.querySelector("#current-temp-max");
  // let maxTemperature = response.data.main.temp_max;
  // console.log(maxTemperature);
  // temperatureMaxElement.innerHTML = Math.round((maxTemperature* 9)/5+32);

  // let temperatureMinElement =document.querySelector("#current-temp-min");
  // let minTemperature = response.data.main.temp_min;
  // temperatureMinElement.innerHTML = Math.round((minTemperature* 9)/5+32);    
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