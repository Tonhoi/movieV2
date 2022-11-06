import React from "react";
import { useParams } from "react-router-dom";

const WatchMovie = () => {
  const { id } = useParams();

  return (
    <div className="w-full h-[500px] bg-[var(--black-color)]">
      <iframe
        width="100%"
        height="500"
        // src={`https://www.2embed.to/embed/tmdb/movie?id=${id}`}
        src={`https://autoembed.to/movie/tmdb/${id}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default WatchMovie;
