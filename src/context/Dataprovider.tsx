import React, { createContext, ReactNode, useEffect, useState } from "react";
import { FetchData } from "../services/FetchTemp";

const DataContext = createContext<any | null>(null);

interface DataProviderProps {
  children: ReactNode;
  latitude?: number;
  longitude?: number;
}

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

interface Location {
  latitude: number;
  longitude: number;
}

const Dataprovider: React.FC<DataProviderProps> = ({
  children,
  latitude,
  longitude,
}) => {
  const [data, setData] = useState<WeatherData | null>(null);

  const userLocation: string | null = localStorage.getItem("userlocation");

  let PreLocation: Location | undefined;

  if (userLocation) {
    try {
      PreLocation = JSON.parse(userLocation) as Location;
    } catch (error) {
      console.error("Error parsing user location:", error);
    }
  }

  useEffect(() => {
    const fetchData = async (lat: number, lon: number) => {
      try {
        const res = await FetchData(lat, lon);
        setData(res);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    if (latitude !== undefined && longitude !== undefined) {
      fetchData(latitude, longitude);
    } else if (PreLocation) {
      fetchData(PreLocation.latitude, PreLocation.longitude);
    } else {
      console.error("No valid location available.");
    }
  }, [latitude, longitude]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, Dataprovider };
