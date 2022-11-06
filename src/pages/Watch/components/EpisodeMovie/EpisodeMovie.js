import React from "react";
import { memo } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Image from "../../../../components/common/Images/Image";

import "../../Watch.scss";
const EpisodeMovie = ({ seasonMovie }) => {
  const { id, season, esp } = useParams();
  const popularMovies = useSelector(
    (prev) => prev.callPopularMovie.callPopularMovie.results
  );

  return !Array.isArray(seasonMovie)
    ? seasonMovie?.episodes?.length && (
        <>
          <span className="block relative text-[1.8rem] pb-[20px] before:absolute before:content-[''] before:top-[100%] before-left-[0] before:w-full before:h-[2px] before:bg-[var(--white-color)]">
            Các tập phim
          </span>
          <div className="mt-[20px]">
            {seasonMovie?.episodes.map((item) => {
              return (
                <Common
                  to={`/watch/tv/${id}/s${season.slice(1)}/e${
                    item.episode_number
                  }`}
                  key={item.id}
                  configClassNameWrapper={`${
                    item.episode_number == esp.slice(1)
                      ? "bg-[#E67E22] hover:opacity-[1!important] cursor-default px-[10px!important]"
                      : ""
                  }`}
                  configClassNameContent={`${
                    item.episode_number == esp.slice(1)
                      ? "text-[var(--white-color)!important]"
                      : ""
                  }`}
                  src={`https://image.tmdb.org/t/p/w500${item.still_path}`}
                  name={`Episode ${item.episode_number}`}
                  title={`Name: ${item.name}`}
                  time={item.air_date}
                  vote_average={`vote count: ${item.vote_count}`}
                />
              );
            })}
          </div>
        </>
      )
    : popularMovies?.length > 0 && (
        <>
          <span className="block relative text-[1.8rem] pb-[20px] before:absolute before:content-[''] before:top-[100%] before-left-[0] before:w-full before:h-[2px] before:bg-[var(--white-color)]">
            Phim gợi ý
          </span>
          <div className="mt-[20px]">
            {popularMovies.map((popularMovie) => (
              <Common
                to={`/watch/movie/${popularMovie.id}`}
                key={popularMovie.id}
                configClassNameWrapper={`${
                  popularMovie.id == id
                    ? "bg-[#E67E22] hover:opacity-[1!important] cursor-default px-[10px!important]"
                    : ""
                }`}
                configClassNameContent={`${
                  popularMovie.id == id
                    ? "text-[var(--white-color)!important]"
                    : ""
                }`}
                src={`https://image.tmdb.org/t/p/w300${popularMovie.poster_path}`}
                name={`${popularMovie.original_title}`}
                title={`${popularMovie.title}`}
                time={popularMovie.release_date}
                vote_average={`vote count: ${popularMovie.vote_count}`}
              />
            ))}
          </div>
        </>
      );
};

const Common = ({
  to,
  configClassNameWrapper = ``,
  src,
  name,
  title,
  time = "",
  vote_average = "",
  configClassNameContent = "",
}) => {
  return (
    <Link
      to={to}
      className={`flex items-center gap-[12px] mb-[6px] cursor-pointer  hover:opacity-75 p-[12px] rounded-[10px] px-[0] ${configClassNameWrapper}`}
    >
      <div className="w-[126px] h-[80px] sm:w-[168px] sm:h-[94px] shrink-0 ">
        <Image
          src={`${src}`}
          alt=""
          className="w-full rounded-[10px] object-cover h-[100%]"
        />
      </div>
      <div className="flex flex-col flex-1">
        <span className="name-esp text-[1.4rem]">{name}</span>
        <span className="name-esp text-[1.4rem]">{title}</span>
        <span
          className={`name-esp text-[1.2rem] mt-[4px] text-[#909090] ${configClassNameContent}`}
        >
          {vote_average}
        </span>
        <span
          className={`name-esp text-[1.2rem] mt-[2px] text-[#909090] ${configClassNameContent}`}
        >
          {time}
        </span>
      </div>
    </Link>
  );
};

export default memo(EpisodeMovie);
