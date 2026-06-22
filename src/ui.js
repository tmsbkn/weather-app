import app from './app.js';

const uiController = (() => {
   async function fetchWeather(form, location, errorMessageDiv) {
      errorMessageDiv.textContent = '';

      try {
         const data = await app.fetchWeather(location);
         app.parseWeather(data);
         const weather = app.getCurrentWeather();
         
         if (weather) {
            displayWeather(weather);

            showReadyView();
         }
      } catch (error) {
         if (error.message === 'Bad input: weather-fetch failed!') {
            errorMessageDiv.textContent =
               'Bad input: weather-fetch failed! Please try a valid input.';
         } else
            errorMessageDiv.textContent =
               'Network Error! Please try again another time.';
      } finally {
         form.reset();
      }
   }
   function idleFormHandler(event) {
      event.preventDefault();
      console.log("idle form submitted");
      
      const form = event.currentTarget;
      
      
      //validate form-fields
      const searchBar = document.getElementById('location-input-idle');
      
      
      validateLocation(searchBar);
      if (!form.checkValidity()) {
         form.reportValidity();
         return;
      }

      const location = document.getElementById('location-input-idle').value;
   
      console.log(location);
      
      const errorMessageDiv = document.getElementById('search-error-idle');
      fetchWeather(form, location, errorMessageDiv);
   }

   function readyFormHandler(event) {
      event.preventDefault();

      const form = event.currentTarget;

      const searchBar = document.getElementById('location-input');
      validateLocation(searchBar);
      if (!form.checkValidity()) {
         form.reportValidity();
         return;
      }

      const location = document.getElementById('location-input').value;
      const errorMessageDiv = document.getElementById('search-error-ready');
      fetchWeather(form, location, errorMessageDiv);
   }

   function showIdleView() {
      const idleSection = document.getElementById('app-idle');
      const readySection = document.getElementById('app-ready');
      readySection.classList.add('hide');
      idleSection.classList.remove('hide');
   }

   function showReadyView() {
      const idleSection = document.getElementById('app-idle');
      const readySection = document.getElementById('app-ready');
      idleSection.classList.add('hide');
      readySection.classList.remove('hide');
   }

   function developMainSection(weather) {
      const currentUnit = app.getCurrentUnit();
      const temperature = document.getElementById('temp-current');
      const location = document.getElementById('location');
      const condition = document.getElementById('condition');
      const feelsLike = document.getElementById('temp-feels');
      const description = document.getElementById('description');
      const tempMin = document.getElementById('temp-min');
      const tempMax = document.getElementById('temp-max');

      temperature.textContent = `${(currentUnit)==="C" ? app.convertToCelsius(weather.temperature.current): weather.temperature.current}°`;
      location.textContent = weather.location;
      condition.textContent = weather.condition;
      feelsLike.textContent = `Feels like ${(currentUnit)==="C" ? app.convertToCelsius(weather.temperature.feelsLike): weather.temperature.feelsLike}°`;
      description.textContent = weather.description;
      tempMin.textContent = `${(currentUnit)==="C" ? app.convertToCelsius(weather.temperature.min): weather.temperature.min}°`;
      tempMax.textContent = `${(currentUnit)==="C" ? app.convertToCelsius(weather.temperature.max): weather.temperature.max}°`;
   }

   function developMetricsSection(weather) {
      const humidity = document.getElementById('humidity');
      const pressure = document.getElementById('pressure');
      const uvIndex = document.getElementById('uvIndex');
      const wind = document.getElementById('wind');
      const gust = document.getElementById('gust');
      const sunrise = document.getElementById('sunrise');
      const sunset = document.getElementById('sunset');

      humidity.textContent = `${weather.atmosphere.humidity}%`;
      pressure.textContent = `${weather.atmosphere.pressure} mb`;
      uvIndex.textContent = weather.atmosphere.uvIndex;
      wind.textContent = `${weather.wind.speed} mph`;
      gust.textContent = `${weather.wind.gust === null ? '-' : weather.wind.gust + ' mph'}`;
      sunrise.textContent = weather.sun.sunrise;
      sunset.textContent = weather.sun.sunset;

      const precipType = document.getElementById('precip-type');
      const precipProb = document.getElementById('precip-prob');
      const precipAmount = document.getElementById('precip-amount');

      precipType.textContent = `${!weather.precipitation.precipType || weather.precipitation.precipType.length === 0 ? 'no precipitation' : weather.precipitation.precipType.join(' & ')}`;
      precipProb.textContent = `${weather.precipitation.precipProb}%`;
      precipAmount.textContent = `${weather.precipitation.precip === null ? '0' : Math.round(weather.precipitation.precip * 100) / 100}`;
   }
   function displayWeather(weather){
      developMainSection(weather);
      developMetricsSection(weather);
   }

   function validateLocation(searchBar) {
      // 1. reset custom validity
      searchBar.setCustomValidity('');

      // 2. check validity and set custom validity
      if (!searchBar.value.trim())
         searchBar.setCustomValidity("Location can't be empty!");
   }

   function setEventListeners() {
      // idle view: searchbar, custom validity
      const idleForm = document.getElementById('search-form-idle');
      idleForm.addEventListener('submit', idleFormHandler);
      const idleSearchBar = document.getElementById('location-input-idle');
      idleSearchBar.addEventListener('input', () => {
         validateLocation(idleSearchBar);
      });
      const readyForm = document.getElementById('search-form');
      readyForm.addEventListener('submit', readyFormHandler);
      const readySearchBar = document.getElementById('location-input');
      readySearchBar.addEventListener('input', () => {
         validateLocation(readySearchBar);
      });

      const unitBtnC = document.getElementById("unit-C");
        const unitBtnF = document.getElementById("unit-F");
        unitBtnC.addEventListener("click", () => {
            if (app.getCurrentUnit() === "C")
                return;

            unitBtnC.classList.add("unit-toggle__btn--active");
            unitBtnF.classList.remove("unit-toggle__btn--active");

            app.setCelsius();
            const weather = app.getCurrentWeather();
            displayWeather(weather);
        });
        unitBtnF.addEventListener("click", () => {
            if (app.getCurrentUnit() === "F")
                return;

            unitBtnF.classList.add("unit-toggle__btn--active");
            unitBtnC.classList.remove("unit-toggle__btn--active");

            app.setFarenheit();
            const weather = app.getCurrentWeather();
            displayWeather(weather);
        });
   }

   function initApp() {
      setEventListeners();
      showIdleView();
   }

   return { initApp, showReadyView };
})();

export default uiController;
