const getWeatherIcon = (weatherCode: number) => {
  switch (weatherCode) {
    case 0:
      return "line-md:sunny";
    case 1:
      return "fluent:sunny";
    case 2:
      return "mdi:weather-partly-cloudy";
    case 3:
      return "fluent-mdl2:cloudy";
    case 61:
      return "fluent:weather-rain-snow-24-filled";
    case 63:
      return "fluent:heavy-rain";
    case 65:
      return "game-icons:heavy-rain";
    case 71:
      return "mdi:snowflake";
    case 73:
      return "mdi:weather-snowy";
    case 75:
      return "mdi:heavy-snow";
    case 80:
      return "fluent:weather-rain-showers-day-48-filled";
    case 82:
      return "fluent:heavy-rain";
    case 95:
      return "material-symbols:thunderstorm";
    case 96:
      return "meteocons:thunderstorms-day-snow-fill";
    case 99:
      return "material-symbols:thunderstorm";
    default:
      return "line-md:sunny";
  }
};


export default getWeatherIcon