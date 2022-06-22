var place = document.getElementsByClassName("location_name")[0];
place.defaultValue = "Sydney";
const API_KEY = "bb25e181b949c431bd57ca1ac7559d7a";
getPosition(place.value);

unit = document.getElementsByClassName("unit");
console.log(unit);
unit[0].style.fontWeight = "bold";
unit[0].onclick = change_to_celcius;
unit[1].onclick = change_to_farenheit;

function change_to_farenheit() {
    let temparature = document.getElementsByClassName("temperature_value")[0].innerText;
    document.getElementsByClassName("temperature_value")[0].innerText
      = ((parseFloat(temparature) * (9/5)) +32).toFixed(2);
    unit[0].style.fontWeight = "normal";
    unit[1].style.fontWeight = "bold";
};

function change_to_celcius() {
    let temparature = document.getElementsByClassName("temperature_value")[0].innerText;
    document.getElementsByClassName("temperature_value")[0].innerText
      = ((parseFloat(temparature) - 32) * (5/9)).toFixed(2);
    unit[0].style.fontWeight = "bold";
    unit[1].style.fontWeight = "normal";
};

document.querySelector("input").addEventListener("change", function () {
  place = document.getElementsByClassName("location_name")[0];
  getPosition(place.value);
});

function getPosition(city_name) {
  const geo_position = fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city_name}&appid=${API_KEY}`);
  geo_position.then( response => {
    return response.json();
  }).then(element => {
    lat = element[0].lat;
    lon = element[0].lon;
    getWeatherData(lat, lon);
  });
}

function getWeatherData(latitude, longitude) {
  const geo_weather = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
  geo_weather.then( response => {
    return response.json();
  }).then(element => {
    populateData(element);
  });
}

function populateData(data) {
  console.log(data.main.humidity);
  document.getElementsByClassName("temperature_value")[0].innerText = data.main.temp;
  document.getElementById("feels_like").innerText = data.main.feels_like;
  document.getElementById("humidity_value").innerText = data.main.humidity;
  document.getElementById("wind_speed_value").innerText = toKMperH(data.wind.speed);
  document.getElementsByClassName("forcast_heading")[0].innerText = data.weather[0].main;
  showClock();
  changeBackground(data.weather[0].main);
}

function showClock() {
  const date_now = new Date();
  const time_now = formatTime(date_now.getHours()) + ":" +  formatTime(date_now.getMinutes()) + ":" + formatTime(date_now.getSeconds());
  document.getElementsByClassName("date_time")[0].innerText = date_now.toDateString() + " " + time_now;
  setTimeout(showClock, 1000);
}

function toKMperH(speedVal) {
  // in meter per sec to Km/hour converter
  return (speedVal * 3600/1000).toFixed(2);
}

function formatTime(element) {
  if (parseInt(element) < 10) {
    element = "0" + element;
  }
  return element;
}

function changeBackground(forcast_heading) {
  switch(forcast_heading) {
    case "Clouds":
      document.getElementById("weather_icon").src = "./icons/Partial Cloudy.png";
      document.body.style.backgroundImage = "url('./images/clouds.jpg')";
    break;
    case "Clear":
      document.getElementById("weather_icon").src = "./icons/Sunny.png";
      document.body.style.backgroundImage = "url('./images/clear_sky.jpg')";
      break;
    case "Thunderstorm":
      document.getElementById("weather_icon").src = "./icons/Thunderstorm.png";
      document.body.style.backgroundImage = "url('./images/thunderstorm.jpg')";
      break;
    case "Drizzle":
      document.getElementById("weather_icon").src = "./icons/Rainy.png";
      document.body.style.backgroundImage = "url('./images/drizzle.jpeg')";
      break;
    case "Rain":
      document.getElementById("weather_icon").src = "./icons/Heavy Rainfall.png";
      document.body.style.backgroundImage = "url('./images/rain.jpg')";
      break;
    case "Haze":
    case "Fog":
    case "Mist":
      document.getElementById("weather_icon").src = "./icons/fog.png";
      document.body.style.backgroundImage = "url('./images/haze.jpeg')";
    break;
    default:
      document.getElementById("weather_icon").src = "./icons/Sunny.png";
      document.body.style.backgroundImage = "url('./images/sunny.jpg')";
  }
  document.body.style.backgroundRepeat = "no-repeat";
}