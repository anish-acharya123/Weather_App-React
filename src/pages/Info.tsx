import React, { useState, useContext } from "react";
import { DataContext } from "../context/Dataprovider";
import Geolocation from "../services/Geolocation";
import { Icon } from "@iconify/react";
import SearchBox from "../components/SearchBox";
import Recent from "../components/Recent";

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
  const { data } = useContext(DataContext);

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

  const bgImage = {
    backgroundImage:
      "url('https://images.unsplash.com/photo-1579003593419-98f949b9398f?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    backgroundSize: "cover",
    // backgroundPosition: "center",
  };

  return (
    <div className="pt-32 min-h-screen flex justify-center flex-col items-start px-6 w-full gap-4 pb-10 ">
      <div
        className=" flex  justify-center items-center w-full  bg-fixed py-10 px-6"
        style={bgImage}
      >
        <div className="flex flex-col gap-4  ">
          <label
            htmlFor="search"
            className="md:text-3xl text-2xl font-bold text-white "
          >
            Enter Your Location Here:{" "}
          </label>
          <SearchBox />
          <button
            onClick={handleAllowclick}
            className="py-2 px-4  flex justify-center items-center gap-4 bg-[#385372] text-white border-2 border-[#385372] rounded-md"
          >
            <Icon
              icon="carbon:location-filled"
              className="inline text-red-600 h-8 w-8"
            />
            <span className="font-medium">Allow Exact location</span>
          </button>
          {<p className="h-4 text-white font-medium">{msg}</p>}
        </div>
      </div>

      <div
        className={` ${
          data && data ? "block" : "hidden"
        } flex flex-row gap-8 w-full mt-2`}
      >
        <Recent />
      </div>
    </div>
  );
};

export default Info;
