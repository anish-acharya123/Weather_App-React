import CurrentData from "./CurrentData";
import WeekData from "./WeekData";

const Recent = () => {
  return (
    <div className="flex md:flex-row flex-col bg-[#627d9c] w-full p-6 gap-4">
      <CurrentData searchData={undefined} current_data={undefined} />
      <WeekData searchData={undefined} />
    </div>
  );
};

export default Recent;
