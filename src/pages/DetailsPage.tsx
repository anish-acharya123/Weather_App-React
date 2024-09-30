import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FetchData } from "../services/FetchTemp";
import Differentplace from "../components/Differentplace";
import { Icon } from "@iconify/react";

interface WeatherData {
  coord: { lon: number; lat: number };
  weather: { id: number; main: string; description: string; icon: string }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: { speed: number; deg: number; gust: number };
  clouds: { all: number };
  sys: { country: string; sunrise: number; sunset: number };
  name: string;
}

const DetailsPage = () => {
  const { district, lat, lon } =
    useParams<Record<string, string | undefined>>();
  const [data, setData] = useState<WeatherData>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await FetchData(Number(lat), Number(lon));
      setData(res);
    };
    fetchData();
  }, [lat, lon]);

  console.log(data);
  if (!data) {
    return <div>Loading...</div>;
  }

  const convertUnixToTime = (unixTime: number) => {
    const date = new Date(unixTime * 1000);
    return `${date.getHours()}:${
      date.getMinutes() < 10 ? "0" : ""
    }${date.getMinutes()} ${date.getHours() >= 12 ? "PM" : "AM"}`;
  };

  const bgImage = {
    backgroundImage:
      "url('https://images.pexels.com/photos/813872/pexels-photo-813872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
    backgroundSize: "cover",
  };

  return (
    <div className="min-h-screen flex flex-col items-start px-6 w-full gap-6 pt-28 pb-10 ">
      <div
        style={bgImage}
        className="w-full bg-cover bg-center bg-fixed flex flex-col justify-center items-center py-20 text-white "
      >
        <h1 className="text-4xl font-bold ">{district}</h1>

        <div className="w-full mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
          <div className="bg-none rounded-lg shadow-lg p-6 border-2 backdrop-filter backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4">Current Weather</h2>

            <div className="flex items-center gap-4 mb-4">
              <Icon
                icon="mdi:thermometer"
                className="text-blue-600 text-[40px]"
              />
              <p className="text-lg">
                {data.main.temp}°C
                <span className="text-sm text-gray-200">
                  &nbsp;(Feels like {data.main.feels_like}°C)
                </span>
              </p>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <Icon
                icon="mdi:weather-windy"
                className="text-blue-600 text-[40px]"
              />
              <p className="text-lg">
                Wind: {data.wind.speed} m/s at {data.wind.deg}°
              </p>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <Icon
                icon="mdi:water-percent"
                className="text-blue-600 text-[40px]"
              />
              <p className="text-lg">Humidity: {data.main.humidity}%</p>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <Icon icon="mdi:gauge" className="text-blue-600 text-[40px]" />
              <p className="text-lg">Pressure: {data.main.pressure} hPa</p>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <Icon icon="mdi:cloud" className="text-blue-600 text-[40px]" />
              <p className="text-lg">Cloud Coverage: {data.clouds.all}%</p>
            </div>
          </div>

          <div className=" rounded-lg shadow-lg p-6 border-2 backdrop-filter backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4">Additional Info</h2>

            <div className="flex items-center gap-4 mb-4">
              <Icon
                icon="carbon:sunrise"
                className="text-yellow-500 text-[40px]"
              />
              <p className="text-lg">
                Sunrise: {convertUnixToTime(data.sys.sunrise)}
              </p>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <Icon
                icon="carbon:sunset"
                className="text-orange-500 text-[40px]"
              />
              <p className="text-lg">
                Sunset: {convertUnixToTime(data.sys.sunset)}
              </p>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <Icon
                icon="mdi:map-marker"
                className="text-red-600 text-[40px]"
              />
              <p className="text-lg">
                Location: {data.name}, {data.sys.country}
              </p>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <Icon
                icon="iconoir:temperature-high"
                className="text-red-600 text-[40px]"
              />
              <p className="text-lg">Max Temp: {data.main.temp_max}</p>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <Icon
                icon="iconoir:temperature-high"
                className="text-red-600 text-[40px]"
              />
              <p className="text-lg">Max Temp: {data.main.temp_min}</p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="w-full mt-6">
        <Differentplace />
      </div> */}
    </div>
  );
};

export default DetailsPage;
