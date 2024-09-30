import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FetchByMeteo } from "../services/Apimeteo";
import { Icon } from "@iconify/react";
import WeekData from "../components/WeekData";

const DetailsPage = () => {
  const { district, lat, lon } =
    useParams<Record<string, string | undefined>>();
  const [data, setData] = useState<any | null>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await FetchByMeteo(Number(lat), Number(lon));
      setData(res);
    };
    fetchData();
  }, [lat, lon]);

  const current_weather = data?.current_weather;
  const daily = data?.daily;

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
  // console.log(data);
  return (
    <div className="pt-32  w-full grid md:grid-cols-2 grid-cols-1  px-6  gap-4">
      <div className="bg-[#385372]  p-4 text-white  justify-center  flex-1 flex flex-col gap-4 ">
        <h2 className="text-2xl">Current Weather</h2>
        <div className="flex  justify-center items-center">
          <div>
            <h1 className="text-5xl font-bold">{district}</h1>
            <p className="text-6xl mt-2 font-medium">
              {" "}
              {current_weather?.temperature}°C
            </p>
          </div>
          <div className=" h-full w-full flex-1 flex justify-end pr-4 items-center ">
            <p>
              <Icon
                icon={`${getWeatherIcon(current_weather?.weathercode)}`}
                className="text-[90px]"
              />
            </p>
          </div>
        </div>
        <div className=" grid grid-cols-3 gap-8 flex-wrap">
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
            <span className="text-gray-300 font-medium text-2xl">Wind:</span>{" "}
            <br />
            <span className="text-2xl">{current_weather?.windspeed} km/h</span>
          </p>
          <p className="border-r-2 pr-2 border-slate-500">
            <Icon icon="cil:rain" className="text-white text-[30px] inline" />
            <span className="text-gray-300 font-medium text-2xl">
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
            <span className="text-2xl">
              {daily?.sunrise[0].split("T")[1]} AM
            </span>
          </p>
          <p>
            <Icon
              icon="carbon:sunset"
              className="text-orange-500 text-[40px] inline"
            />
            <span className="text-gray-300 font-medium text-2xl">
              {" "}
              Sun rise:{" "}
            </span>{" "}
            <br />
            <span className="text-2xl">
              {daily?.sunset[0].split("T")[1]} PM
            </span>
          </p>
        </div>
      </div>
      <div className="flex-1">
        <WeekData searchData={daily} />
      </div>
    </div>
  );
};

export default DetailsPage;
