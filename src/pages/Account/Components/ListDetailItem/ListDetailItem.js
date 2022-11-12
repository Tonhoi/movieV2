import React from "react";
import { memo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import images from "../../../../assets/image";
import { CloseIcon } from "../../../../components/common/Icons";

const ListDetailItem = ({ items, hanleDeleteList }) => {
  const currentUser = useSelector((prev) => prev.auth.infoUser);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] pr-[10px] mt-[25px]">
      {items?.length > 0 &&
        items.map((item) => (
          <div
            className="relative  rounded-[10px] p-[12px] bg-[#4e667a]"
            key={item.id}
          >
            <div
              style={{
                backgroundImage: `url(${images.accountNoImage})`,
              }}
              className="bg-cover w-[100%] h-[450px] bg-center bg-no-repeat opacity-[0.2]"
            ></div>
            <div
              className="absolute hover:animate-pulse top-[-15px] right-[-15px] w-[40px] h-[40px] rounded-full bg-[#fff] flex items-center justify-center border border-solid border-[red] cursor-pointer"
              onClick={() => hanleDeleteList(item.id)}
            >
              <CloseIcon className={"text-[red] w-[2.5rem] h-[2.5rem]"} />
            </div>

            <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col items-center">
              <Link
                to={`/account/${currentUser?.displayName}/list/${item.id}`}
                className="text-[4rem] text-[#fff] cursor-pointer text-center hover:text-[yellow]"
              >
                {item.name}
              </Link>
              <span className="text-[3.4rem] text-[#fff]">
                {item.item_count} items
              </span>
              <span className="text-[2.4rem] text-[#fff]">
                Description: {item.description}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default memo(ListDetailItem);
