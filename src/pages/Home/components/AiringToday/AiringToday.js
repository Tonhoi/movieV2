import React from "react";
import { memo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import images from "../../../../assets/image";
import { PlayIcon } from "../../../../components/common/Icons";
import Image from "../../../../components/common/Images/Image";

const AiringToday = ({ items }) => {
  const { t } = useTranslation();
  console.log(items);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[12px] pb-11">
      {items?.length > 0 &&
        items.map((item) => (
          <Link
            to={`/detailmovie/${item.title ? `movie` : "tv"}/${item.id}`}
            key={item.id}
            className="group relative min-w-[122.5px] min-h-[86px] overflow-hidden rounded-b-[12px] rounded-t-[12px] cursor-pointer"
          >
            <Image
              src={`https://image.tmdb.org/t/p//w1280${item.backdrop_path}`}
              configImage={images.noImageAvailable}
              alt=""
              className="rounded-b-[12px] rounded-t-[12px] object-cover w-full h-[100%] transition-all duration-300 select-none group-hover:scale-[1.2]"
            />
            <div
              className=" absolute left-[10px] top-[10px] rounded-full bg-[rgba(0,0,0,.6)] w-[70px] h-[70px] opacity-0 group-hover:opacity-100 transition-all duration-300 hidden items-center justify-center sm:flex"
              style={{
                boxShadow: "0 0 10px var(--white-color)",
              }}
            >
              <PlayIcon
                className={"text-[#fff] text-[5rem]  w-[40px] h-[70px]"}
              />
            </div>
            <div
              className="absolute left-0 bottom-0 text-[#eeeeee] pt-[30px] pb-[10px] px-[5px] w-[100%] rounded-b-[10px] select-none"
              style={{
                backgroundImage:
                  "linear-gradient(transparent,rgba(0,0,0,.1),rgba(0,0,0,.3),rgba(0,0,0,.5),rgba(0,0,0,.7),rgba(0,0,0,.9))",
              }}
            >
              <span className="block text-[1.4rem] sm:text-[1.6rem] whitespace-nowrap overflow-hidden text-ellipsis">
                {item.original_name || item?.title}
              </span>
              <span className="block text-[1.1rem] sm:text-[1.2rem]">
                {item.popularity} {t("content.viewer")}
              </span>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default memo(AiringToday);
