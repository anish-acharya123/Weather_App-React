import { NavLink, Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const Navbar = () => {
  return (
    <>
      <nav className=" z-50 px-6  py-6  border-b-2 border-gray-400 fixed w-full max-w-[1440px] top-0 text-black bg-[#d6f7f8]">
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
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/info">Info</NavLink>
            </li>
            <li className="cursor-pointer">
              {/* <input type="text" /> */}
              <Icon icon="iconamoon:search-bold" className="text-[26px]" />
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
