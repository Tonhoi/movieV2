import React, { useCallback, useEffect } from "react";
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
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Movie = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { page } = useParams();

  const loading = useSelector((prev) => prev.callDiscoverMovies.loading);
  // const currentPage = useSelector((prev) => prev.callDiscoverMovies.counter);
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
      const sort = location.search.replace("?", "&");
      try {
        await dispatch(callDiscoverMovie([page, sort]));
      } catch (error) {
        console.log("có lỗi xảy ra");
      }
    };

    fetch();
  }, [dispatch, page, navigate, location]);

  const handleHref = useCallback(
    (e) => {
      if (location.search === " ") {
        navigate(`/movie/list/${e.selected + 1}`);
      } else {
        navigate(`/movie/list/${e.selected + 1}${location.search}`);
      }
      dispatch(setCounter(e.selected + 1));
    },
    [navigate, dispatch, location.search]
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
          <SkeletonTheme baseColor="#202020" highlightColor="#888">
            <div>
              <Skeleton
                count={20}
                width="100%"
                inline
                containerClassName="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[24px] mb-[20px]"
                className="h-[250px] md:h-[300px] rounded-[10px]"
                wrapper={Box}
              />
            </div>
          </SkeletonTheme>
        )}

        <Pagination totalPage={discoverMovies} onClick={handleHref} />
      </div>
    </>
  );
};

function Box({ children }) {
  return (
    <div
      style={{
        display: "block",
        lineHeight: 2,
        width: "100%",
        paddingRight: "10px",
        paddingLeft: "10px",
      }}
    >
      <div>
        {children}
        <div className="mt-[12px]">
          <Skeleton />
        </div>
      </div>
    </div>
  );
}

export default Movie;
