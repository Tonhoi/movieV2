import React, { useEffect } from "react";
import { useCallback } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Pagination } from "../../components/common/Pagination";
import Filter from "../../layouts/DefaultLayouts/Filter/Filter";
import { callTopRated, setCounter } from "../../store/callTopRated/slice";
import AiringToday from "../Home/components/AiringToday/AiringToday";

const TopRated = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { page } = useParams();

  const loading = useSelector((prev) => prev.callTopRated.loading);
  const topRated = useSelector((prev) => prev.callTopRated.callTopRateds);
  const currentPage = useSelector((prev) => prev.callTopRated.counter);
  useEffect(() => {
    const fetch = async () => {
      try {
        await dispatch(callTopRated(page));
      } catch (error) {
        console.log("có lỗi xảy ra");
      }
    };

    fetch();
  }, [currentPage, dispatch]);

  const handleHref = useCallback(
    (e) => {
      navigate(`/top-rated/list/${e.selected + 1}`);
      dispatch(setCounter(e.selected + 1));
    },
    [currentPage, dispatch]
  );

  return (
    <>
      <div
        className={`bg-[url(https://my-movie-tmdb.netlify.app/static/media/backdrop_login.e682b290.jpg)] bg-cover object-cover pt-[150px] bg-center h-[300px]`}
      ></div>
      <Filter />

      <div className="grid-system wide">
        {!loading ? (
          <div className="px-[10px]">
            <AiringToday items={topRated.results} />
          </div>
        ) : (
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton
              count={20}
              width="100%"
              inline
              containerClassName="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[24px]"
              className="h-[160px]"
            />
          </SkeletonTheme>
        )}
        <Pagination totalPage={topRated} onClick={handleHref} />
      </div>
    </>
  );
};

export default TopRated;
