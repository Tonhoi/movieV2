import React, { useCallback, useEffect, useState } from "react";
// import images from "../../assets/image";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { TabsUi } from "../Home/components/TabsUi";
import { Pagination } from "../../components/common/Pagination";

import "./Movie.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  callDiscoverMovie,
  setCounter,
} from "../../store/callDiscoverMovie/slice";
import { Filter } from "../../layouts/DefaultLayouts/Filter";
import { useNavigate, useParams } from "react-router-dom";

const Movie = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { page } = useParams();

  const loading = useSelector((prev) => prev.callDiscoverMovies.loading);
  const currentPage = useSelector((prev) => prev.callDiscoverMovies.counter);
  const discoverMovies = useSelector(
    (prev) => prev.callDiscoverMovies.callDiscoverMovie
  );

  // console.log(currentPage);
  // const [state, setState] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: null,
  //     key: "selection",
  //   },
  // ]);

  useEffect(() => {
    const fetch = async () => {
      try {
        await dispatch(callDiscoverMovie(page));
      } catch (error) {
        console.log("có lỗi xảy ra");
      }
    };

    fetch();
  }, [currentPage, dispatch]);

  const handleHref = useCallback(
    (e) => {
      navigate(`/movie/list/${e.selected + 1}`);
      dispatch(setCounter(e.selected + 1));
      document.documentElement.scrollTop = 0;
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
          <TabsUi
            items={discoverMovies.results}
            customWrapperClass={
              "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 text-[var(--white-color)]"
            }
          />
        ) : (
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton
              count={20}
              width="100%"
              inline
              containerClassName="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[24px]"
              className="h-[265px]"
            />
          </SkeletonTheme>
        )}

        <Pagination
          totalPage={discoverMovies.total_pages}
          onClick={handleHref}
        />
      </div>
    </>
  );
};

export default Movie;
