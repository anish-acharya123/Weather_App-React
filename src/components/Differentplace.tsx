import { useEffect, useState } from "react";
import nepalDistrictsCoordinates from "../constant/Districts";
import { FetchByMeteo } from "../services/Apimeteo";


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
    while (tempArray.length < 6) {
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
            const weatherData = await FetchByMeteo(district.lat, district.lon);
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
    <div
      className={`${
        weatherDataArray.length > 0 ? "block" : "hidden"
      } flex flex-col gap-0  items- w-full`}
    >
      <div className="flex justify-between">
        <span className="font-medium text-[20px] inline">
          Nepal Weather Conditions{" "}
        </span>
        <button className="w-fit bg-[#32b5c6] border-none text-white rounded-md py-2 px-4">
          see more
        </button>
      </div>
      {weatherDataArray.length > 0 && (
        <div className="w-full flex gap-2 flex-wrap justify-center items-center max-h-[20rem] overflow-y-scroll py-4 overflow-x-hidden px-10  mt-2 bg-[#91c9d0]">
          {weatherDataArray.map((district, index) => (
            <div
              key={index}
              className="max-w-sm cursor-pointer w-full mx-auto bg-white border-2 rounded-lg mt-2 p-2 px-4 flex flex-col w"
            >
              <div className="flex  justify-between items-center">
                <h2 className="text-lg font-bold">{district.district}</h2>
                <img
                  src={`http://openweathermap.org/img/wn/${district.weather[0].icon}@2x.png`}
                  alt={district.weather[0].description}
                  className="w-12 h-12 mx-auto my-4 drop-shadow-2xl"
                />
                <p className="text-lg">
                  <span className="font-semibold">
                    {district.main.temp.toFixed(1)}°C
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Differentplace;
