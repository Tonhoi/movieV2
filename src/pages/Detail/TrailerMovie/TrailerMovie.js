import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { memo } from "react";

const TrailerMovie = ({ detailMovie }) => {
  const [text, setTest] = useState("");
  const { type, id, season, esp } = useParams();

  // useEffect(() => {
  //   const fetch = async () => {
  //     const res = await axios.get(
  //       `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${detailMovie?.videos?.results[0]?.key}`
  //     );
  //     setTest(res.data.html);
  //   };
  //   fetch();
  // }, []);
  console.log(`https://autoembed.to/trailer/${type}/${id}?autoplay=1&rel=0`);
  return (
    <div className="w-[100%] h-[50vh] max-w-[900px] rounded-[20px] overflow-hidden px-[8px] text-[var(--white-color)] flex items-center justify-center text-[4rem] italic">
      {/* {typeof text !== "undefined" ? (
        <div className="w-[100%] h-[50vh] max-w-[900px] rounded-[20px] bg-[var(--black-color)]">
          {Parser(
            text
              .replace("200", "100%")
              .replace("150", "100%")
              .replace("113", "100%")
          )}
        </div>
      ) : (
        <div className="p-[16px] bg-black rounded-[10px]">
          Phim này hiện chưa có trailer
        </div>
      )} */}
      <div className="w-[100%] h-[50vh] max-w-[900px] rounded-[20px] bg-[var(--black-color)]">
        <iframe
          width="100%"
          height="100%"
          src={`https://autoembed.to/trailer/${type}/${id}?autoplay=1&rel=0`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default memo(TrailerMovie);
