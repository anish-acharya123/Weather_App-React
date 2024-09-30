import CurrentData from "./CurrentData";
import WeekData from "./WeekData";

const Recent1 = () => {
  return (
    <div className="flex md:flex-row flex-col bg-[#627d9c] w-full p-6 gap-4">
      <CurrentData />
      <WeekData />
    </div>
  );
};

export default Recent1;
