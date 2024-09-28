import React, { useState, useEffect, useRef } from "react";
import Geolocation from "../services/Geolocation";
import options from "../constant/Districts";
import { Icon } from "@iconify/react";
import Recent from "../components/Recent";
import Differentplace from "../components/Differentplace";

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
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [msg, setMsg] = useState<string | null>(null);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<HTMLUListElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilteredOptions(
      options.filter((option) =>
        value
          .split("")
          .every((char) => option.toLowerCase().includes(char.toLowerCase()))
      )
    );
  };

  const handleInputClick = () => {
    setFilteredOptions(options);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isOutsideInput =
        inputRef.current && !inputRef.current.contains(event.target as Node);
      const isOutsideOptions =
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node);

      if (isOutsideInput && isOutsideOptions) {
        setFilteredOptions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef]);

  const handleOptionClick = (option: string) => {
    setSearchTerm(option);
    setFilteredOptions([]);
  };

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
          <div className="flex justify-center items-center gap-2 relative ">
            <input
              autoComplete="off"
              type="search"
              name="search"
              id="search"
              list="search-options"
              value={searchTerm}
              ref={inputRef}
              placeholder="Enter your district / Allow location permission"
              className="py-2  px-4 cursor-pointer border-none outline-none text-[18px] rounded-lg w-full"
              onChange={handleInputChange}
              onClick={handleInputClick}
            />
            <button className="bg-[#32b5c6] py-2 px-4 text-white rounded-2xl cursor-pointer">
              <Icon icon="iconamoon:search-bold" className="text-[26px]  " />
            </button>
            {filteredOptions.length > 0 && (
              <ul
                ref={optionsRef}
                className="absolute  mt-1 top-10 w-full bg-white border border-gray-300 rounded-lg max-h-52 overflow-y-scroll"
              >
                {filteredOptions.map((option) => (
                  <li
                    key={option}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
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

      <div className="flex flex-col gap-8">
        <Recent />
        <Differentplace />
      </div>
    </div>
  );
};

export default Info;
