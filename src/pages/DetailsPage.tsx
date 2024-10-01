import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FetchByMeteo } from "../services/Apimeteo";
import getWeatherIcon from "../services/GetIcons";
import { Icon } from "@iconify/react";
import WeekData from "../components/WeekData";
import HoursData from "../components/HoursData";
import CurrentData from "../components/CurrentData";

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

  return (
    <div className="pt-32  w-full grid md:grid-cols-2 grid-cols-1  px-6  gap-4">
      <CurrentData searchData={daily} current_data={current_weather} />
      <div className="flex-1">
        <WeekData searchData={daily} />
      </div>
      <div>
        <HoursData />
      </div>
    </div>
  );
};

export default DetailsPage;
