import React, { useState, useEffect, useRef } from "react";
import nepalDistrictsCoordinates from "../constant/Districts";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();

  let list: string[] = [];

  nepalDistrictsCoordinates.map((item) => list.push(item.name));
  // console.log(list);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilteredOptions(
      list.filter((option) =>
        value
          .split("")
          .every((char) => option.toLowerCase().includes(char.toLowerCase()))
      )
    );
  };

  const handleInputClick = () => {
    setFilteredOptions(list);
  };

  const handleOptionClick = (option: string) => {
    setSearchTerm(option);
    setFilteredOptions([]);
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

  const handleSearchbtn = () => {
    console.log(searchTerm);
    const search = nepalDistrictsCoordinates.filter(
      (item) => item.name.toLowerCase() === searchTerm?.toLowerCase()
    );
    if (search) {
      navigate(`/info/${searchTerm}/${search[0].lat}/${search[0].lon}`);
    }
  };

  return (
    <div className="flex justify-center items-center gap-2 relative ">
      <input
        autoComplete="off"
        type="search"
        name="search"
        id="search"
        list="search-options"
        value={searchTerm || ""}
        ref={inputRef}
        placeholder="Enter your district / Allow location permission"
        className="py-2  px-4 cursor-pointer border-none outline-none text-[18px] rounded-lg w-full"
        onChange={handleInputChange}
        onClick={handleInputClick}
      />
      <button
        onClick={handleSearchbtn}
        className="bg-[#32b5c6] font-medium py-2 px-4 text-white rounded-2xl cursor-pointer"
      >
        {/* <Icon icon="iconamoon:search-bold" className="text-[26px]  " /> */}
        <span>Search</span>
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
  );
};

export default SearchBox;
