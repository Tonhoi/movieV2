import React from "react";
import { memo } from "react";
import { Link } from "react-router-dom";
import {
  HeartIcon,
  MuiIcon,
  DeleteIcon,
} from "../../../../components/common/Icons";

const AccountItem = ({ items, handleDeleteMovie, isRating = false }) => {
  return (
    <div
      className="py-[15px]"
      style={{
        boxShadow:
          "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
      }}
    >
      {items?.length > 0 ? (
        items.map((item, index) => {
          return (
            <div className="py-[15px]" key={index}>
              <div className="pt-[15px] px-[15px] pb-[20px]">
                <div className="grid grid-cols-1 sm:grid-cols-[150px,1fr]">
                  <div className="rounded-[10px] max-w-[400px] max-h-[400px] mx-auto  sm:max-w-[150px] sm:max-h-[200px]">
                    <img
                      src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                      alt=""
                      className="w-[100%] h-[100%] rounded-[10px] bg-cover object-cover bg-center"
                    />
                  </div>
                  <div className="pt-[16px] sm:mx-[16px] pb-[24px] text-[var(--white-color)] flex-1">
                    <div className="flex flex-col gap-[8px]">
                      <Link
                        to={`/detailmovie/${item.title ? "movie" : "tv"}/${
                          item.id
                        }`}
                        className="text-[2rem] text-[var(--white-color)] hover:text-[#f9ab00]"
                      >
                        {item.name || item.original_title}
                      </Link>
                      <span className="text-[1.3rem] text-[#aa8181]">
                        {item.first_air_date || item.release_date}
                      </span>
                    </div>
                    <span className="block mt-[12px] text-[1.4rem] text-[var(--white-color)]">
                      {item.overview ? item.overview : "No review"}
                    </span>
                    <div className="pt-[15px] flex flex-wrap justify-between max-w-[80%] gap-[12px]">
                      {isRating && (
                        <div className="flex items-center cursor-pointer hover:opacity-70">
                          <div className="w-[35px] h-[35px] rounded-full bg-[#01d277] flex items-center justify-center text-[#fff]">
                            {item.rating}
                          </div>
                          <span className="ml-[8px] text-[1.1rem] text-[var(--white-color)]">
                            Your Rating
                          </span>
                        </div>
                      )}
                      <div className="flex items-center cursor-pointer hover:opacity-70">
                        <div className="w-[35px] h-[35px] rounded-full text-[#f864ab] flex items-center justify-center border boder-solid border-[var(--white-color)]">
                          <HeartIcon />
                        </div>
                        <span className="ml-[8px] text-[1.1rem] text-[var(--white-color)]">
                          Favorite
                        </span>
                      </div>
                      <div className="relative flex items-center cursor-pointer">
                        <div className="w-[35px] h-[35px] rounded-full text-[var(--white-color)] flex items-center justify-center border boder-solid border-[var(--white-color)]">
                          <MuiIcon />
                        </div>
                        <span className="ml-[8px] text-[1.1rem] text-[var(--white-color)]">
                          Add to List
                        </span>
                        {/* <div className="absolute top-full left-[50%] -translate-x-[50%] w-[300px] h-[131px] py-[20px] bg-[#032541] rounded-[8px]">
                          <span className="block text-center text-[#fff] font-medium">
                            Create New List
                          </span>
                          <div className="text-center my-[8px]">
                            <input
                              type="text"
                              placeholder={`${
                                item.name || item.original_title
                              }`}
                              className={
                                "pt-[18px] pr-[24px] pb-[18px] pl-[14px] rounded-[8px] border border-solid border-[#625e5e] hover:border-[#0d0c0c] bg-[transparent]"
                              }
                            />
                          </div>
                        </div> */}
                      </div>
                      <div
                        className="flex items-center cursor-pointer hover:opacity-70"
                        onClick={() => handleDeleteMovie(item.id, item.title)}
                      >
                        <div className="w-[35px] h-[35px] rounded-full text-[red] flex items-center justify-center border boder-solid border-[var(--white-color)]">
                          <DeleteIcon />
                        </div>
                        <span className="ml-[8px] text-[1.1rem] text-[var(--white-color)]">
                          Remove
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <span className="px-4 font-medium">
          you haven't added any movies to your list yet
        </span>
      )}
    </div>
  );
};

export default memo(AccountItem);
