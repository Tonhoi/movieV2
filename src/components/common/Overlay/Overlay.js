import React from "react";

const Overlay = ({ configClassName }) => {
  return (
    <div
      className={`fixed top-[0] right-0 left-0 bottom-0 z-[19] bg-[rgba(0,0,0,0.4)] ${configClassName}`}
    ></div>
  );
};

export default Overlay;
