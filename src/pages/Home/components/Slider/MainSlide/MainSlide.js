import React, { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Controller } from "swiper";
import { Link } from "react-router-dom";
import Image from "../../../../../components/common/Images/Image";
import { Overlay } from "../../../../../components/common/Overlay";

const MainSlide = ({
  items,
  title,
  customClassName,
  customClassNameImage,
  customBreakPoints = {},
  absoluteCenter = false,
  reponesiveImage = false,
  overlay = false,
  animationScale = "",
  setSecondSwiper,
  firstSwiper,
}) => {
  return (
    <div
      className={` main-slide z-[1] ${
        absoluteCenter
          ? "absolute top-[50%] left-[50%] -translate-y-[50%]  -translate-x-[50%]"
          : "relative"
      }  w-[90%] sm:w-[75%] select-none ${customClassName}`}
    >
      {title && (
        <h4 className="text-[25px] pt-[30px] pb-5 text-[#fff] lg:text-[40px]">
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
        modules={[Autoplay, Navigation, Controller]}
        className={` w-full  ${
          reponesiveImage ? "h-[250px] md:h-[300px] lg:h-[100%]" : ""
        } ${customClassNameImage}`}
        onSwiper={setSecondSwiper}
        controller={{ control: firstSwiper }}
      >
        {items?.length > 0 &&
          items?.map((item) => {
            return (
              <SwiperSlide key={item.id} className="h-[100%] group">
                <Link
                  to={`/detailmovie/${item.title ? `movie` : "tv"}/${item.id}`}
                  className="rounded-[12px]"
                >
                  {overlay && (
                    <Overlay
                      configClassName={
                        "absolute scale-0 group-hover:scale-100 transition-all duration-[300ms] ease-in"
                      }
                    >
                      <div className="absolute z-[19] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex items-center justify-center group/text">
                        <button className=" p-[15px] text-[1.4rem] border border-solid border-[var(--color-text)] rounded-[15px] text-[var(--white-color)] group-hover/text:bg-[#7f5e16]">
                          WATCHING NOW
                        </button>
                      </div>
                    </Overlay>
                  )}
                  <Image
                    src={`https://image.tmdb.org/t/p//w300${item.poster_path}`}
                    className={`w-full object-cover h-[100%] cursor-pointer rounded-[12px] ${
                      animationScale && animationScale
                    }`}
                    alt=""
                  />
                </Link>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default memo(MainSlide);
