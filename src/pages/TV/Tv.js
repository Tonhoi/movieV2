import React, { useCallback, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Pagination } from "../../components/common/Pagination";
import { Filter } from "../../layouts/DefaultLayouts/Filter";
import { callTvMovie, setCounter } from "../../store/callTvMovie/slice";
import { TabsUi } from "../Home/components/TabsUi";

const Tv = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { page } = useParams();

  const loading = useSelector((prev) => prev.callTvMovies.loading);
  const tvMovies = useSelector((prev) => prev.callTvMovies.callTvMovie);
  const currentPage = useSelector((prev) => prev.callTvMovies.counter);
  // console.log(tvMovies);

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
        await dispatch(callTvMovie([page, sort]));
      } catch (error) {
        console.log("có lỗi xảy ra");
      }
    };

    fetch();
  }, [currentPage, dispatch, page, navigate, location]);

  const handleHref = useCallback(
    (e) => {
      if (location.search === " ") {
        navigate(`/tv/list/${e.selected + 1}`);
      } else {
        navigate(`/tv/list/${e.selected + 1}${location.search}`);
      }
      dispatch(setCounter(e.selected + 1));
    },
    [dispatch, navigate, location.search]
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
            items={tvMovies.results}
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

        <Pagination totalPage={tvMovies} onClick={handleHref} />
      </div>
    </>
  );
};

export default Tv;
