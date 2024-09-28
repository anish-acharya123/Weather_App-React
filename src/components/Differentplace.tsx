import React, { useEffect, useState } from "react";
import options from "../constant/Districts";
import { FetchByDistrict } from "../services/FetchByDistrict";

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

const Differentplace = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [RamDistrict, setRamDistrict] = useState<string[]>([]);

  useEffect(() => {
    const tempArray: string[] = [];
    while (tempArray.length < 5) {
      const item = options[Math.floor(Math.random() * options.length)]; 
      if (!tempArray.includes(item)) {
        tempArray.push(item);
      }
    }
    setRamDistrict(tempArray);
  }, []);
  console.log(RamDistrict);
  useEffect(() => {
    try {
      (async () => {
        const res = await FetchByDistrict();
        setData(res);
      })();
    } catch (error) {
      console.log("Error fetching district data", error);
    }
  }, []);

  const temp = data?.main?.temp ?? 0;
  const feelsLike = data?.main?.feels_like ?? 0;
  const country = data?.sys?.country ?? "";
  const name = data?.name ?? "";
  const weatherIcon = data?.weather?.[0]?.icon
    ? `http://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`
    : "";

  console.log(data);
  return (
    <div>
      <p className="font-medium text-[24px]">
        Weather From Different Location:{" "}
      </p>
      <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg mt-2 p-6">
        <h2 className="text-2xl font-bold">
          {name}, {country}
        </h2>
        <img
          src={weatherIcon}
          alt={data?.weather[0].description}
          className="w-24 h-24 mx-auto my-4"
        />
        <p className="text-lg">
          Temperature:{" "}
          <span className="font-semibold">{temp.toFixed(1)}°C</span>
        </p>
        <p className="text-lg inline">
          Feels Like:{" "}
          <span className="font-semibold">{feelsLike.toFixed(1)}°C</span>
        </p>
        <p className="float-right font-medium underline cursor-pointer">
          see more{""}
        </p>
      </div>
    </div>
  );
};

export default Differentplace;
