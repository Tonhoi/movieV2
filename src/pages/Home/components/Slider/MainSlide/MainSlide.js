import React, { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import { Link } from "react-router-dom";

const MainSlide = ({
  items,
  title,
  customClassName,
  customClassNameImage,
  customBreakPoints = {},
  absoluteCenter = false,
  reponesiveImage = false,
}) => {
  return (
    <div
      className={`main-slide z-[1] ${
        absoluteCenter
          ? "absolute top-[50%] left-[50%] -translate-y-[50%]  -translate-x-[50%]"
          : "relative"
      }  w-[75%] select-none ${customClassName}`}
    >
      {title && (
        <h4 className="text-[25px] pt-[30px] pb-5 text-[var(--white-color)] lg:text-[40px]">
          {title}
        </h4>
      )}
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        breakpoints={customBreakPoints}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className={`asdasd w-full  ${
          reponesiveImage ? "h-[250px] md:h-[300px] lg:h-[100%]" : ""
        } ${customClassNameImage}`}
      >
        {items.length > 0 &&
          items.map((item) => (
            <SwiperSlide key={item.id} className="h-[100%]">
              <Link
                to={`/detailmovie/${item.title ? `movie` : "tv"}/${item.id}`}
              >
                <img
                  src={`https://image.tmdb.org/t/p//w300${item.poster_path}`}
                  className="w-full object-cover h-[100%] cursor-pointer rounded-[10px]"
                  alt=""
                />
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default memo(MainSlide);
