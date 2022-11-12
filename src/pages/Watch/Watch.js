import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { routes } from "../../configs";
import { TabsUi } from "../Home/components/TabsUi";
import { WatchTv } from "./components/WatchTv";
import { WatchMovie } from "./components/WatchMovie";
import { EpisodeMovie } from "./components/EpisodeMovie";
import { useDispatch, useSelector } from "react-redux";

import "./Watch.scss";
import { callPopularMovie } from "../../store/CallPopularMovie/slice";
import DetailMovieApi from "../../api/DetailMovieApi";
import Comment from "./components/Comment/Comment";
const Watch = () => {
  const dispatch = useDispatch();
  const [similarMovie, setSimilarMovie] = useState([]);
  const { type, id, season, esp } = useParams();
  const [detailMovie, setDetailMovie] = useState([]);
  const [seasonMovie, setSeasonMovie] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const similarMovie = await axios.get(
        `https://api.themoviedb.org/3/tv/84773/similar?api_key=9568cdb91fe0c79af33b87e59bb90d25`
      );

      if (typeof season === "undefined" && typeof esp === "undefined") {
        await dispatch(callPopularMovie(Math.floor(Math.random() * 500) + 1));
      }

      setSimilarMovie(similarMovie.data.results.slice(0, 12));
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const detailMovie = await DetailMovieApi.getById(type, id);

      if (typeof season !== "undefined" && typeof esp !== "undefined") {
        const seasonMovie = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}/season/${season?.slice(
            1
          )}?api_key=9568cdb91fe0c79af33b87e59bb90d25&language=en-US`
        );
        setSeasonMovie(seasonMovie.data);
      }

      setDetailMovie(detailMovie);
    };
    fetch();
  }, [season, esp, id]);

  return (
    <div className="grid-system wide">
      <div className=" pt-[90px]">
        <div
          className={`wrapper-watchMovie  flex flex-col lg:flex-row gap-[30px] text-[var(--white-color)] px-[10px]`}
        >
          <div className="flex-1">
            {typeof season === "undefined" && typeof esp === "undefined" ? (
              <WatchMovie />
            ) : (
              <WatchTv />
            )}
            <i className="block text-center mt-[12px] text-[1.4rem]">
              Hãy đổi server nếu bạn cảm thấy phim load chậm{" "}
            </i>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[12px] pt-[24px]">
              {Array(detailMovie?.seasons?.length)
                .fill(null)
                .map((item, index) => {
                  return (
                    <Link
                      to={`${
                        typeof season !== "undefined" &&
                        typeof esp !== "undefined"
                          ? `/watch/tv/${id}/s${index + 1}/e1`
                          : `/watch/movie/${id}`
                      }`}
                      key={index}
                      className={`py-[8px] px-[16px] rounded-[4px] bg-[green] flex justify-center cursor-pointer text-[#fff] ${
                        index + 1 == season?.slice(1) ||
                        seasonMovie.length === 0
                          ? "opacity-50 cursor-default "
                          : ""
                      }`}
                    >
                      <span>
                        {typeof detailMovie === "undefined" ||
                        seasonMovie.length === 0
                          ? `Tập Full`
                          : `Phần ${index + 1}`}
                      </span>
                    </Link>
                  );
                })}
            </div>
            <div className="text-[var(--white-color)] pb-[50px] pt-[20px]">
              <h1 className="text-[3rem] mb-[12px] text-left">
                {detailMovie.name || detailMovie.original_title}
              </h1>
              <div className="text-[1.8rem]">
                <h3 className="my-[20px]">
                  Season {seasonMovie?.season_number} | Episode {esp?.slice(1)}
                </h3>
                <span className="block my-[20px]">
                  <span>Name: </span>
                  {!Array.isArray(seasonMovie)
                    ? `${seasonMovie?.episodes[esp?.slice(1) - 1]?.name}`
                    : `${detailMovie.title}`}
                </span>
                <span className="block my-[20px]">
                  {/* {!Array.isArray(seasonMovie)
                    ? `${seasonMovie?.episodes[esp?.slice(1) - 1]?.overview}`
                    : `${detailMovie?.overview}`} */}
                  {detailMovie?.overview}
                </span>
              </div>
              <span className="block my-[20px]">
                Air Date: {seasonMovie?.air_date || detailMovie?.release_date}
              </span>
              <Comment />
            </div>
          </div>
          <div className="basis-[40%]">
            <EpisodeMovie seasonMovie={seasonMovie} />
          </div>
        </div>
        <div className="similar text-[var(--white-color)]">
          <span className="block text-[2rem] my-[20px] px-[10px]">SIMILAR</span>
          <TabsUi
            items={similarMovie}
            customWrapperClass={
              "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Watch;
