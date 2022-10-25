// Current date

setInterval(function(){
  let currentDate = new Date();
  console.log(currentDate);
  
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[currentDate.getDay()];
  
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let month = months[currentDate.getMonth()];
  console.log(month);
  
  let date = currentDate.getDate();
  let year = currentDate.getFullYear();
  
  let fullDate = `${day} ${month} ${date}, ${year}`;
  
  let nowDate = document.querySelector("#dayMonthYear");
  nowDate.innerHTML = fullDate;
}, 1000);


// Current time

setInterval(function() {
  let date = new Date(); 
  let hour = date.getHours();
  let minute = date.getMinutes();

  if (hour < 10) hour= "0"+ hour;
  if (minute < 10) minute= "0" + minute;

  let time = hour + ":" + minute;

  let nowTime = document.querySelector("#hoursMinutes");
  nowTime.innerHTML = time;
}, 1000);


// Search city

function handleSubmit(event){
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");

  let city= (searchInput.value).trim().toLowerCase();
  
  if (city !== "") {
    city = city.charAt(0).toUpperCase() + city.slice(1);
  } else {
    alert("Please, type city name 🏙️")
  };
  
  let units = "metric";
  let apiKey = "502dc8f7ae36e57af1974e18d16a86f8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentWeather);
}

let form = document.querySelector("#search-form");

form.addEventListener("submit", handleSubmit);


// Current temperature

function showCelsius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector(".current-temp-now");
  let formulaCelsius = currentTemp.innerHTML;
  formulaCelsius = Number(formulaCelsius);
  currentTemp.innerHTML = Math.round((formulaCelsius - 32)/ 1.8);
}

let tempCelsius = document.querySelector("#celsius-link-current");
tempCelsius.addEventListener("click", showCelsius);

function showFahrenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector(".current-temp-now");
  let formulaFahrenheit = currentTemp.innerHTML;
  formulaFahrenheit = Number(formulaFahrenheit);
  currentTemp.innerHTML = Math.round((formulaFahrenheit * 9)/5+32);
}

let tempFahrenheit = document.querySelector("#fahrenheit-link-current");
tempFahrenheit.addEventListener("click", showFahrenheit);


// Current weather

function showCurrentWeather(response) {
  
  let city = response.data.name;
  let currentCity = document.querySelector("#search-city");
  currentCity.innerHTML = city;

  let temp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector(".current-temp-now");
  currentTemp.innerHTML = temp;

  let description =response.data.weather[0].main;
  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = description;

  let humidity = response.data.main.humidity;
  let currentHumidity= document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity}% 💧`;

  let wind = Math.round((response.data.wind.speed)*3.6);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `Wind: ${wind}km/h 💨`;
}


// Current location + weather

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