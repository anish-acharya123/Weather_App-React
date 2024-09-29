import { useContext } from "react";
import { DataContext } from "../context/Dataprovider";
import { useNavigate } from "react-router-dom";

const Recent = () => {
  const { data } = useContext(DataContext);
  const navigate = useNavigate();

  if (!data) {
    return null;
  }

  const lat = data.coord?.lat;
  const lon = data.coord?.lon;
  const temp = data.main?.temp ?? 0;
  const feelsLike = data.main?.feels_like ?? 0;
  const country = data.sys?.country ?? "";
  const name = data.name ?? "";
  const weatherIcon = data.weather?.[0]?.icon
    ? `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    : "";

  return (
    <div className="">
      <p className="font-medium text-[20px]">Weather From Recent Location: </p>
      <div className="max-w-sm w-[30rem] bg-white shadow-lg rounded-lg mt-2 p-6">
        <h2 className="text-2xl font-bold">
          {name}, {country}
        </h2>
        <img
          src={weatherIcon}
          alt={data.weather[0]?.description || "Weather icon"}
          className="w-24 h-24 mx-auto my-4 drop-shadow-md"
        />
        <p className="text-lg">
          Temperature:{" "}
          <span className="font-semibold">{temp.toFixed(1)}°C</span>
        </p>
        <p className="text-lg inline">
          Feels Like:{" "}
          <span className="font-semibold">{feelsLike.toFixed(1)}°C</span>
        </p>
        <button
          onClick={() => navigate(`/info/${name}/${lat}/${lon}`)}
          className="float-right font-bold underline cursor-pointer text-[#32b5c6]"
        >
          See more
        </button>
      </div>
    </div>
  );
};

export default Recent;
