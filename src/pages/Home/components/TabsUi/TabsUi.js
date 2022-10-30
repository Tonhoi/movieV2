import React, { memo, useEffect, useRef, useState } from "react";
import { Link, useHref, useNavigate } from "react-router-dom";
import { ArrowRighticon } from "../../../../components/common/Icons";
import Image from "../../../../components/common/Images/Image";
import { Overlay } from "../../../../components/common/Overlay";

const TabsUi = ({ items, customWrapperClass }) => {
  const param = useHref();

  const height = useRef();
  // useEffect(() => {
  //   console.log(height.current?.clientHeight);
  // });
  const type = param.slice(1);

  const handleScroll = () => {
    document.documentElement.scrollTop = 0;
  };

  return (
    <div className={`tabs-ui grid ${customWrapperClass}`}>
      {items?.length > 0 &&
        items.map((item) => {
          return (
            <Link
              to={`/detailmovie/${item.title ? `movie` : "tv"}/${item.id}`}
              key={item.id}
              className="m-[12px] group flex flex-col"
              ref={height}
              onClick={handleScroll}
            >
              <div className="wrapper-items flex-1 relative cursor-pointer overflow-hidden">
                <div className="hidden group-hover:block">
                  <Overlay configClassName={"absolute"} />
                  <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex items-center justify-center w-[45px] h-[45px] rounded-full border-2 border-[var(--white-color)]">
                    <ArrowRighticon className={"w-[3rem] h-[3rem]"} />
                  </div>
                </div>
                <Image
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  className="object-cover rounded-[10px] transition-all h-[100%] w-full"
                  alt=""
                />
                <div className="absolute top-[5%] left-[8%] flex justify-center items-center text-[1.3rem] w-[30px] h-[30px] rounded-full border-2 border-[#f9ab00] font-bold">
                  {item.vote_average}
                </div>
              </div>
              <div className="wrapper-title pt-[16px] px-[16px] pb-[24px] hover:text-[#f9ab00] cursor-pointer transition-colors">
                <span className="title">
                  {item.title || item.original_name || item?.name}
                </span>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default memo(TabsUi);
