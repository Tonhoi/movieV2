import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import images from "../../../assets/image";
import Overlay from "../../../components/common/Overlay/Overlay";
import {
  ArrowRighticon,
  AvatarIcon,
  MenuOutlineIcon,
  SearchIcon,
} from "../../../components/common/Icons";
import { routes } from "../../../configs";

import "./Header.scss";
import { List } from "./List";
import { useSelector } from "react-redux";

const Header = () => {
  const [backgroundHeader, setBackgroundHeader] = useState(false);
  const currentPageTv = useSelector((prev) => prev.callTvMovies.counter);
  const currentPageMovie = useSelector(
    (prev) => prev.callDiscoverMovies.counter
  );

  useEffect(() => {
    const clear = (document.onscroll = () => {
      if (document.documentElement.scrollTop >= 200) {
        setBackgroundHeader(true);
      } else {
        setBackgroundHeader(false);
      }
    });
    return () => {
      clear();
    };
  }, []);
  return (
    <>
      <input type="checkbox" id="check" hidden />

      <header
        className={`h-[60px] p-[10px] text-[var(--white-color)] font-semibold transition-all ${
          backgroundHeader ? "bg-[var(--black-color)]" : ""
        }`}
      >
        <div className="grid-system wide">
          <div className="flex justify-between items-center">
            <Link to={routes.home} className="w-[170px]">
              <img src={images.logo} alt="" className="w-full object-cover" />
            </Link>

            <div className="category hidden md:block">
              <ul className="flex gap-5">
                <List to={routes.home} title="HOME" />
                <List to={`/movie/list/${currentPageMovie}`} title="MOVIE" />
                <List to={`/tv/list/${currentPageTv}`} title="TV" />
              </ul>
            </div>

            <div className="option cursor-pointer flex items-center gap-3">
              <div className="flex items-center gap-6 md:gap-1">
                <Link to={routes.search}>
                  <SearchIcon className={"hover:opacity-70"} />
                </Link>
                <label htmlFor="check">
                  <MenuOutlineIcon
                    className={
                      "w-[2.4rem] h-[2.4rem] block md:hidden cursor-pointer hover:opacity-70"
                    }
                  />
                </label>
              </div>
              <Link
                to={routes.login}
                className="items-center gap-2 hidden md:flex hover:opacity-70"
              >
                <AvatarIcon className={"w-[2.5rem] h-[2.5rem]"} />
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>
      {/* on mobile */}
      <label htmlFor="check" className="overlay hidden">
        <Overlay />
      </label>
      <nav className="nav-mobile fixed right-0 top-0 bottom-0 z-30 w-[320px] bg-[var(--primary-color)] text-[var(--white-color)]">
        <div className="pt-[30px] pl-[30px]">
          <div className="flex items-center justify-between">
            <Link
              to={routes.login}
              className="flex items-center gap-5 cursor-pointer hover:opacity-50"
            >
              <AvatarIcon className={"w-[2.5rem] h-[2.5rem]"} />
              <span>Login</span>
            </Link>
            <label
              htmlFor="check"
              className="btn-close p-5 cursor-pointer hover:opacity-50"
            >
              <ArrowRighticon />
            </label>
          </div>
          <ul className="flex flex-col mt-[20px]">
            <List to={routes.home} title="HOME" />
            <List to={`/movie/list/${currentPageMovie}`} title="MOVIE LIST" />
            <List to={`/tv/list/${currentPageTv}`} title="TV SHOW LIST" />
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
