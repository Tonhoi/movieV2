import React from "react";
import {
  EmailIcon,
  FacebookIcon,
  InstagramIcon,
} from "../../../components/common/Icons";

const Footer = () => {
  return (
    <div className="mt-10 text-[#808080] px-[20px]">
      <div className="grid-system wide">
        <div className="flex flex-wrap sm:justify-between sm:flex-nowrap justify-between lg:flex-row gap-[30px] mt-5">
          <div className="flex flex-col basis-[100%] lg:basis-[22%]">
            <h3 className="mb-[20px] text-[var(--white-color)] font-bold">
              Movie Categories
            </h3>
            <div className="flex gap-[40px] lg:justify-between lg:gap-[0]">
              <div className="flex flex-col gap-4">
                <div>Action</div>
                <div>Adventure</div>
                <div>Animation</div>
                <div>Comedy</div>
                <div>Crime</div>
              </div>
              <div className="flex flex-col gap-4">
                <div>Drama</div>
                <div>Fantacy</div>
                <div>Horror</div>
                <div>Mystrey</div>
                <div>Romance</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col basis-[100%] lg:basis-[22%]">
            <h3 className="mb-[20px] text-[var(--white-color)] font-bold">
              TV Show Categories
            </h3>

            <div className="flex gap-[40px] lg:justify-between lg:gap-[0]">
              <div className="flex flex-col gap-4">
                <div>Valentine Day</div>
                <div>Comedies</div>
                <div>Scary TV Series</div>
                <div>Best 2021</div>
                <div>Crime TV</div>
              </div>
              <div className="flex flex-col gap-4">
                <div>Reality TV</div>
                <div>Cartoon</div>
                <div>TV News</div>
                <div>Fantacy</div>
                <div>Romance</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col basis-[100%] lg:basis-[15%]">
            <h3 className="mb-[20px] text-[var(--white-color)] font-bold">
              Contact with me
            </h3>
            <div className="flex gap-4">
              <span>
                <FacebookIcon className={"w-[3rem] h-[3rem]"} />
              </span>
              <span>
                <InstagramIcon className={"w-[3rem] h-[3rem]"} />
              </span>
              <span>
                <EmailIcon className={"w-[3rem] h-[3rem]"} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
