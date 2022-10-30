import { useEffect, useState } from "react";

const UseDebounce = (value, time = 700) => {
  const [debounce, setdebounce] = useState("");

  useEffect(() => {
    const reset = setTimeout(() => {
      setdebounce(value);
    }, time);

    return () => {
      clearTimeout(reset);
    };
  }, [value, time]);

  return { debounce };
};

export default UseDebounce;
