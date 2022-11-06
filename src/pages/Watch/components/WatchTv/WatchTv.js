import React from "react";
import { useParams } from "react-router-dom";

const WatchTv = () => {
  const { id, season, esp } = useParams();
  return (
    <div className="w-full h-[500px] bg-[var(--black-color)]">
      <iframe
        width="100%"
        height="500"
        // src={`https://www.2embed.to/embed/tmdb/tv?id=${id}&s=${season?.slice(
        //   1
        // )}&e=${esp?.slice(1)}`}
        src={`https://autoembed.to/tv/tmdb/${id}-${season?.slice(
          1
        )}-${esp?.slice(1)}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default WatchTv;
