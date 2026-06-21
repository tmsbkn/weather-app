import Weather from './weather.js';

const app = (() => {
   const key = 'MWR6Z6RGNMP6WH5SP9P2S997P';
   let currentWeather = null;

   const getCurrentWeather = () => {
      return currentWeather;
   };
   const fetchWeather = async (location) => {
      const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${key}`;

      const response = await fetch(url);
      if (!response.ok) {
         throw new Error('Bad input: weather-fetch');
      }
      const data = await response.json();
      return data;
   };

   const parseWeather = (data) => {
      const location = data.resolvedAddress;
      const temp = {
         current: data.currentConditions.temp,
         feelsLike: data.currentConditions.feelsLike,
         min: data.days[0].tempmin,
         max: data.days[0].tempmax,
      };
      const atmosphere = {
         humidity: data.currentConditions.humidity,
         pressure: data.currentConditions.pressure,
         uvIndex: data.currentConditions.uvindex,
      };
      const wind = {
         speed: data.currentConditions.windspeed,
         gust: data.currentConditions.windgust,
      };
      const sun = {
         sunrise: data.currentConditions.sunrise,
         sunset: data.currentConditions.sunset,
      };
      const precipitation = {
         precipType: data.currentConditions.preciptype,
         precipProb: data.currentConditions.precipprob,
         precip: data.currentConditions.precip,
      };
      const condition = data.currentConditions.conditions;
      const icon = data.currentConditions.icon;
      const desc = data.days[0].description;

      const weather = new Weather(
         location,
         temp,
         atmosphere,
         wind,
         sun,
         precipitation,
         condition,
         icon,
         desc,
      );
      currentWeather = weather;

      console.log(currentWeather);
   };
   return { fetchWeather, parseWeather, getCurrentWeather };
})();

export default app;
