import React, { useState } from "react";
import Geolocation from "../services/Geolocation";
import { Icon } from "@iconify/react";
import Recent from "../components/Recent";
import Differentplace from "../components/Differentplace";
import SearchBox from "../components/SearchBox";

interface geolocation {
  latitude?: number;
  longitude?: number;
}

interface Props {
  setUserLocation: React.Dispatch<
    React.SetStateAction<{
      latitude: number;
      longitude: number;
    } | null>
  >;
  userlocation: geolocation | null;
}

const Info: React.FC<Props> = ({ setUserLocation, userlocation }) => {
  const [msg, setMsg] = useState<string | null>(null);

  const handleAllowclick = async () => {
    try {
      if (
        userlocation?.latitude !== undefined &&
        userlocation?.longitude !== undefined
      ) {
        setMsg("Your Location is Uptodate.");
        setTimeout(() => {
          setMsg("");
        }, 5000);
      }
      const location = await Geolocation();
      setUserLocation(location);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center flex-col items-start w-full gap-4 py-32 ">
      <div className="text-black flex  justify-center items-center w-full  ">
        <div className="flex flex-col gap-4  ">
          <label htmlFor="search" className="text-[32px]">
            Enter Your Location Here:{" "}
          </label>
          <SearchBox />
          <button
            onClick={handleAllowclick}
            className="py-2 px-4  flex justify-center items-center gap-4 bg-[#32b5c6] text-white border-2 border-[#32b5c6] rounded-md"
          >
            <Icon
              icon="carbon:location-filled"
              className="inline text-red-600 h-8 w-8"
            />
            <span className="font-medium">Allow Exact location</span>
          </button>
          {<p className="h-4">{msg}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-8 w-full">
        <Recent />
        <Differentplace />
      </div>
    </div>
  );
};

export default Info;
