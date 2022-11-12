import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../../store/Common/slice";
import { SunIcon } from "../Icons";

const Toggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((prev) => prev.common.theme);
  const handleChangeTheme = (e) => {
    JSON.stringify(localStorage.setItem("theme", !theme));
    dispatch(setTheme(!theme));
  };

  useEffect(() => {
    const htmlDOm = document.querySelector("html");
    if (htmlDOm) {
      if (theme) {
        htmlDOm.setAttribute("data-theme", "light");
      } else {
        htmlDOm.setAttribute("data-theme", "dark");
      }
    }
  }, [theme]);
  return (
    <div
      className={`cursor-pointer hover:opacity-70 w-[40px] h-[40px] rounded-[20px]  flex items-center justify-center transition-all duration-300 ease-linear text-[var(--white-color)] ${
        theme ? "bg-[#5b7dff]" : "bg-[var(--bg-options)]"
      }`}
      onClick={handleChangeTheme}
    >
      <SunIcon className={"w-[2.5rem] h-[2.5rem]"} />
    </div>
  );
};

export default Toggle;
