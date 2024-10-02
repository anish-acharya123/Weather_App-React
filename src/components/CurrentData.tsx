import { useContext } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../context/Dataprovider";
import getWeatherIcon from "../services/GetIcons";
import { Icon } from "@iconify/react";

interface props {
  searchData: object | undefined;
  current_data: object | undefined;
}
const CurrentData: React.FC<props> = ({ searchData, current_data }) => {
  const { district } = useParams();
  const { data, userAddress } = useContext(DataContext);

  let daily;
  let city;
  let current_weather;
  if (searchData === undefined) {
    current_weather = data?.current_weather;
    daily = data?.daily;
    city = userAddress?.city;
  } else {
    daily = searchData;
    city = district;
    current_weather = current_data;
  }

  return (
    <div className="bg-[#385372] h-fit p-4 text-white  w-fit flex-1 flex justify-center flex-col gap-4">
      <h2 className="text-2xl">
        Current Weather{" "}
        <span className="text-sm">
          {"( "}
          {daily?.time[0]}
          {" )"}
        </span>
      </h2>
      <div className="flex  justify-center items-center">
        <div>
          <h1 className="text-5xl font-bold">{city}</h1>
          <p className="text-6xl font-medium">
            {" "}
            {current_weather?.temperature}°C
          </p>
        </div>
        <div className=" h-full w-full flex-1 flex justify-center items-center ">
          <p>
            <Icon
              icon={`${getWeatherIcon(current_weather?.weathercode)}`}
              className="text-[90px]"
            />
          </p>
        </div>
      </div>
      <div className=" grid grid-cols-3 gap-10 items-center">
        <p className="border-r-2 pr-2 border-slate-500">
          <Icon
            icon="carbon:temperature-max"
            className="text-red-500 text-[30px] inline"
          />
          <span className="text-gray-300 font-medium text-2xl">
            {" "}
            Temp Max:{" "}
          </span>{" "}
          <br />
          <span className="text-2xl"> {daily?.temperature_2m_max[0]}°C</span>
        </p>
        <p className="border-r-2 pr-2 border-slate-500">
          <Icon
            icon="carbon:temperature-min"
            className="text-slate-400 text-[30px] inline"
          />
          <span className="text-gray-300 font-medium text-2xl">
            {" "}
            Temp Min:{" "}
          </span>{" "}
          <br />
          <span className="text-2xl"> {daily?.temperature_2m_min[0]}°C</span>
        </p>
        <p>
          {" "}
          <Icon
            icon="mdi:weather-windy"
            className="text-white text-[30px] inline"
          />{" "}
          <span className="text-gray-300 font-medium  text-2xl">Wind:</span>{" "}
          <br />
          <span className="text-2xl">{current_weather?.windspeed} km/h</span>
        </p>
        <p className="border-r-2 pr-2 border-slate-500">
          <Icon icon="cil:rain" className="text-white text-[30px] inline" />
          <span className="text-gray-300 font-medium text-2xl ">
            {" "}
            Chance of Rain:{" "}
          </span>{" "}
          <br />
          <span className="text-2xl">
            {daily?.precipitation_probability_mean[0]} %
          </span>
        </p>
        <p className="border-r-2 pr-2 border-slate-500">
          <Icon
            icon="carbon:sunrise"
            className="text-yellow-500 text-[40px] inline"
          />
          <span className="text-gray-300 font-medium text-2xl">
            {" "}
            Sun rise:{" "}
          </span>{" "}
          <br />
          <span className="text-2xl">{daily?.sunrise[0].split("T")[1]} AM</span>
        </p>
        <p>
          <Icon
            icon="carbon:sunset"
            className="text-orange-500 text-[40px] inline"
          />
          <span className="text-gray-300 font-medium text-2xl"> Sun set: </span>{" "}
          <br />
          <span className="text-2xl">{daily?.sunset[0].split("T")[1]} PM</span>
        </p>
      </div>
    </div>
  );
};

export default CurrentData;
