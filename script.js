var searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;
  var formatInputVal = document.querySelector('#format-input').value;

  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }

  var queryString = './search-results.html?q=' + searchInputVal + '&format=' + formatInputVal;

  location.assign(queryString);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);



// Define your OpenWeatherMap API key
const apiKey = 'f48bb57b07562917281a38e3b5b36c22';

// Function to fetch weather data from the API
function fetchWeatherData(cityName) {
  const currentWeather = document.getElementById('current-weather');
  const forecast = document.getElementById('forecast');

  // Fetch current weather data
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey)
    .then((response) => response.json())
    .then((data) => {
      const windSpeedEl = document.getElementById('currentWindspeed');
      const humidityEl = document.getElementById('currentHumidity');
      const tempEl = document.getElementById('currentTemp');
      
      windSpeedEl.textContent = `Wind Speed: ${data.wind.speed} m/s`;
      humidityEl.textContent = `Humidity: ${data.main.humidity}%`;
      tempEl.textContent = `Temperature: ${Math.round(data.main.temp - 273.15)}°C`;
    })
    .catch((error) => console.error('Error fetching current weather data:', error));

  // Fetch 5-day forecast data
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      // Assume that data.list contains an array of forecasts for each day
      for (let i = 0; i < 5; i++) {
        const dayForecast = data.list[i];
        const dayEl = document.getElementById(`Day${i + 1}`);
        
        if (dayForecast) {
          const windSpeedEl = document.getElementById(`Day${i + 1}Windspeed`);
          const humidityEl = document.getElementById(`Day${i + 1}Humidity`);
          const tempEl = document.getElementById(`Day${i + 1}Temp`);

          windSpeedEl.textContent = `Wind Speed: ${dayForecast.wind.speed} m/s`;
          humidityEl.textContent = `Humidity: ${dayForecast.main.humidity}%`;
          tempEl.textContent = `Temperature: ${Math.round(dayForecast.main.temp - 273.15)}°C`;
        } else {
          dayEl.textContent = 'No data available.';
        }
      }
    })
    .catch((error) => console.error('Error fetching 5-day forecast data:', error));
}

// Add an event listener to the search form
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const cityName = document.getElementById('city-input').value.trim();
  if (cityName === '') return;

  // Call the fetchWeatherData function with the entered city name
  fetchWeatherData(cityName);
});

// Update search history 
function updateSearchHistory(cityName) {
  // Add cityName to a search history list
  // Update the search history UI
}


