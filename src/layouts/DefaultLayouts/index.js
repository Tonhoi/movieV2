import React from "react";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const index = ({ children }) => {
  return (
    <div className="wrapper">
      <div className="header fixed top-0 left-0 w-full z-[20] bg-transparent">
        <Header></Header>
      </div>
      <div className="content bg-[#1A191F]">{children}</div>
      <div className="footer bg-[#1a191f] border border-[#5a4c4c] border-r-transparent border-b-transparent border-l-transparent mt-auto py-[40px] ">
        <Footer />
      </div>
    </div>
  );
};

export default index;
