import React, { createContext, ReactNode, useEffect, useState } from "react";
import { FetchByMeteo } from "../services/Apimeteo";
import FetchLocation from "../services/FetchLocation";

const DataContext = createContext<any | null>(null);

interface DataProviderProps {
  children: ReactNode;
  latitude?: number;
  longitude?: number;
}

interface Location {
  latitude: number;
  longitude: number;
}

interface userAddress {
  city: string;
  country: string;
  state: string;
  country_code: string;
  road: string;
  suburb: string;
  city_district: string;
  municipality: string;
  county: string;
}

interface WeatherData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather_units: {
    time: string;
    interval: string;
    temperature: string;
    windspeed: string;
    winddirection: string;
    is_day: string;
    weathercode: string;
  };
  current_weather: {
    time: string;
    interval: number;
    temperature: number;
    windspeed: number;
    winddirection: number;
    is_day: number;
    weathercode: number;
  };
  hourly_units: {
    time: string;
    temperature_2m: string;
    precipitation: string;
    rain: string;
    weather_code: string;
    wind_speed_10m: string;
    wind_direction_10m: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
  };
}

const Dataprovider: React.FC<DataProviderProps> = ({
  children,
  latitude,
  longitude,
}) => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [userAddress, setUserAddress] = useState<userAddress | undefined>();

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
        const res = await FetchByMeteo(lat, lon);
        setData(res);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    const fetchUserLocation = async (lat: number, lon: number) => {
      try {
        const res = await FetchLocation(lat, lon);
        setUserAddress(res.address);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };
    if (latitude !== undefined && longitude !== undefined) {
      fetchData(latitude, longitude);
      fetchUserLocation(latitude, longitude);
    } else if (PreLocation) {
      fetchData(PreLocation.latitude, PreLocation.longitude);
      fetchUserLocation(PreLocation.latitude, PreLocation.longitude);
    } else {
      console.error("No valid location available.");
    }
  }, [latitude, longitude]);

  return (
    <DataContext.Provider value={{ data, setData, userAddress }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, Dataprovider };
