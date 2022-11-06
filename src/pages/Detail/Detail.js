import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useTranslation } from "react-i18next";

import CreditApi from "../../api/CreditApi";
import DetailMovieApi from "../../api/DetailMovieApi";
import { Button } from "../../components/common/Button";
import { StarActiveIcon } from "../../components/common/Icons";
import Image from "../../components/common/Images/Image";
import { Overlay } from "../../components/common/Overlay";
import { TabsUi } from "../Home/components/TabsUi";

import "./Detail.scss";
import TrailerMovie from "./TrailerMovie/TrailerMovie";
import TopRatedApi from "../../api/TopRatedApi";
import PopularMovieApi from "../../api/PopularMovieApi";
import ImageMovieApi from "../../api/ImageMovieApi";
import ReviewMovieApi from "../../api/ReviewMovieApi";
const Detail = () => {
  const { t } = useTranslation();
  const { type, id } = useParams();

  const [popularMovies, setPopularMovies] = useState([]);
  const [topRateds, setTopRateds] = useState([]);

  const [detailMovie, setDetailMovie] = useState([]);
  const [credits, setCredits] = useState([]);
  const [imageMovie, setImageMovie] = useState([]);
  const [reviewMovie, setReviewMovie] = useState([]);

  const [isTrailerMovie, setIsTrailerMovie] = useState(false);
  console.log(detailMovie);
  useEffect(() => {
    const fetch = async () => {
      const popularMovie = await PopularMovieApi.getByPage();
      const topRated = await TopRatedApi.getByPage();

      setPopularMovies(popularMovie.results.slice(0, 6));

      setTopRateds(topRated.results.slice(0, 12));
    };

    fetch();
  }, []);
  useEffect(() => {
    const fetch = async () => {
      const detailMovie = await DetailMovieApi.getById(type, id);
      const credit = await CreditApi.getById(type, id);
      const imageMovie = await ImageMovieApi.getById(type, id);
      const reviewMovie = await ReviewMovieApi.getById(type, id);

      setReviewMovie(reviewMovie.results);

      setDetailMovie(detailMovie);
      setCredits(credit.cast);
      setImageMovie(imageMovie.backdrops);
    };
    fetch();
  }, [id]);

  const handleTrailerMovie = () => {
    setIsTrailerMovie(true);
  };

  return (
    <>
      <div className="wraper-detail">
        <div
          className={`relative bg-cover object-cover aspect-[2/1] bg-top w-full h-[100%] `}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${detailMovie?.backdrop_path})`,
          }}
        >
          <Overlay configClassName="absolute gradient" />
          <div className="grid-system wide">
            <div className="relative flex flex-col md:flex-row px-[10px] items-center gap-[30px] z-[19] text-[#fff] pt-[120px] pb-[50px]  md:pt-[250px] md:pb-[80px]">
              <img
                src={`https://image.tmdb.org/t/p/w500${detailMovie.poster_path}`}
                alt=""
                className="max-h-[450px] rounded-[10px]"
              />
              <div>
                <h1 className="text-[3rem] mb-[20px] font-bold text-left">
                  {detailMovie.title || detailMovie.original_name}
                </h1>
                <span className="block leading-[1.6] max-w-[]">
                  {detailMovie.overview}
                </span>
                <span className="block mt-[20px]">
                  Last episode:{" "}
                  {detailMovie.first_air_date || detailMovie.release_date}
                </span>
                <div className="genres my-[20px] flex  gap-[16px] flex-wrap">
                  {detailMovie.genres?.length > 0 &&
                    detailMovie.genres.map((genre) => (
                      <Button
                        className={
                          "rounded-[50px] py-[5px] px-[10px] border-2 border-[#fff]"
                        }
                        key={genre.id}
                      >
                        {genre.name}
                      </Button>
                    ))}
                </div>
                <div className="ratings flex gap-[8px]">
                  <div className="star-ratings flex gap-[1px]">
                    <StarActiveIcon className={"w-[2.4rem] h-[2.4rem]"} />
                    <StarActiveIcon className={"w-[2.4rem] h-[2.4rem]"} />
                    <StarActiveIcon className={"w-[2.4rem] h-[2.4rem]"} />
                    <StarActiveIcon className={"w-[2.4rem] h-[2.4rem]"} />
                    <StarActiveIcon className={"w-[2.4rem] h-[2.4rem]"} />
                  </div>
                  <span className="ratings-count">
                    ({detailMovie.vote_count} vote)
                  </span>
                </div>

                <div className="watch my-[20px] rounded-sm flex gap-[12px] flex-wrap flex-col md:flex-row">
                  <Button
                    to={`${
                      detailMovie.title
                        ? `/watch/movie/${detailMovie.id}`
                        : `/watch/tv/${detailMovie.id}/s1/e1`
                    }`}
                    className={
                      "bg-[#34495e] py-[16px] md:py-[10px] text-center hover:opacity-70"
                    }
                  >
                    {t("detailPage.header.watchNow")}
                  </Button>
                  <Button
                    className={
                      "bg-[#34495e] py-[16px] md:py-[10px] hover:opacity-70"
                    }
                    onClick={handleTrailerMovie}
                  >
                    {t("detailPage.header.watchTrailer")}
                  </Button>
                  <Button
                    className={
                      "bg-[#34495e] py-[16px] md:py-[10px] hover:opacity-70"
                    }
                  >
                    {t("detailPage.header.addToFavorites")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid-system wide relative">
          <div className="absolute top-[100%] left-[0] w-full h-[2px] bg-[var(--white-color)]"></div>
          <div className="flex justify-between  text-[var(--white-color)] pt-[40px] mx-[10px] flex-col lg:flex-row">
            <div className="basis-[90%]">
              <Tabs disableUpDownKeys={true}>
                <TabList className={"ml-[12px]"}>
                  <Tab>{t("detailPage.content.credit")}</Tab>
                  <Tab>{t("detailPage.content.review")}</Tab>
                  <Tab>{t("detailPage.content.photos")}</Tab>
                </TabList>

                <div className="py-[24px]">
                  <TabPanel>
                    <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2">
                      {credits?.length > 0 &&
                        credits.map((credit) => (
                          <div
                            key={credit.id}
                            className="flex flex-col lg:flex-row items-center gap-[15px] py-[12px]"
                          >
                            <Image
                              src={`https://image.tmdb.org/t/p/w300${credit.profile_path}`}
                              alt=""
                              className="w-[100px] h-[100px] rounded-full object-cover flex-shrink-0"
                            />
                            <div className="flex flex-col text-center lg:text-left">
                              <span className="font-bold">
                                {credit.original_name}
                              </span>
                              <span className="text-[var(--color-text)]">
                                {credit.character}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </TabPanel>
                  <TabPanel>
                    {reviewMovie?.length > 0 &&
                      reviewMovie.map((reviewMovie, index) => (
                        <div
                          key={index}
                          className="flex items-start p-[15px] border-2 border-solid border-[#262424] rounded-[10px] mt-[10px]"
                        >
                          <Image
                            src={`https://i.pravatar.cc/300?u=${reviewMovie.id}`}
                            alt=""
                            className="object-cover w-[50px] h-[50px] mr-[15px] rounded-[4px]"
                          />
                          <div>
                            <div className="text-left">
                              <span className=" content-review text-[1.3rem] break-all">
                                {reviewMovie.content}
                              </span>
                              <Button className="text-[1.5rem] pl-0 cursor-pointer text-[#a67c7c] hover:opacity-70">
                                Read MORE
                              </Button>
                            </div>
                            <span className="text-[1.3rem] text-[#a67c7c]">
                              {reviewMovie.updated_at} by {reviewMovie.author}
                            </span>
                          </div>
                          <div className="flex justify-center items-center mx-[10px] font-bold rounded-full min-w-[30px] h-[30px] border-2 border-solid border-[var(--color-text)] text-[1.3rem]">
                            <span>
                              {!!reviewMovie.author_details.rating
                                ? reviewMovie.author_details.rating
                                : "0"}
                            </span>
                          </div>
                        </div>
                      ))}
                  </TabPanel>
                  <TabPanel>
                    <div className="grid grid-cols-3">
                      {imageMovie?.length > 0 &&
                        imageMovie.map((imageMovie, index) => (
                          <div className="p-[12px]" key={index}>
                            <img
                              src={`https://image.tmdb.org/t/p/w300${imageMovie.file_path}`}
                              alt=""
                              className="rounded-[10px] object-cover"
                              height="800"
                            />
                          </div>
                        ))}
                    </div>
                  </TabPanel>
                </div>
              </Tabs>
            </div>
            <div className="basis-[50%]">
              <h3 className="text-[2.2rem] sm:text-[2.5rem] lg:text-[3.4rem] font-bold text-left lg:text-center mb-[20px]">
                {t("detailPage.content.feedback")}
              </h3>
              <TabsUi
                items={topRateds}
                customWrapperClass={
                  "grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-2  "
                }
              />
            </div>
          </div>
        </div>
        <div className="grid-system wide">
          <div className="text-[var(--white-color)]">
            <h3 className="py-[25px] px-[10px] text-[2.2rem] sm:text-[2.5rem] lg:text-[3rem] font-bold">
              {t("detailPage.content.recommend")}
            </h3>
            <TabsUi
              items={popularMovies}
              customWrapperClass={
                "grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 lg:grid-cols-3 "
              }
            />
          </div>
        </div>
      </div>

      {isTrailerMovie && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-[99999]"
          onClick={() => setIsTrailerMovie(false)}
        >
          <TrailerMovie />
        </div>
      )}
    </>
  );
};

export default Detail;
