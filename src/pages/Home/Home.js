import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// tabs ui
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  ArrowRightIconV2,
  ArrowRightIconV3,
  StarActiveIcon,
} from "../../components/common/Icons";

import "./Home.scss";
import { TabsUi } from "./components/TabsUi";
import { SliderPopularMovie } from "./components/Slider";
import { MainSlide } from "./components/Slider/MainSlide";
import Button from "../../components/common/Button/Button";
import { callPopularMovie } from "../../store/CallPopularMovie/slice";
import {
  SLIDE_HAVE_BACKDROP,
  SLIDE_NO_BACKDROP,
} from "../../consts/ReponsiveSlide";
import { UpCommingApi, NowPlayingApi, TrendingApi } from "../../api";
import AiringTodayApi from "../../api/AiringTodayApi";
import AiringToday from "./components/AiringToday/AiringToday";

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const currentPageTv = useSelector((prev) => prev.callTvMovies.counter);
  const currentPageMovie = useSelector(
    (prev) => prev.callDiscoverMovies.counter
  );
  const popularMovies = useSelector(
    (prev) => prev.callPopularMovie.callPopularMovie.results
  );

  const [upComings, setUpComings] = useState([]);
  const [nowPlayings, setNowPlayings] = useState([]);
  const [trendings, setTrendings] = useState([]);
  const [topPopularMovie, setTopPopularMovie] = useState([]);
  const [airingToday, setAiringToday] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const upComing = await UpCommingApi.getByPage(1);
      const nowPlaying = await NowPlayingApi.getByPage(1);
      const trending = await TrendingApi.getAll();
      const airingToday = await AiringTodayApi.getAll();
      await dispatch(callPopularMovie(1));

      setTopPopularMovie(nowPlaying.results[Math.floor(Math.random() * 19)]);
      setUpComings(upComing.results.slice(0, 12));
      setNowPlayings(nowPlaying.results.slice(0, 12));
      setTrendings(trending.results);
      setAiringToday(airingToday.results.slice(0, 12));
    };

    fetch();
  }, []);

  return (
    <>
      {/* slider */}
      <SliderPopularMovie
        items={popularMovies}
        animationScale={`transition-all duration-[500ms] ease-linear group-hover:scale-110 p-[5px] rounded-[25px] sm:rounded-[35px] sm:p-[20px] h-[200px] sm:h-[250px]  md:h-[300px] xl:h-[400px]`}
        title={t("content.popularMovie")}
        isBgSlider
        absoluteCenter
        reponesiveImage
        customBreakPoints={SLIDE_HAVE_BACKDROP}
      />

      {/* tabs ui */}
      <div className="tabs-ui grid-system wide">
        <div className="relative before:absolute before:content-[''] before:top-[100%] before-left-[0] before:w-full before:h-[2px] before:bg-[#5a4c4c] pt-[60px] pb-[20px] text-[var(--white-color)]">
          <Tabs disableUpDownKeys={true}>
            <div className="mb-[24px]">
              <TabList className={"ml-[12px]"}>
                <Tab>{t("content.upComing")}</Tab>
                <Tab>{t("content.nowPlaying")}</Tab>
              </TabList>
              <Button
                className={
                  " bg-[#3f51b5] flex items-center gap-[8px] mr-[12px] hover:bg-[#303f9f] ml-auto text-[#fff]"
                }
                iconRight={<ArrowRightIconV2 />}
              >
                <Link to={`/movie/list/${currentPageMovie}`}>
                  {t("content.viewAll")}
                </Link>
              </Button>
            </div>

            <TabPanel>
              <TabsUi
                items={upComings}
                customWrapperClass={
                  "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
                }
              />
            </TabPanel>
            <TabPanel>
              <TabsUi
                items={nowPlayings}
                customWrapperClass={
                  "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
                }
              />
            </TabPanel>
          </Tabs>
        </div>
      </div>

      {/* trending moie */}

      <div className="grid-system wide">
        <div className="relative px-[10px] pb-[20px] before:absolute before:content-[''] before:top-[100%] before-left-[0] before:w-[calc(100%-20px)] before:h-[2px] before:bg-[#5a4c4c]">
          <div className="pb-[36px]">
            <h4 className="text-[25px] pt-[30px] pb-5 text-[var(--white-color)] lg:text-[30px]">
              {t("content.topTrending")}
            </h4>
            <Button
              className={
                "bg-[#3f51b5] flex items-center gap-[8px] hover:bg-[#303f9f] ml-auto text-[#fff] mr-0"
              }
              iconRight={<ArrowRightIconV2 />}
            >
              <Link to={`/tv/list/${currentPageTv}`}>
                {t("content.viewAll")}
              </Link>
            </Button>
          </div>
          <MainSlide
            items={trendings}
            customClassName="relative top-0 left-0 w-[100%!important] pb-[40px]"
            customClassNameImage={"h-[250px] sm:h-[400px]"}
            customBreakPoints={SLIDE_NO_BACKDROP}
            overlay
          />
        </div>
        <div className="px-[10px]">
          <div className="pb-[36px]">
            <h4 className="text-[25px] pt-[30px] pb-5 text-[var(--white-color)] lg:text-[30px]">
              {t("content.airingToday")}
            </h4>
            <Button
              className={
                "bg-[#3f51b5] flex items-center gap-[8px] hover:bg-[#303f9f] ml-auto text-[#fff] mr-0"
              }
              iconRight={<ArrowRightIconV2 />}
            >
              <Link to={`/tv/list/${currentPageTv}`}>
                {t("content.viewAll")}
              </Link>
            </Button>
          </div>
          <AiringToday items={airingToday} />
        </div>
      </div>
      <div className="bg-[url('https://image.tmdb.org/t/p/w1280/tIX6j3NzadlwGcJ52nuWdmtOQkg.jpg')] pt-[50px] bg-cover bg-fixed ">
        <div className="grid-system wide">
          <div className=" flex flex-col sm:flex-row gap-[16px] pb-[60px] px-[10px]">
            <img
              src={`https://image.tmdb.org/t/p/w300${topPopularMovie.poster_path}`}
              alt=""
              className="object-cover h-[530px] rounded-[10px] sm:h-[400px]"
            />
            <div className="flex flex-col text-[#fff] order-1">
              <div className="flex flex-col gap-[8px] order-2 sm:order-1">
                <i className="text-[2.5rem]">
                  {topPopularMovie.original_title}
                </i>
                <span className="flex items-center gap-[8px] text-[1.4rem] pb-[10px]">
                  <span>Ngày cập nhập:</span>
                  <span className="text-[var(--color-text)]">
                    {topPopularMovie.release_date}
                  </span>
                </span>
              </div>
              <div className="order-1 sm:order-2">
                <div className="flex flex-wrap items-center gap-[12px] mb-[10px]">
                  <h3 className="text-[3.5rem]">Movie Of The Year</h3>
                  <div className="flex items-center">
                    <StarActiveIcon className={"w-[2.4rem] h-[2.4rem]"} />
                    <StarActiveIcon className={"w-[2.4rem] h-[2.4rem]"} />
                    <StarActiveIcon className={"w-[2.4rem] h-[2.4rem]"} />
                    <StarActiveIcon className={"w-[2.4rem] h-[2.4rem]"} />
                    <StarActiveIcon className={"w-[2.4rem] h-[2.4rem]"} />
                  </div>
                </div>
              </div>
              <span className="block text-[1.5rem] mb-[30px] order-3">
                {topPopularMovie.overview}
              </span>
              <Link
                to={`/detailmovie/movie/${topPopularMovie.id}`}
                className="order-4 w-[fit-content]"
              >
                <button className="px-[15px] py-[15px] bg-[#7f5e16] flex items-center gap-[8px] rounded-[10px] hover:bg-[var(--color-text)] transition-all">
                  <span>
                    <ArrowRightIconV3 />
                  </span>
                  <span>{t("detailPage.header.watchNow")}</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
