import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { Button } from "../../components/common/Button";
import { StarActiveIcon } from "../../components/common/Icons";
import Image from "../../components/common/Images/Image";
import { Overlay } from "../../components/common/Overlay";
import { TabsUi } from "../Home/components/TabsUi";

import "./Detail.scss";
const Detail = () => {
  const { type, id } = useParams();
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRateds, setTopRateds] = useState([]);

  const [detailMovie, setDetailMovie] = useState([]);
  const [credits, setCredits] = useState([]);
  const [imageMovie, setImageMovie] = useState([]);
  const [reviewMovie, setReviewMovie] = useState([]);
  // console.log(detailMovie?.seasons?.length);
  useEffect(() => {
    const fetch = async () => {
      const popularMovie = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?api_key=9568cdb91fe0c79af33b87e59bb90d25&language=en-US&page=1"
      );
      const topRated = await axios.get(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=9568cdb91fe0c79af33b87e59bb90d25&language=en-US&page=1"
      );

      setPopularMovies(popularMovie.data.results.slice(0, 6));

      setTopRateds(topRated.data.results.slice(0, 12));
    };

    fetch();
  }, []);
  useEffect(() => {
    const fetch = async () => {
      const detailMovie = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=9568cdb91fe0c79af33b87e59bb90d25&language=en-US`
      );
      const credit = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=9568cdb91fe0c79af33b87e59bb90d25&language=en-US`
      );
      const imageMovie = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}/images?api_key=d6c392186e19bae2e1addaadb1677274`
      );
      const reviewMovie = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}/reviews?api_key=d6c392186e19bae2e1addaadb1677274&language=en-US&page=1`
      );

      setReviewMovie(reviewMovie.data.results);

      setDetailMovie(detailMovie.data);
      setCredits(credit.data.cast);
      setImageMovie(imageMovie.data.backdrops);
    };
    fetch();
  }, [id]);

  return (
    <div className="wraper-detail">
      <div
        className={`relative bg-cover object-cover aspect-[2/1] bg-top w-full h-[100%]`}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${detailMovie?.backdrop_path})`,
        }}
      >
        <Overlay configClassName="absolute gradient" />
        <div className="grid-system wide">
          <div className="relative flex flex-col md:flex-row px-[10px] items-center gap-[30px] z-[19] text-[var(--white-color)] pt-[120px] pb-[50px]  md:pt-[250px] md:pb-[80px]">
            <img
              src={`https://image.tmdb.org/t/p/w500${detailMovie.poster_path}`}
              alt=""
              className="max-h-[450px] rounded-[10px]"
            />
            <div>
              <h1 className="text-[3rem] mb-[20px] font-bold">
                {detailMovie.original_name || detailMovie.original_title}
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
                        "rounded-[50px] py-[5px] px-[10px] border-2 border-[var(--white-color)]"
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
                  className={"bg-[#34495e] py-[16px] md:py-[10px] text-center"}
                >
                  Watch Now
                </Button>
                <Button className={"bg-[#34495e] py-[16px] md:py-[10px]"}>
                  Watch Trailer
                </Button>
                <Button className={"bg-[#34495e] py-[16px] md:py-[10px]"}>
                  Add to favorites
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
                <Tab>CREDIT</Tab>
                <Tab>REVIEW</Tab>
                <Tab>PHOTOS</Tab>
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
                            <span className="text-[#f9ab00]">
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
                        <div className="flex justify-center items-center mx-[10px] font-bold rounded-full min-w-[30px] h-[30px] border-2 border-solid border-[#f9ab00] text-[1.3rem]">
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
                        <div key={index} className="p-[12px]">
                          <img
                            src={`https://image.tmdb.org/t/p/w300${imageMovie.file_path}`}
                            alt=""
                            className="rounded-[10px] object-cover"
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
              You may also like...
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
            We Recommended for you
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
  );
};

export default Detail;