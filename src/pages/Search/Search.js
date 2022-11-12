import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import UseDebounce from "../../hooks/UseDebounce";
import { TabsUi } from "../Home/components/TabsUi";

const Search = () => {
  const [searchValue, setsearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { debounce } = UseDebounce(searchValue, 800);

  console.log(searchResult.length);
  useEffect(() => {
    const fetch = async () => {
      try {
        if (!debounce.trim()) {
          setSearchResult([]);
          return;
        }
        const res = await axios.get(`
            https://api.themoviedb.org/3/search/multi?api_key=9568cdb91fe0c79af33b87e59bb90d25&query=${debounce}`);
        setSearchResult(res.data.results);
      } catch (error) {
        console.log("có lỗi xảy ra");
      }
    };
    fetch();
  }, [debounce]);

  const handleInput = (e) => {
    setsearchValue(e.target.value);
  };
  return (
    <div>
      <div
        className={`bg-[url(https://my-movie-tmdb.netlify.app/static/media/backdrop_login.e682b290.jpg)] bg-cover object-cover pt-[150px] bg-center h-[300px]`}
      ></div>
      <div className="grid-system wide">
        <div className="px-[10px]">
          <div className="py-[20px] flex  max-w-[600px] mx-auto">
            <input
              type="text"
              placeholder="Search here"
              className=" py-[8px] px-[12px] text-[1.8rem] italic flex-1 rounded-[10px]  border-[2px] border-solid border-(var(--white-color))"
              value={searchValue}
              onChange={handleInput}
            />
          </div>
          <div className=" text-[var(--white-color)] pb-[20px]">
            <span className="text-[1.8rem] mb-[20px] mt-[12px] block">
              {searchResult.length === 0
                ? "Bạn chưa tìm kiếm nội dung nào 😅"
                : `Có ${searchResult.length} kết quả cho từ khóa "${debounce}"`}
            </span>

            {searchResult?.length > 0 ? (
              <TabsUi
                items={searchResult}
                customWrapperClass={
                  "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                }
              />
            ) : (
              <SkeletonTheme baseColor="#202020" highlightColor="#444">
                <Skeleton
                  count={20}
                  width="100%"
                  inline
                  containerClassName="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[24px]"
                  className="h-[238px] md:h-[265px]"
                />
              </SkeletonTheme>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
