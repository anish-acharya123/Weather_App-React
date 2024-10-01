import { useContext } from "react";
import { DataContext } from "../context/Dataprovider";
import getWeatherIcon from "../services/GetIcons";
import { Icon } from "@iconify/react";

interface props {
  searchData: object | undefined;
}
const WeekData: React.FC<props > = ({ searchData }) => {
  const { data } = useContext(DataContext);
  let daily;
  if (searchData === undefined) {
    daily = data?.daily;
  } else {
    daily = searchData;
  }

  

  const getDayName = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };
  return (
    <div className="flex-1 p-4 bg-[#385372] text-white">
      <h2 className="text-2xl">7-Days Forecast</h2> <br />
      <div className="flex flex-col  gap-2 l">
        {daily?.time.map((date: string, index: number) => (
          <div
            key={index}
            className="flex justify-between border-b-2 border-slate-400 py-2 px-4 cursor-pointer"
          >
            <h3 className="flex-1 font-medium text-lg">{getDayName(date)}</h3>{" "}
            <p className="flex-1">
              <Icon
                icon={`${getWeatherIcon(daily?.weather_code[index])}`}
                className="text-[30px]"
              />
            </p>
            {/* <p>Weather Code: {daily?.weather_code[index]}</p> */}
            <div className="flex items-end flex-1 justify-end ">
              <p className="font-medium text-lg">
                {daily?.temperature_2m_max[index]} /{" "}
              </p>
              <p className="text-sm ">{daily?.temperature_2m_min[index]} °C</p>
            </div>
            {/* <p>
              Average Temp:{" "}
              {calculateAverageTemp(
                daily?.temperature_2m_min[index],
                daily?.temperature_2m_max[index]
              )}
              °C
            </p> */}
            {/* <p>Rain: {daily?.rain_sum[index]} mm</p> */}
            {/* <p>UV Index Max: {daily?.uv_index_max[index]}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekData;
