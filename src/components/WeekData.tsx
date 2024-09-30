import { useContext } from "react";
import { DataContext } from "../context/Dataprovider";
import { Icon } from "@iconify/react";

const WeekData = () => {
  const { data } = useContext(DataContext);
  const daily = data?.daily;
  if (!data) {
    return null;
  }

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
        return "fluent:rain-showers";
      case 63:
        return "fluent:heavy-rain";
      case 65:
        return "material-symbols:heavy-rain";
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
        return "material-symbols:thunderstorm-with-hail";
      case 99:
        return "material-symbols:thunderstorm";
      default:
        return "line-md:sunny";
    } 
  };

  const getDayName = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };
  return (
    <div className="flex-1 p-4 bg-[#385372] text-white">
      <h2>7-Days Forecast</h2> <br />
      <div className="flex flex-col  gap-2 l">
        {daily?.time.map((date: string, index: number) => (
          <div key={index} className="flex justify-between border-b-2 border-slate-400 py-2 px-4 cursor-pointer">
            <h3 className="flex-1 font-medium">{getDayName(date)}</h3>{" "}
            <p className="flex-1">
              <Icon
                icon={`${getWeatherIcon(daily?.weather_code[index])}`}
                className="text-[30px]"
              />
            </p>
            {/* <p>Weather Code: {daily?.weather_code[index]}</p> */}
            <div className="flex items-end flex-1 justify-end ">
              <p className="font-medium">
                {daily?.temperature_2m_max[index]} /{" "}
              </p>
              <p className="text-sm ">{daily?.temperature_2m_min[index]} °C</p>
            </div>
            {/* <p>
              Average Temp:{" "}
              {calculateAverageTemp(
                daily?.temperature_2m_min[index],
                daily?.temperature_2m_max[index]
              )}
              °C
            </p> */}
            {/* <p>Rain: {daily?.rain_sum[index]} mm</p> */}
            {/* <p>UV Index Max: {daily?.uv_index_max[index]}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekData;
