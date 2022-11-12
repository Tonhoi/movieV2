import React from "react";
import { memo } from "react";
import { useSelector } from "react-redux";
import { Button } from "../../../../components/common/Button";
import { ArrowRighticon } from "../../../../components/common/Icons";

const Wrapper = ({
  children,
  createNewList = "",
  addItem = "",
  chooseImg = "",
}) => {
  const currentUser = useSelector((prev) => prev.auth.infoUser);

  return (
    <div className="px-[10px] pb-[20px]">
      <div className="mx-[-10px] bg-[url(https://my-movie-tmdb.netlify.app/static/media/banner-profile.e9a58d20.jpg)] pt-[100px] pb-[50px] object-cover bg-no-repeat bg-center bg-cover">
        <div className="grid-system wide">
          <div className="flex gap-[40px] px-[10px]">
            <img
              src="https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg"
              alt=""
              className="w-[157px] h-[157px] rounded-full"
            />
            <div className="text-[#fff]">
              <span className="block text-[3rem]">Tôn Hội</span>
              <div className="pt-[20px] flex items-center">
                <div className="py-[10px] px-[20px]">Trung Bình Điểm phim</div>
                <div className="py-[10px] px-[20px]">Trung Bình Điểm TV</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid-system wide">
        <Button
          to={`/account/${currentUser?.displayName}`}
          className="flex items-center sm:justify-center gap-[10px] pl-[0] ml-[-10px] sm:gap-[40px] mt-[40px] group cursor-pointer w-[fit-content] sm:mx-auto text-[#01b4e4]"
        >
          <div className="group-hover:animate-bounce">
            <ArrowRighticon className={"w-[3rem] h-[3rem] rotate-[180deg]"} />
          </div>
          <span className="text-[3rem] font-bold ">Create New List</span>
        </Button>

        <div className="grid grid-cols-[1fr] md:grid-cols-[22%,78%] mt-[40px]">
          <div className="flex flex-col">
            <span className="py-[15px] px-[25px] rounded-t-[10px] bg-[#01b4e4] text-[2.4rem] text-[#fff] font-bold">
              NEW
            </span>
            <div className="flex flex-col text-[2rem] font-medium">
              <span className={`py-[12px] text-[#01b4e4] ${createNewList}`}>
                Step 1 :Create New
              </span>
              <span
                className={`py-[12px] text-[var(--white-color)] ${addItem}`}
              >
                Step 2 :Add/Edit Items
              </span>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default memo(Wrapper);
