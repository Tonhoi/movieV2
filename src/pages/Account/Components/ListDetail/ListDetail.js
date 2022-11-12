import axios from "axios";
import React, { useCallback, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ArrowRighticon } from "../../../../components/common/Icons";
import { Modals } from "../../../../components/common/Modal";
import { auth } from "../../../../firebase/firebase-config";
import TabsUi from "../../../Home/components/TabsUi/TabsUi";

const ListDetail = () => {
  const { id } = useParams();

  const [data, setData] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const results = await axios.get(
        `https://api.themoviedb.org/3//list/${id}?api_key=9568cdb91fe0c79af33b87e59bb90d25&language=en-US`
      );
      setData(results.data.items);
    };
    fetch();
  }, []);

  const handleModalOpen = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = useCallback(() => {
    setModalIsOpen(false);
  }, []);

  const handleClearList = useCallback(async () => {
    await axios.post(
      `https://api.themoviedb.org/3/list/${id}/clear?api_key=9568cdb91fe0c79af33b87e59bb90d25&session_id=${localStorage.getItem(
        "session_id"
      )}&confirm=true`
    );
    toast.success("Clear list successfull !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    setModalIsOpen(false);
  }, [modalIsOpen]);

  return (
    <>
      <ToastContainer />
      <Modals
        modalIsOpen={modalIsOpen}
        closeModal={handleCloseModal}
        handleDelete={handleClearList}
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
        <div className="grid-system wide">
          <Link
            to={`/account/${auth.currentUser?.displayName}`}
            className="flex items-center gap-5 hover:opacity-70 cursor-pointer hover:animate-pulse w-[fit-content] text-[var(--white-color)] font-medium"
          >
            <ArrowRighticon
              className={"rotate-[180deg] w-[2.5rem] h-[2.5rem]"}
            />
            <span className="my-5 text-[2.5rem]">Back</span>
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-3 text-[#19bae5] font-semibold mb-[20px]">
            <div className="flex flex-col items-center">
              <i className="text-[3rem]">{data?.length}</i>
              <span className="text-[2.5rem]">ITEM IN THIS LIST</span>
            </div>
            <div className="flex flex-col items-center">
              <i className="text-[3rem]">0%</i>
              <span className="text-[2.5rem]">AVERAGE RATING</span>
            </div>
            <div className="flex flex-col items-center">
              <i className="text-[3rem]">0.00</i>
              <span className="text-[2.5rem]">TOTAL POPULARITY</span>
            </div>
          </div>
          {data?.length > 0 ? (
            <div className="grid">
              <TabsUi
                items={data}
                customWrapperClass={
                  "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
                }
              />
            </div>
          ) : (
            <span className="block py-[3rem]">
              There are no movies in this list
            </span>
          )}
          <div className="text-center font-bold text-[#fff]">
            <button
              className="py-[6px] px-[16px] bg-[#3f51b5] rounded-[4px] mr-5"
              onClick={handleModalOpen}
            >
              CLEAR LIST
            </button>
            <Link
              to={`/account/${auth.currentUser.displayName}/${id}/edit`}
              className="py-[6px] px-[16px] bg-[#3f51b5] rounded-[4px]"
            >
              ADD ITEM
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListDetail;
