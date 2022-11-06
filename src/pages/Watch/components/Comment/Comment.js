import React from "react";
import { memo } from "react";
import { Link } from "react-router-dom";
import {
  LikeIcon,
  PlayIcon,
  UnLikeIcon,
} from "../../../../components/common/Icons";
import { routes } from "../../../../configs";

const Comment = () => {
  return (
    <div className="comments">
      <span className="block mb-[20px]">Comments 0</span>
      <div className="flex items-start gap-[12px]">
        <img
          src="https://phimmoizzz.netlify.app/user-non-avatar.png"
          alt=""
          className="w-[40px] h-[40px] rounded-full object-cover"
        />

        {/* Đã đăng nhập */}
        <div className="text-[1.4rem] py-[10px] px-[16px] bg-[#333] flex-1 rounded-[10px] text-[#fff]">
          <span>
            You need{" "}
            <Link to={routes.login} className="text-[#3498db]">
              login
            </Link>{" "}
            to comment
          </span>
        </div>

        {/* Chưa đăng nhập */}
        {/* <div className="w-full">
          <input
            type="text"
            placeholder="Comment here"
            className="bg-[transparent] outline-none  w-full px-[12px] pb-[8px] border-b border-solid border-b-[var(--white-color)] text-[1.4rem]"
          />
          <div className="flex items-center justify-end gap-[20px] mt-[12px]">
            <button className="py-[8px] px-[16px] rounded-[24px]">
              cancel
            </button>
            <button className="py-[8px] px-[16px] rounded-[24px] bg-[#f2f2f2] text-[#000]">
              comment
            </button>
          </div>
        </div> */}
      </div>
      {/* <div className="mt-[40px]">
        <div className="flex items-start mb-[20px]">
          <div className="w-[56px] h-[43px]">
            <img
              src="https://phimmoizzz.netlify.app/user-non-avatar.png"
              alt=""
              className="w-[40px] h-[40px] rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <span className="inline-block text-[1.3rem] text-[var(--white-color)]">
                Việt Phương Dương
              </span>
              <span className="inline-block ml-[8px] text-[1.2rem] text-[#606060]">
                4 tháng trước
              </span>
            </div>
            <span className="block text-[1.4rem] text-[var(--white-color)] mt-[2px]">
              Nghe giọng cute vãi
            </span>
            <div className="options flex items-center gap-[16px] mt-[12px]">
              <div className="cursor-pointer flex items-center gap-3">
                <LikeIcon className={"w-[2.2rem] h-[2.2rem]"} />
                <span>1</span>
              </div>
              <div className="cursor-pointer flex items-center gap-3">
                <UnLikeIcon className={"w-[2.2rem] h-[2.2rem] "} />
                <span>1</span>
              </div>
              <div className="text-[1.3rem]">
                <button>reply</button>
              </div>
            </div>

            <div>
              <div className="mt-[20px] flex items-start gap-[12px]">
                <img
                  src="https://phimmoizzz.netlify.app/user-non-avatar.png"
                  alt=""
                  className="w-[24px] h-[24px] rounded-full object-cover"
                />
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Reply comment here"
                    className="bg-[transparent] outline-none w-full px-[12px] pb-[8px] relative -top-[8px] border-b border-solid border-b-[var(--white-color)] text-[1.4rem]"
                  />
                  <div className="flex items-center justify-end gap-[20px] mt-[12px]">
                    <button className="py-[8px] px-[16px] rounded-[24px]">
                      cancel
                    </button>
                    <button className="py-[8px] px-[16px] rounded-[24px] bg-[#f2f2f2] text-[#000]">
                      reply
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center  mb-[20px] gap-[4px] cursor-pointer hover:opacity-80 w-[fit-content]">
                  <PlayIcon
                    className={
                      "w-[1.2rem] h-[1.2rem] -rotate-[90deg] text-[#065fd4]"
                    }
                  />
                  <span className="block text-[#065fd4] font-bold">
                    one reply
                  </span>
                </div>
                <div className="flex">
                  <div className="w-[4rem] h-[3rem]">
                    <img
                      src="https://phimmoizzz.netlify.app/user-non-avatar.png"
                      alt=""
                      className="w-[2.4rem] h-[2.4rem] rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="inline-block text-[1.3rem] text-[var(--white-color)]">
                        Việt Phương Dương
                      </span>
                      <span className="inline-block ml-[8px] text-[1.2rem] text-[#606060]">
                        4 tháng trước
                      </span>
                    </div>
                    <span className="block text-[1.4rem] text-[var(--white-color)] mt-[2px]">
                      Nghe giọng cute vãi
                    </span>
                    <div className="options flex items-center gap-[16px] mt-[12px]">
                      <div className="cursor-pointer flex items-center gap-3">
                        <LikeIcon className={"w-[2.2rem] h-[2.2rem]"} />
                        <span>1</span>
                      </div>
                      <div className="cursor-pointer flex items-center gap-3">
                        <UnLikeIcon className={"w-[2.2rem] h-[2.2rem] "} />
                        <span>1</span>
                      </div>
                      <div className="text-[1.3rem]">
                        <button>reply</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default memo(Comment);
