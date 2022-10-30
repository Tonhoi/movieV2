import React, { memo } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/effect-coverflow";
import "swiper/css/bundle";
import "swiper/css/navigation";
import { MainSlide } from "./MainSlide";
import { Link } from "react-router-dom";

const Slider = ({
  items,
  title,
  customClassName,
  isBgSlider = false,
  absoluteCenter = false,
  reponesiveImage = false,
  customBreakPoints = {},
}) => {
  return (
    <div className="slider relative h-auto sm:h-[400px] md:h-[500px] lg:h-[700px] w-full">
      {isBgSlider && (
        <Swiper
          effect={"fade"}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[EffectFade, Autoplay]}
          className="h-full w-[full]"
        >
          {items.length > 0 &&
            items.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <img
                    src={`https://image.tmdb.org/t/p//w1280${item.backdrop_path}`}
                    className="w-full object-cover h-[400px] md:h-[500px] lg:h-[700px] opacity-80 "
                    alt=""
                  />
                </SwiperSlide>
              );
            })}
        </Swiper>
      )}
      <MainSlide
        items={items}
        title={title}
        customClassName={customClassName}
        absoluteCenter={absoluteCenter}
        reponesiveImage={reponesiveImage}
        customBreakPoints={customBreakPoints}
      />
    </div>
  );
};

export default memo(Slider);
