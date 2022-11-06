import React, { memo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Controller } from "swiper";

import { MainSlide } from "./MainSlide";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/effect-coverflow";
import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/zoom";

const SliderPopularMovie = ({
  items,
  title,
  customClassName,
  isBgSlider = false,
  absoluteCenter = false,
  reponesiveImage = false,
  customBreakPoints = {},
  overlay = false,
  animationScale = "",
}) => {
  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);

  return (
    <div className="slider relative h-auto sm:h-[400px] md:h-[500px] lg:h-[700px] w-full">
      {isBgSlider && (
        <Swiper
          effect={"fade"}
          modules={[EffectFade, Autoplay, Controller]}
          className="h-[100%] w-[100%]"
          onSwiper={setFirstSwiper}
          controller={{ control: secondSwiper }}
        >
          {items?.length > 0 &&
            items?.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <img
                    src={`https://image.tmdb.org/t/p//w1280${item.backdrop_path}`}
                    className="w-full object-cover h-[400px] md:h-[500px] lg:h-[700px] opacity-80"
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
        animationScale={animationScale}
        overlay={overlay}
        firstSwiper={firstSwiper}
        setSecondSwiper={setSecondSwiper}
      />
    </div>
  );
};

export default memo(SliderPopularMovie);
