import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FetchByMeteo } from "../services/Apimeteo";

const HoursData = () => {
  const { lat, lon } = useParams<Record<string, string | undefined>>();
  // console.log(lat,lon)
  const [data, setData] = useState<any | null>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await FetchByMeteo(Number(lat), Number(lon));
      setData(res);
    };
    fetchData();
  }, [lat, lon]);

  const hourly = data?.hourly;

//   console.log(hourly);
  return (
    <div>
      {/* <div>aish</div> */}
    </div>
  );
};

export default HoursData;
