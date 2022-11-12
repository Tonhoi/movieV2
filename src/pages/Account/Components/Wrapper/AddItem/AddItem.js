import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Wrapper from "../Wrapper";
import { Modals } from "../../../../../components/common/Modal";
import UseDebounce from "../../../../../hooks/UseDebounce";
import { CloseIcon } from "../../../../../components/common/Icons";
import { auth } from "../../../../../firebase/firebase-config";
import { Button } from "../../../../../components/common/Button";

const AddItem = () => {
  console.log("re-render");
  const { id } = useParams();

  const [searchResults, setSearchResults] = useState([]);
  const [items, setitems] = useState([]);

  const [inputValue, setInputValue] = useState("");
  const { debounce } = UseDebounce(inputValue);

  const [isMenu, setIsMenu] = useState(false);
  const [rerender, setRerender] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const currentUser = useSelector((prev) => prev.auth.infoUser);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3//list/${id}?api_key=9568cdb91fe0c79af33b87e59bb90d25&language=en-US`
      );
      setitems(res.data.items);
    };
    fetch();
  }, [rerender]);

  useEffect(() => {
    const fetch = async () => {
      if (debounce.trim() === "") {
        setSearchResults([]);
        return;
      }
      const searchResult = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=9568cdb91fe0c79af33b87e59bb90d25&language=en-US&query=${debounce}`
      );
      setSearchResults(searchResult.data.results);
    };
    fetch();
  }, [debounce]);

  useEffect(() => {
    const handleOpenCloseMenu = (e) => {
      if (!e.target.closest(".input") || !e.target.closest(".menu")) {
        setIsMenu(false);
      }
      if (e.target.closest(".input")) {
        setIsMenu(true);
      }
    };
    document.addEventListener("click", handleOpenCloseMenu);

    return () => {
      document.removeEventListener("click", handleOpenCloseMenu);
    };
  }, []);

  const handleInputvalue = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddItem = async (idItem) => {
    try {
      await axios({
        method: "post",
        url: `https://api.themoviedb.org/3/list/${id}/add_item?api_key=9568cdb91fe0c79af33b87e59bb90d25&session_id=${localStorage.getItem(
          "session_id"
        )}`,
        data: {
          media_id: idItem,
        },
      });
      toast.success("Add the movie to success list !");
      setRerender(!rerender);
    } catch (error) {
      toast.error("the movie already exists on the list !");
    }
  };

  const handleModalOpen = (itemId, itemType) => {
    const idAndType = JSON.stringify({ itemId, itemType });
    localStorage.setItem("item_list", idAndType);
    setModalIsOpen(true);
  };

  const closeModal = useCallback(() => {
    localStorage.removeItem("item_list");
    setModalIsOpen(false);
  }, []);

  const handleDeleteItem = useCallback(async () => {
    const localStore = JSON.parse(localStorage.getItem("item_list"));
    await axios({
      method: "post",
      url: `https://api.themoviedb.org/3/list/${id}/remove_item?api_key=9568cdb91fe0c79af33b87e59bb90d25&session_id=${localStorage.getItem(
        "session_id"
      )}`,
      data: {
        media_id: localStore.itemId,
        media_type: localStore.itemType,
      },
    });
    localStorage.removeItem("item_list");
    toast.success("Delete item successfull !");
    setModalIsOpen(false);
    setRerender(!rerender);
  }, [rerender]);

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
        handleDelete={handleDeleteItem}
        closeModal={closeModal}
      />
      <Wrapper addItem="text-[#01b4e4]">
        <div className="md:ml-[30px] flex flex-col gap-[30px]">
          <div className="flex items-center justify-between">
            <span className="text-[var(--white-color)] text-[2rem] font-bold">
              Add Item
            </span>
            <Link
              to={`/account/${currentUser?.displayName}/${id}/chooseimg`}
              className="py-[6px] px-[16px] rounded-[5px] bg-[#3f51b5] text-[#fff] text-[1.4rem] hover:bg-[#303f9f] transition-all duration-300 ease-linear"
              style={{
                boxShadow:
                  "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
              }}
            >
              CHOOSE IMAGE
            </Link>
          </div>
          <div className="relative w-full rounded-[4px] border border-solid border-[#c4c4c4] group">
            <input
              type="text"
              placeholder="asd"
              className="input w-full py-[18.5px] px-[14px] group"
              onChange={handleInputvalue}
              value={inputValue}
            />
            <div
              className={`absolute top-[calc(100%+12px)] left-0 w-full bg-[#fff] shadow py-[14px] rounded-b-[8px] ${
                searchResults?.length > 0 ? "h-[350px]" : ""
              } overflow-y-auto menu ${isMenu ? "block" : "hidden"}`}
            >
              {searchResults?.length > 0 ? (
                searchResults.map((searchResult) => {
                  console.log(searchResult);
                  return (
                    <div
                      key={searchResult.id}
                      className="pr-[15px] pb-[15px] pl-[20px] hover:bg-[rgba(0,0,0,.04)] cursor-pointer"
                      onClick={() => handleAddItem(searchResult.id)}
                    >
                      <div
                        className="p-5 rounded-[8px] grid grid-cols-1 sm:grid-cols-[160px,1fr] gap-[14px]"
                        style={{
                          boxShadow:
                            "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
                        }}
                      >
                        <div
                          className="relative  h-[280px] sm:h-[200px] rounded-[10px] bg-cover  sm:bg-center bg-no-repeat"
                          style={{
                            backgroundImage: `url("https://image.tmdb.org/t/p/w300${searchResult.poster_path}")`,
                          }}
                        ></div>
                        <div className="flex flex-col">
                          <span className="text-[2rem] text-[#000000de] font-bold">
                            {searchResult.title || searchResult.original_name}
                          </span>
                          <span className="text-[1.3rem] text-[#aa8181] font-normal">
                            {moment(searchResult.first_air_date).format(
                              "DD/MM/yyyy"
                            ) ||
                              moment(searchResult.release_date).format(
                                "DD/MM/YYYY"
                              )}
                          </span>
                          <span className="text-[1.3rem] text-[#aa8181] font-normal">
                            {searchResult.popularity} viewer
                          </span>
                          <span
                            className="text-[1.4rem] text-[#000000de] font-normal text-ellipsis overflow-hidden"
                            style={{
                              display: "-webkit-box",
                              webkitLineClamp: "3",
                              webkitBoxOrient: "vertical",
                              wordBreak: "break-word",
                            }}
                          >
                            {searchResult.overview}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <img
                  src="https://my-movie-tmdb.netlify.app/static/media/img_no_item.6c5fca90.png"
                  alt=""
                  className="object-cover h-[200px] mx-auto"
                />
              )}
            </div>
          </div>
          {items?.length > 0 &&
            items.map((item, index) => (
              <div className="flex justify-between items-center" key={item.id}>
                <div className="flex gap-[15px] items-center text-[var(--white-color)]">
                  <span className="text-[1.8rem]">{index + 1}.</span>
                  <span className="font-bold text-[1.8rem]">
                    {item.title || item.original_name}
                  </span>
                </div>
                <span
                  className="w-[24px] h-[24px] rounded-full border-2 flex items-center justify-center border-solid border-[#f50057] cursor-pointer"
                  onClick={() => handleModalOpen(item.id, item.media_type)}
                >
                  <CloseIcon className={"text-[#f50057]"} />
                </span>
              </div>
            ))}

          <Button
            to={`/account/${currentUser?.displayName}`}
            className="text-left bg-[#01b4e4] py-[6px] px-[16px] w-[fit-content] text-[#fff] rounded-[6px] hover:animate-pulse"
            style={{
              boxShadow:
                "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
            }}
          >
            FINISH
          </Button>
        </div>
      </Wrapper>
    </>
  );
};

export default AddItem;
