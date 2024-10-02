import { NavLink, Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import SearchBox from "./SearchBox";
import DarkMode from "./DarkMode";

const Navbar = () => {
  const location = useLocation();
  // console.log(location);
  return (
    <>
      <nav className=" backdrop-filter backdrop-blur-md z-50 px-6  py-6  border-b-2 border-gray-400 fixed w-full max-w-[1440px] top-0 text-white">
        <div className="flex justify-between">
          <figure>
            {/* <img src="" alt="" /> */}
            <Link to="/">
              <h1 className="font-medium md:text-[30px] text-[24px] items-center">
                WEATHER
              </h1>
            </Link>
          </figure>

          <ul className="sm:flex hidden gap-6 font-medium items-center text-[20px] ">
            {location.pathname !== "/info" && (
              <li className="cursor-pointer">
                <SearchBox />
              </li>
            )}
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/info">Info</NavLink>
            </li>
            <li>
              <DarkMode />
            </li>
          </ul>
          <div className="sm:hidden">
            <Icon icon="mdi:hamburger-open" className="text-[40px]" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
