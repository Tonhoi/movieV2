import React, { useEffect, useState } from "react";

import axios from "axios";

// tabs ui
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {
  ArrowRightIconV2,
  ArrowRightIconV3,
  StarActiveIcon,
} from "../../components/common/Icons";

import "./Home.scss";
import { TabsUi } from "./components/TabsUi";
import { Slider } from "./components/Slider";
import { MainSlide } from "./components/Slider/MainSlide";
import Button from "../../components/common/Button/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const currentPageTv = useSelector((prev) => prev.callTvMovies.counter);
  const currentPageMovie = useSelector(
    (prev) => prev.callDiscoverMovies.counter
  );

  const [popularMovies, setPopularMovies] = useState([]);
  const [topRateds, setTopRateds] = useState([]);
  const [upComings, setUpComings] = useState([]);
  const [nowPlayings, setNowPlayings] = useState([]);
  const [trendings, setTrendings] = useState([]);
  const [topPopularMovie, setTopPopularMovie] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const popularMovie = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?api_key=9568cdb91fe0c79af33b87e59bb90d25&language=en-US&page=1"
      );
      const topRated = await axios.get(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=9568cdb91fe0c79af33b87e59bb90d25&language=en-US&page=1"
      );
      const upComing = await axios.get(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=9568cdb91fe0c79af33b87e59bb90d25&language=en-US&page=1"
      );
      const nowPlaying = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=9568cdb91fe0c79af33b87e59bb90d25&language=en-US&page=1"
      );
      const trending = await axios.get(
        "https://api.themoviedb.org/3/trending/all/day?api_key=9568cdb91fe0c79af33b87e59bb90d25"
      );
      console.log(popularMovie.data.results);
      setTopPopularMovie(
        popularMovie.data.results[Math.floor(Math.random() * 12)]
      );
      setPopularMovies(popularMovie.data.results.slice(0, 12));
      setTopRateds(topRated.data.results.slice(0, 12));
      setUpComings(upComing.data.results.slice(0, 12));
      setNowPlayings(nowPlaying.data.results.slice(0, 12));
      setTrendings(trending.data.results);
    };

    fetch();
  }, []);

  return (
    <>
      {/* slider */}
      <Slider
        items={popularMovies}
        title="Popular Movie"
        isBgSlider
        absoluteCenter
        reponesiveImage
        customBreakPoints={{
          "@0.00": {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          "@0.75": {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          "@1.00": {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          "@1.50": {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
      />

      {/* tabs ui */}
      <div className="tabs-ui grid-system wide">
        <div className="relative before:absolute before:content-[''] before:top-[100%] before-left-[0] before:w-full before:h-[2px] before:bg-[#5a4c4c] pt-[60px] pb-[20px] text-[var(--white-color)]">
          <Tabs disableUpDownKeys={true}>
            <div className="mb-[24px]">
              <TabList className={"ml-[12px]"}>
                <Tab>TOP RATED</Tab>
                <Tab>UP COMING</Tab>
                <Tab>NOW PLAYING</Tab>
              </TabList>
              <Button
                className={
                  " bg-[#3f51b5] flex items-center gap-[8px] mr-[12px] hover:bg-[#303f9f] ml-auto"
                }
                iconRight={<ArrowRightIconV2 />}
              >
                <Link to={`/movie/list/${currentPageMovie}`}>View All</Link>
              </Button>
            </div>

            <TabPanel>
              <TabsUi
                items={topRateds}
                customWrapperClass={
                  "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
                }
              />
            </TabPanel>
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
        <div className="px-[10px]">
          <div className="pb-[36px]">
            <h4 className="text-[25px] pt-[30px] pb-5 text-[var(--white-color)] lg:text-[30px]">
              TOP TRENDING
            </h4>
            <Button
              className={
                "bg-[#3f51b5] flex items-center gap-[8px] hover:bg-[#303f9f] ml-auto text-[var(--white-color)] mr-0"
              }
              iconRight={<ArrowRightIconV2 />}
            >
              <Link to={`/tv/list/${currentPageTv}`}>View All</Link>
            </Button>
          </div>
          <MainSlide
            items={trendings}
            customClassName="relative top-0 left-0 w-[100%!important] pb-[40px]"
            customClassNameImage={"h-[250px] sm:h-[400px]"}
            customBreakPoints={{
              "@0.00": {
                slidesPerView: 2,
                spaceBetween: 18,
              },
              "@0.75": {
                slidesPerView: 3,
                spaceBetween: 18,
              },
              "@1.00": {
                slidesPerView: 4,
                spaceBetween: 18,
              },
              "@1.50": {
                slidesPerView: 5,
                spaceBetween: 18,
              },
            }}
          />
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
            <div className="flex flex-col text-[var(--white-color)] order-1">
              <div className="flex flex-col gap-[8px] order-2 sm:order-1">
                <i className="text-[2.5rem]">
                  {topPopularMovie.original_title}
                </i>
                <span className="flex items-center gap-[8px] text-[1.4rem] pb-[10px]">
                  <span>Ngày cập nhập:</span>
                  <span className="text-[#f9ab00]">
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
                <button className="px-[15px] py-[15px] bg-[#7f5e16] flex items-center gap-[8px] rounded-[10px] hover:bg-[#f9ab00] transition-all">
                  <span>
                    <ArrowRightIconV3 />
                  </span>
                  <span>WATCH NOW</span>
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
