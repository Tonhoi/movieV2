import React, { memo, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRighticon } from "../../../../components/common/Icons";
import Image from "../../../../components/common/Images/Image";
import { Overlay } from "../../../../components/common/Overlay";

import "../../Home.scss";
const TabsUi = ({
  items,
  customWrapperClass,
  configChildrenOverlay = false,
  configImage = "",
}) => {
  // useEffect(() => {
  //   console.log(height.current?.clientHeight);
  // });

  return (
    <div className={`tabs-ui grid ${customWrapperClass}`}>
      {items?.length > 0 &&
        items.map((item) => {
          return (
            <Link
              to={`/detailmovie/${item.title ? `movie` : "tv"}/${item.id}`}
              key={item.id}
              className="m-[12px] group flex flex-col relative"
            >
              <Overlay
                configClassName={
                  "absolute h-[calc(100%-61px)] hidden group-hover:block rounded-[10px]"
                }
              >
                {configChildrenOverlay ? (
                  configChildrenOverlay
                ) : (
                  <div className="absolute z-[19] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]   flex items-center justify-center w-[45px] h-[45px] rounded-full border-2 border-[#fff]">
                    <ArrowRighticon
                      className={"w-[3rem] h-[3rem] text-[#fff]"}
                    />
                  </div>
                )}
              </Overlay>
              <div className="wrapper-items flex-1 relative cursor-pointer overflow-hidden rounded-[10px]">
                <Image
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  className={`object-cover rounded-[10px] h-[100%] w-full transition-all duration-[900ms] ease-linear group-hover:scale-150 ${configImage}`}
                  alt=""
                />
                <div className="absolute top-[12px] left-[12px] flex bg-[#333] justify-center items-center text-[1.3rem] w-[40px] h-[40px] rounded-full border-2 border-[var(--color-text)] font-bold text-[#fff]">
                  {item.vote_average}
                </div>
              </div>
              <div className="wrapper-title pt-[16px] px-[16px] pb-[24px] hover:text-[var(--color-text)] cursor-pointer transition-colors">
                <span className="title">
                  {item.title || item?.name || item.original_name}
                </span>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default memo(TabsUi);
