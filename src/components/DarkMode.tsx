import { Icon } from "@iconify/react";
import { useSelector, useDispatch } from "react-redux";
import { toogleDarkMode } from "../features/DarkmodeSlice";
import { RootState } from "../app/Store";
import { useEffect } from "react";

const DarkMode: React.FC = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.ToogleDark.value);
  const dark = JSON.parse(localStorage.getItem("isDarkMode") || "false");
  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(mode));
  }, [mode]);
  const handleBtn = () => {
    dispatch(toogleDarkMode());
  };

  console.log(mode);

  return (
    <div className="dark-main">
      <button onClick={handleBtn} className="dark-btn">
        {dark ? (
          <Icon icon="solar:sun-bold" className="h-10 w-10" />
        ) : (
          <Icon icon="ph:moon" className="h-10 w-10" />
        )}
      </button>
    </div>
  );
};

export default DarkMode;
