import axios from "axios";
import React from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Modals } from "../../components/common/Modal";

import { auth } from "../../firebase/firebase-config";

import { AccountItem } from "./Components/AccountItem";
import { ListDetailItem } from "./Components/ListDetailItem";

const Account = () => {
  const [watchListsTv, setWatchListsTv] = useState([]);
  const [watchListsMovies, setWatchListsMovies] = useState([]);
  const [favoriteListMovies, setFavoriteListMovies] = useState([]);
  const [favoriteListTv, setFavoriteListTv] = useState([]);
  const [ratingTv, setRatingTv] = useState([]);
  const [ratingMovies, setRatingMovies] = useState([]);
  const [listDetail, setListDetail] = useState([]);

  // rerender
  const [rerenderWatchList, setRerenderWatchList] = useState(false);
  const [rerenderListDetail, setRerenderListDetail] = useState(false);
  const [rerenderListRating, setRerenderListRating] = useState(false);
  const [rerenderListFavoriteMovie, setRerenderListFavoriteMovie] =
    useState(false);
  // modal
  const [modalIsOpen, setIsOpen] = useState(false);

  const session_id = localStorage.getItem("session_id");

  const currentUser = useSelector((prev) => prev.auth.infoUser);

  useEffect(() => {
    const fetch = async () => {
      try {
        const watchListTv = await axios.get(
          `https://api.themoviedb.org/3/account/15312246/watchlist/tv?api_key=9568cdb91fe0c79af33b87e59bb90d25&language=en-US&session_id=${session_id}&sort_by=created_at.asc&page=1`
        );
        const watchListMovies = await axios.get(
          `https://api.themoviedb.org/3/account/15312246/watchlist/movies?api_key=9568cdb91fe0c79af33b87e59bb90d25&language=en-US&session_id=${session_id}&sort_by=created_at.asc&page=1`
        );

        setWatchListsTv(watchListTv.data.results);
        setWatchListsMovies(watchListMovies.data.results);
      } catch (error) {
        console.log("có lỗi xảy ra");
      }
    };
    fetch();
  }, [rerenderWatchList]);

  useEffect(() => {
    const fetch = async () => {
      const listDetail = await axios.get(
        `https://api.themoviedb.org/3/account/15312246/lists?api_key=9568cdb91fe0c79af33b87e59bb90d25&language=en-US&session_id=${session_id}`
      );
      setListDetail(listDetail.data.results);
    };
    fetch();
  }, [rerenderListDetail]);

  useEffect(() => {
    const fetch = async () => {
      const ratingTv = await axios.get(
        `https://api.themoviedb.org/3/account/15312246/rated/tv?api_key=9568cdb91fe0c79af33b87e59bb90d25&language=en-US&session_id=${session_id}&sort_by=created_at.asc&page=1`
      );
      const ratingMovies = await axios.get(
        `https://api.themoviedb.org/3/account/15312246/rated/movies?api_key=9568cdb91fe0c79af33b87e59bb90d25&language=en-US&session_id=${session_id}&sort_by=created_at.asc&page=1`
      );

      setRatingTv(ratingTv.data.results);
      setRatingMovies(ratingMovies.data.results);
    };
    fetch();
  }, [rerenderListRating]);

  useEffect(() => {
    const fetch = async () => {
      const favoriteListTv = await axios.get(
        `https://api.themoviedb.org/3/account/15312246/favorite/tv?api_key=9568cdb91fe0c79af33b87e59bb90d25&language=en-US&session_id=${session_id}&sort_by=created_at.asc&page=1`
      );
      const favoriteListMovies = await axios.get(
        `https://api.themoviedb.org/3/account/15312246/favorite/movies?api_key=9568cdb91fe0c79af33b87e59bb90d25&language=en-US&session_id=${session_id}&sort_by=created_at.asc&page=1`
      );

      setFavoriteListTv(favoriteListTv.data.results);
      setFavoriteListMovies(favoriteListMovies.data.results);
    };
    fetch();
  }, [rerenderListFavoriteMovie]);

  const handleDeleteRating = useCallback(
    async (id, title) => {
      const guest_session_id = await axios.get(
        "https://api.themoviedb.org/3/authentication/guest_session/new?api_key=9568cdb91fe0c79af33b87e59bb90d25"
      );
      if (title) {
        // movie
        await axios({
          method: "delete",
          url: `https://api.themoviedb.org/3/movie/${id}/rating?api_key=9568cdb91fe0c79af33b87e59bb90d25&guest_session_id=${guest_session_id.data.guest_session_id}&session_id=${session_id}`,
        });
        toast.success("Delete successfull!");
        setRerenderListRating(!rerenderListRating);
      } else {
        // tv

        await axios({
          method: "delete",
          url: `https://api.themoviedb.org/3/tv/${id}/rating?api_key=9568cdb91fe0c79af33b87e59bb90d25&guest_session_id=${guest_session_id.data.guest_session_id}&session_id=${session_id}`,
        });
        toast.success("Delete successfull!");
        setRerenderListRating(!rerenderListRating);
      }
    },
    [rerenderListRating]
  );

  const handleDeleteWatchList = useCallback(
    async (id, title) => {
      if (title) {
        // movie
        await axios({
          method: "post",
          url: `https://api.themoviedb.org/3/account/${id}/watchlist?api_key=9568cdb91fe0c79af33b87e59bb90d25&session_id=${session_id}`,
          data: {
            media_type: "movie",
            media_id: id,
            watchlist: false,
          },
        });
        toast.success("Delete successfull!");
        setRerenderWatchList(!rerenderWatchList);
      } else {
        // tv

        await axios({
          method: "post",
          url: `https://api.themoviedb.org/3/account/${id}/watchlist?api_key=9568cdb91fe0c79af33b87e59bb90d25&session_id=${session_id}`,
          data: {
            media_type: "tv",
            media_id: id,
            watchlist: false,
          },
        });
        toast.success("Delete successfull!");
        setRerenderWatchList(!rerenderWatchList);
      }
    },
    [rerenderWatchList]
  );
  const handleDeleteFavorite = useCallback(
    async (id, title) => {
      if (title) {
        // movie
        await axios({
          method: "post",
          url: `https://api.themoviedb.org/3/account/${id}/favorite?api_key=9568cdb91fe0c79af33b87e59bb90d25&session_id=${session_id}`,
          data: {
            media_type: "movie",
            media_id: id,
            favorite: false,
          },
        });
        toast.success("Delete successfull!");
        setRerenderListFavoriteMovie(!rerenderListFavoriteMovie);
      } else {
        // tv

        await axios({
          method: "post",
          url: `https://api.themoviedb.org/3/account/${id}/favorite?api_key=9568cdb91fe0c79af33b87e59bb90d25&session_id=${session_id}`,
          data: {
            media_type: "tv",
            media_id: id,
            favorite: false,
          },
        });
        toast.success("Delete successfull!");
        setRerenderListFavoriteMovie(!rerenderListFavoriteMovie);
      }
    },
    [rerenderListFavoriteMovie]
  );

  const handleOpenModal = async (id) => {
    setIsOpen(true);
    localStorage.setItem("list_id", id);
  };

  const hanleDeleteList = useCallback(async () => {
    const id = localStorage.getItem("list_id");

    try {
      await axios({
        method: "delete",
        url: `https://api.themoviedb.org/3/list/${id}?api_key=9568cdb91fe0c79af33b87e59bb90d25&session_id=${session_id}`,
      });
    } catch (error) {
      setIsOpen(false);
      localStorage.removeItem("list_id");
      toast.success("Delete list successfull!");
      setRerenderListDetail(!rerenderListDetail);
    }
  }, [rerenderListDetail]);

  const closeModal = useCallback(() => {
    localStorage.removeItem("list_id");
    setIsOpen(false);
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        theme="colored"
      />
      <Modals
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        handleDelete={hanleDeleteList}
      />
      <div className="px-[10px] pb-[20px]">
        <div className="mx-[-10px] bg-[url(https://my-movie-tmdb.netlify.app/static/media/banner-profile.e9a58d20.jpg)] pt-[100px] pb-[50px] object-cover bg-no-repeat bg-center bg-cover">
          <div className="grid-system wide">
            <div className="grid grid-cols-1 sm:grid-cols-[150px,1fr] gap-[40px] px-[10px]">
              <img
                src="https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg"
                alt=""
                className="w-[157px] h-[157px] rounded-full mx-auto"
              />
              <div className="text-[#fff] text-center sm:text-left">
                <span className="block text-[3rem]">Tôn Hội</span>
                <div className="pt-[20px] flex items-center justify-center sm:justify-start">
                  <div className="py-[10px] px-[20px]">
                    Trung Bình Điểm phim
                  </div>
                  <div className="py-[10px] px-[20px]">Trung Bình Điểm TV</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Tabs
            forceRenderTabPanel
            defaultIndex={0}
            className="text-[var(--white-color)]"
          >
            <ul className=" text-[var(--white-color)] flex items-center justify-center pt-[20px] w-full max-w-[960px] mx-auto">
              <TabList className={"text-[var(--white-color)]"}>
                <Tab selectedClassName="bg-[var(--white-color)] text-[var(--bg-options)] rounded-[8px]">
                  <div className="p-[2px]   text-center sm:w-[160px] max-w-[100%]">
                    My Lists
                  </div>
                </Tab>
                <Tab selectedClassName="bg-[var(--white-color)] text-[var(--bg-options)] rounded-[8px]">
                  <div className="p-[2px]   text-center sm:w-[160px] max-w-[100%]">
                    Favorites
                  </div>
                </Tab>
                <Tab selectedClassName="bg-[var(--white-color)] text-[var(--bg-options)] rounded-[8px]">
                  <div className="p-[2px]   text-center sm:w-[160px] max-w-[100%]">
                    Ratings
                  </div>
                </Tab>
                <Tab selectedClassName="bg-[var(--white-color)] text-[var(--bg-options)] rounded-[8px]">
                  <div className="p-[2px] text-center sm:w-[160px] max-w-[100%]">
                    WatchList
                  </div>
                </Tab>
              </TabList>
            </ul>
            <div className="grid-system wide">
              <div className="pt-[15px]">
                <TabPanel>
                  <div className="flex items-center justify-between">
                    <span className="text-[3.4rem] text-[var(--white-color)] font-bold">
                      My lists
                    </span>
                    <Link
                      to={`/account/${currentUser?.displayName}/list/new`}
                      className="py-[10px] px-[16px] bg-[#3f51b5] font-bold rounded-[8px] text-[#fff] text-[1.4rem]"
                      style={{
                        boxShadow:
                          "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
                      }}
                    >
                      CREATE LIST
                    </Link>
                  </div>

                  <ListDetailItem
                    items={listDetail}
                    hanleDeleteList={handleOpenModal}
                  />
                </TabPanel>
                <TabPanel>
                  <Tabs forceRenderTabPanel>
                    <TabList>
                      <Tab>
                        <span className="text-[1.4rem] cursor-pointer">
                          MOVIE {favoriteListMovies?.length}
                        </span>
                      </Tab>
                      <Tab>
                        <span className="text-[1.4rem] cursor-pointer">
                          TV {favoriteListTv?.length}
                        </span>
                      </Tab>
                    </TabList>

                    <TabPanel>
                      <AccountItem
                        items={favoriteListMovies}
                        handleDeleteMovie={handleDeleteFavorite}
                      />
                    </TabPanel>
                    <TabPanel>
                      <AccountItem
                        items={favoriteListTv}
                        handleDeleteMovie={handleDeleteFavorite}
                      />
                    </TabPanel>
                  </Tabs>
                </TabPanel>
                <TabPanel>
                  <Tabs forceRenderTabPanel>
                    <TabList>
                      <Tab>
                        <span className="text-[1.4rem] cursor-pointer">
                          MOVIE {ratingMovies?.length}
                        </span>
                      </Tab>
                      <Tab>
                        <span className="text-[1.4rem] cursor-pointer">
                          TV {ratingTv?.length}
                        </span>
                      </Tab>
                    </TabList>

                    <TabPanel>
                      <AccountItem
                        items={ratingMovies}
                        isRating
                        handleDeleteMovie={handleDeleteRating}
                      />
                    </TabPanel>
                    <TabPanel>
                      <AccountItem
                        items={ratingTv}
                        isRating
                        handleDeleteMovie={handleDeleteRating}
                      />
                    </TabPanel>
                  </Tabs>
                </TabPanel>
                <TabPanel>
                  <Tabs forceRenderTabPanel>
                    <TabList>
                      <Tab>
                        <span className="text-[1.4rem] cursor-pointer">
                          MOVIE {watchListsMovies?.length}
                        </span>
                      </Tab>
                      <Tab>
                        <span className="text-[1.4rem] cursor-pointer">
                          TV {watchListsTv?.length}
                        </span>
                      </Tab>
                    </TabList>
                    <TabPanel>
                      <AccountItem
                        items={watchListsMovies}
                        handleDeleteMovie={handleDeleteWatchList}
                      />
                    </TabPanel>
                    <TabPanel>
                      <AccountItem
                        items={watchListsTv}
                        handleDeleteMovie={handleDeleteWatchList}
                      />
                    </TabPanel>
                  </Tabs>
                </TabPanel>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Account;
