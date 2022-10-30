import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Image from "../../components/common/Images/Image";
import { routes } from "../../configs";
import { TabsUi } from "../Home/components/TabsUi";

import "./WatchMovie.scss";
const WatchMovie = () => {
  const [similarMovie, setSimilarMovie] = useState([]);
  const { type, id, season, esp } = useParams();
  const [lengthMovie, setLengthMovie] = useState(0);
  const [seasonMovie, setSeasonMovie] = useState([]);
  //   console.log(type, id, season.slice(1), esp);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/tv/84773/similar?api_key=9568cdb91fe0c79af33b87e59bb90d25`
      );

      setSimilarMovie(res.data.results.slice(0, 12));
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const detailMovie = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=9568cdb91fe0c79af33b87e59bb90d25&language=en-US`
      );
      const seasonMovie = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/season/${season.slice(
          1
        )}?api_key=9568cdb91fe0c79af33b87e59bb90d25&language=en-US`
      );

      setSeasonMovie(seasonMovie.data);

      setLengthMovie(detailMovie.data);
    };
    fetch();
  }, [season, esp]);
  console.log(lengthMovie);

  return (
    <div className="grid-system wide">
      <div className=" pt-[90px]">
        <div
          className={`wrapper-watchMovie  flex flex-col lg:flex-row gap-[30px] text-[var(--white-color)] px-[10px]`}
        >
          <div className="flex-1">
            <iframe
              width="100%"
              height="500"
              src={`https://www.2embed.to/embed/tmdb/tv?id=${id}&s=${season.slice(
                1
              )}&e=${esp.slice(1)}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[12px] pt-[24px]">
              {Array(lengthMovie?.seasons?.length)
                .fill(null)
                .map((item, index) => {
                  return (
                    <Link
                      to={`/watch/tv/${id}/s${index + 1}/e1`}
                      key={index}
                      className={`py-[8px] px-[16px] rounded-[4px] bg-[green] flex justify-center cursor-pointer ${
                        index + 1 == season.slice(1)
                          ? "opacity-50 cursor-default"
                          : ""
                      }`}
                    >
                      <span>
                        {typeof lengthMovie === "undefined"
                          ? `Tập Full`
                          : `Phần ${index + 1}`}
                      </span>
                    </Link>
                  );
                })}
            </div>
            <div className="text-[var(--white-color)] pb-[50px] pt-[20px]">
              <h1 className="text-[3rem] mb-[12px]">{lengthMovie.name}</h1>
              <div className="text-[1.8rem]">
                <h3 className="my-[20px]">
                  Season {seasonMovie.season_number} | Episode 2
                </h3>
                <span className="block my-[20px]">Name: Adrift</span>
                <span className="block my-[20px]">{seasonMovie.overview}</span>
              </div>
              <span className="block my-[20px]">
                Air Date: {seasonMovie.air_date}
              </span>
              <div className="comments">
                <span className="block mb-[20px]">Comments 0</span>
                <div className="flex items-center gap-[12px]">
                  <img
                    src="https://phimmoizzz.netlify.app/user-non-avatar.png"
                    alt=""
                    className="w-[35px] h-[35px] rounded-full"
                  />
                  <div className="text-[1.4rem] py-[10px] px-[16px] bg-[#333] flex-1 rounded-[10px]">
                    <span>
                      You need{" "}
                      <Link to={routes.login} className="text-[#3498db]">
                        login
                      </Link>{" "}
                      to comment
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="basis-[30%]">
            {seasonMovie?.episodes?.length &&
              seasonMovie?.episodes.map((item, index) => {
                return (
                  <Link
                    to={`/watch/tv/${id}/s${season.slice(1)}/e${
                      item.episode_number
                    }`}
                    key={item.id}
                    className={`flex items-center gap-[12px] mb-[8px] cursor-pointer hover:bg-[#E67E22] p-[12px] rounded-[10px] ${
                      item.episode_number == esp.slice(1)
                        ? "bg-[#E67E22] hover:opacity-100 cursor-default"
                        : ""
                    }`}
                  >
                    <div className="w-[116px] shrink-0">
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${item.still_path}`}
                        alt=""
                        className="w-full rounded-[10px]"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span>Episode {item.episode_number}</span>
                      <span className="name-esp">Name: {item.name}</span>
                    </div>
                  </Link>
                );
              })}
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

export default WatchMovie;
