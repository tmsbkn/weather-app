export default class Weather {
    constructor (location, temp, atmosphere, wind, sun, precipitation, conditions, icon, description){
        this.location = location;
        this.temperature = {
            current = temp.current,
            feelsLike = temp.feelsLike,
            min = temp.min,
            max = temp.max,
        };
        this.atmosphere = {
            humidity = atmosphere.humidity,
            pressure = atmosphere.pressure,
            uvIndex = atmosphere.uvIndex,
        };
        this.wind = {
            speed = wind.speed,
            gust = wind.gust,
        };
        this.sun = {
            sunrise = sun.sunrise,
            sunset = sun.sunset,
        };
        this.precipitation = precipitation;
        this.conditions = conditions;
        this.icon = icon;
        this.description = description;
    }
}