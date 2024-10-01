import { useContext } from "react";
import { DataContext } from "../context/Dataprovider";
import { useNavigate } from "react-router-dom";
import mobile1 from "../assets/mobile1.png";
import cover1 from "../assets/cover1.png";
import mobile2 from "../assets/mobile2.png";
import cover2 from "../assets/cover2.png";

const Home: React.FC = () => {
  const { userAddress } = useContext(DataContext);
  const navigate = useNavigate();
  console.log(userAddress);

  return (
    <div className="min-h-screen px-6 md:flex-row flex-col-reverse text-white   w-full flex justify-center items-center">
      <div className="flex-1 flex flex-col gap-4 md:justify-normal md:items-start justify-center items-normal">
        {
          <div className="font-medium sm:text-[20px] text-[18px]">
            {/* Your current Location{" "} */}
            Discover what's new in{" "}
            <span className="text-white underline underline-offset-2">
              {(userAddress && userAddress?.city) || "Your Location"}! <br />
            </span>
            Check the latest weather updates, events, and more.
          </div>
        }
        <h1 className="md:text-[82px] sm:text-[60px] text-[50px] font-medium  text-left  leading-[100%]">
          Your Live Forecaster
        </h1>
        <p className="text-black sm:text-[26px] text-[20px]">
          Today We Forecast Building Dreams, <br className="lg:block hidden" />{" "}
          One Day at a Time!
        </p>
        <button
          onClick={() => navigate("/info")}
          className="py-2 px-6 bg-[#385372] text-white border-2 border-[#385372] font-medium  rounded-md w-fit hover:bg-white hover:text-[#385372] transition-all"
        >
          Check Now
        </button>
      </div>
      <div className="flex-1  gap-2 justify-end lg:flex hidden">
        <figure className="relative lg:block hidden">
          <img
            src={cover1}
            alt="ff"
            className="lg:h-auto lg:w-auto h-[10rem]"
          />
          <img
            src={mobile1}
            alt="ff"
            className="absolute top-0 left-4 md:h-auto md:w-auto h-[20rem]"
          />
        </figure>
        <figure className="relative  lg:block hidden transition-all ">
          <img
            src={cover2}
            alt="ff"
            className="md:h-auto md:w-auto h-[10rem] "
          />
          <img
            src={mobile2}
            alt="ff"
            className="absolute top-0 left- drop-shadow-md md:h-auto md:w-auto h-[10rem]"
          />
        </figure>
      </div>
    </div>
  );
};

export default Home;
