import { useEffect, useState } from "react";
import nepalDistrictsCoordinates from "../constant/Districts";
import { FetchData } from "../services/FetchTemp";

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
  district: string;
}

interface nepalDistrict {
  name: string;
  lat: number;
  lon: number;
}

const Differentplace = () => {
  const [weatherDataArray, setWeatherDataArray] = useState<WeatherData[]>([]);
  const [RamDistrict, setRamDistrict] = useState<nepalDistrict[]>([]);

  useEffect(() => {
    const tempArray: nepalDistrict[] = [];
    while (tempArray.length < 4) {
      const item =
        nepalDistrictsCoordinates[
          Math.floor(Math.random() * nepalDistrictsCoordinates.length)
        ];
      if (!tempArray.includes(item)) {
        tempArray.push(item);
      }
    }
    setRamDistrict(tempArray);
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const fetchedData = await Promise.all(
          RamDistrict.map(async (district) => {
            const weatherData = await FetchData(district.lat, district.lon);
            return {
              ...weatherData,
              district: district.name,
            };
          })
        );
        setWeatherDataArray(fetchedData);
      } catch (error) {
        console.log("Error fetching district data", error);
      }
    };

    if (RamDistrict.length > 0) {
      fetchWeatherData();
    }
  }, [RamDistrict]);

  return (
    <div className={`${weatherDataArray.length > 0 ? "block" : "hidden"}`}>
      <p className="font-medium text-[24px]">
        Weather From Different Locations:{" "}
      </p>
      {weatherDataArray.length > 0 && (
        <div className="w-full grid grid-cols-4 gap-10">
          {weatherDataArray.map((district, index) => (
            <div
              key={index}
              className="max-w-sm  w-[20rem] mx-auto bg-white shadow-lg rounded-lg mt-2 p-6"
            >
              <h2 className="text-2xl font-bold">
                {district.district}, {district.sys.country}
              </h2>
              <img
                src={`http://openweathermap.org/img/wn/${district.weather[0].icon}@2x.png`}
                alt={district.weather[0].description}
                className="w-24 h-24 mx-auto my-4"
              />
              <p className="text-lg">
                Temperature:{" "}
                <span className="font-semibold">
                  {district.main.temp.toFixed(1)}°C
                </span>
              </p>
              <p className="text-lg inline">
                Feels Like:{" "}
                <span className="font-semibold">
                  {district.main.feels_like.toFixed(1)}°C
                </span>
              </p>
              <p className="float-right font-bold underline cursor-pointer text-[#32b5c6]">
                see more
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Differentplace;
