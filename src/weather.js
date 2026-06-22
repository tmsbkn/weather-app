import { parse, format } from 'date-fns';
export default class Weather {
   constructor(
      location,
      temp,
      atmosphere,
      wind,
      sun,
      precipitation,
      conditions,
      icon,
      description,
   ) {
      this.location = titleCase(location);
         
      this.temperature = {
         current: temp.current,
         feelsLike: temp.feelsLike,
         min: temp.min,
         max: temp.max,
      };
      this.atmosphere = {
         humidity: atmosphere.humidity,
         pressure: atmosphere.pressure,
         uvIndex: atmosphere.uvIndex,
      };
      this.wind = {
         speed: wind.speed,
         gust: wind.gust,
      };
      const sunriseDate = parse(sun.sunrise, 'HH:mm:ss', new Date());
      const sunriseString = format(sunriseDate, 'hh:mm a');
      const sunsetDate = parse(sun.sunset, 'HH:mm:ss', new Date());
      const sunsetString = format(sunsetDate, 'hh:mm a');
      this.sun = {
         sunrise: sunriseString,
         sunset: sunsetString,
      };
      this.precipitation = {
         precipType: precipitation.precipType,
         precipProb: precipitation.precipProb,
         precip: precipitation.precip,
      };
      this.conditions = conditions;
      this.icon = icon;
      this.description = description;
   }
}

function titleCase(string){
   const words = string.split(' ');
  
  const titleCaseString= words.map((word) => {
      return word[0].toUpperCase() + word.substring(1).toLowerCase();
   }).join(" ");
return titleCaseString
}