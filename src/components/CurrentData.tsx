import { useContext } from "react";
import { DataContext } from "../context/Dataprovider";
import { Icon } from "@iconify/react";

const CurrentData = () => {
  const { data, userAddress } = useContext(DataContext);
  const current_weather = data?.current_weather;
  const daily = data?.daily;
  const city  = userAddress?.city
  if (!data) {
    return null;
  }

  const getWeatherIcon = (weatherCode: number) => {
    switch (weatherCode) {
      case 0:
        return "line-md:sunny-loop";
      case 1:
      case 2:
      case 3:
        return "fluent-mdl2:cloudy";
      case 61:
      case 63:
      case 65:
        return "raphael:rain";
      case 95:
        return "material-symbols:thunderstorm";
      default:
        return "line-md:sunny-loop";
    }
  };
  return (
    <div className="bg-[#385372] p-4 text-white h-fit w-fit flex-1 flex flex-col gap-4">
      <h2 className="text-lg">Current Weather</h2>
      <div className="flex  justify-center items-center">
        <div>
          <h1 className="text-5xl font-bold">{city}</h1>
          <p className="text-3xl font-medium">
            {" "}
            {current_weather?.temperature}°C
          </p>
        </div>
        <div className=" h-full w-full flex-1 flex justify-center items-center ">
          <p>
            <Icon
              icon={`${getWeatherIcon(current_weather.weathercode)}`}
              className="text-[90px]"
            />
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="border-r-2 pr-2 border-slate-500">
          <Icon
            icon="carbon:temperature-max"
            className="text-red-500 text-[30px] inline"
          />
          <span className="text-gray-300 font-medium"> Temp Max: </span> <br />
          <span className="text-2xl"> {daily?.temperature_2m_max[0]}°C</span>
        </p>
        <p className="border-r-2 pr-2 border-slate-500">
          <Icon
            icon="carbon:temperature-min"
            className="text-slate-400 text-[30px] inline"
          />
          <span className="text-gray-300 font-medium"> Temp Min: </span> <br />
          <span className="text-2xl"> {daily?.temperature_2m_min[0]}°C</span>
        </p>
        <p className="border-r-2 pr-2 border-slate-500">
          {" "}
          <Icon
            icon="mdi:weather-windy"
            className="text-white text-[30px] inline"
          />{" "}
          <span className="text-gray-300 font-medium text-lg">Wind:</span>{" "}
          <br />
          <span className="text-2xl">{current_weather?.windspeed} km/h</span>
        </p>
        <p>
          <Icon icon="cil:rain" className="text-white text-[30px] inline" />
          <span className="text-gray-300 font-medium">
            {" "}
            Chance of Rain:{" "}
          </span>{" "}
          <br />
          <span className="text-2xl">{daily?.rain_sum[0]} %</span>
        </p>
      </div>
    </div>
  );
};

export default CurrentData;
