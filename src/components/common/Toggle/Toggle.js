import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../../store/Common/slice";

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
    <label
      htmlFor="checkbox"
      className="fixed bottom-[10px] left-[10px] z-[9999]"
    >
      <div
        className={`relative w-[70px] h-[35px] rounded-[24px] bg-[#525152] cursor-pointer ${
          theme ? "bg-[#0b84ff]" : ""
        }`}
        onClick={handleChangeTheme}
      >
        <div
          className={`absolute left-[9px] top-[50%] w-[26px] h-[26px] rounded-[50%] bg-[#767676] translate-y-[-50%] transition-all duration-[400ms] ease-linear ${
            theme ? "left-[35px] bg-[#fff!important]" : ""
          }`}
        >
          <div
            className={`${
              theme
                ? "absolute top-[50%] left-[50%] w-[6px] h-[6px] rounded-[50%] bg-[#0c83ff] -translate-x-[50%] -translate-y-[50%]"
                : ""
            }`}
          ></div>
        </div>
      </div>
    </label>
  );
};

export default Toggle;
