import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Select from "react-select";

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
import { OPTIONS } from "../../../consts/Select";

const Header = () => {
  const url = useLocation();
  const { t } = useTranslation();

  // select
  const [selectedOption, setSelectedOption] = useState(null);

  const [backgroundHeader, setBackgroundHeader] = useState(false);
  const currentPageTv = useSelector((prev) => prev.callTvMovies.counter);
  const currentPageMovie = useSelector(
    (prev) => prev.callDiscoverMovies.counter
  );
  const currentPageTopRated = useSelector((prev) => prev.callTopRated.counter);
  const menuRef = useRef();
  const overlayRef = useRef();

  useEffect(() => {
    if (url.pathname.startsWith("/watch/")) {
      setBackgroundHeader(true);
      return;
    } else {
      document.onscroll = () => {
        if (document.documentElement.scrollTop >= 200) {
          setBackgroundHeader(true);
        } else if (
          document.documentElement.scrollTop < 200 &&
          !url.pathname.startsWith("/watch/")
        ) {
          setBackgroundHeader(false);
        }
      };
    }
  }, [url]);
  const handleCloseMenu = () => {
    menuRef.current.style.transform = `translateX(100%)`;
    overlayRef.current.style.display = "none";
  };
  const handleOpenMenu = () => {
    menuRef.current.style.transform = `translateX(0)`;
    overlayRef.current.style.display = "block";
  };

  const handleChangLanguage = (e) => {
    // console.log(e);
    setSelectedOption(localStorage.setItem("i18nextLng", e.value));
    window.location.reload();
  };

  return (
    <>
      <header
        className={`h-[60px] p-[10px] text-[var(--white-color)] font-semibold transition-all duration-300 ease-linear ${
          backgroundHeader ? "bg-[var(--black-color)]" : ""
        }`}
      >
        <div className="grid-system wide">
          <div className="flex justify-between items-center">
            <Link
              to={routes.home}
              className="w-[130px] sm:w-[150px] md:w-[170px]"
            >
              <img src={images.logo} alt="" className="w-full object-cover" />
            </Link>

            <div className="category hidden md:block">
              <ul className="flex gap-5">
                {/* <List to={routes.home} title="HOME" /> */}
                <List
                  to={`/movie/list/${currentPageMovie}`}
                  title={t("header.movie")}
                />
                <List to={`/tv/list/${currentPageTv}`} title={t("header.tv")} />
                <List
                  to={`/top-rated/list/${currentPageTopRated}`}
                  title={t("header.topRated")}
                />
              </ul>
            </div>

            <div className="option cursor-pointer flex items-center gap-3">
              <div className="flex items-center gap-6 md:gap-1">
                <Select
                  defaultValue={selectedOption}
                  onChange={handleChangLanguage}
                  options={OPTIONS}
                  className="text-[#5f5f5f]  mr-[6px]"
                  classNamePrefix="custom-select"
                  isSearchable={false}
                  placeholder={
                    localStorage.getItem("i18nextLng") === "vi"
                      ? "Tiếng việt"
                      : "English"
                  }
                  value={selectedOption}
                  hideSelectedOptions
                />
                <Link className={"px-0 py-0"} to={routes.search}>
                  <div className="flex items-center lg:border lg:border-solid lg:border-[#fff] lg:py-[4px] lg:px-[8px] rounded-[4px] hover:opacity-70">
                    <SearchIcon className={"hover:opacity-70"} />
                    <span className="ml-[8px] hidden lg:block">
                      {t("header.search")}
                    </span>
                  </div>
                </Link>
                <div onClick={handleOpenMenu}>
                  <MenuOutlineIcon
                    className={
                      "w-[2.4rem] h-[2.4rem] block md:hidden cursor-pointer hover:opacity-70"
                    }
                  />
                </div>
              </div>
              <Link
                to={routes.login}
                className="items-center gap-2 hidden md:flex hover:opacity-70 py-[4px] px-[8px] border border-solid border-[#fff]"
              >
                <AvatarIcon className={"w-[2.5rem] h-[2.5rem]"} />
                {t("header.option.login")}
              </Link>
            </div>
          </div>
        </div>
      </header>
      {/* on mobile */}
      <div
        className="overlay hidden"
        ref={overlayRef}
        onClick={handleCloseMenu}
      >
        <Overlay />
      </div>
      <nav
        ref={menuRef}
        className="nav-mobile fixed right-0 top-0 bottom-0 z-30 w-[320px] bg-[var(--primary-color)] text-[var(--white-color)]"
      >
        <div className="pt-[30px] pl-[30px]">
          <div className="flex items-center justify-between">
            <Link
              to={routes.login}
              className="flex items-center gap-5 cursor-pointer hover:opacity-50"
            >
              <AvatarIcon className={"w-[2.5rem] h-[2.5rem]"} />
              <span>{t("header.option.login")}</span>
            </Link>
            <div
              htmlFor="check"
              className="btn-close p-5 cursor-pointer hover:opacity-50"
              onClick={handleCloseMenu}
            >
              <ArrowRighticon />
            </div>
          </div>
          <div className="flex flex-col mt-[20px]">
            <List
              to={routes.home}
              title={t("header.home")}
              onClick={handleCloseMenu}
            />
            <List
              to={`/movie/list/${currentPageMovie}`}
              title={t("header.movie")}
              onClick={handleCloseMenu}
            />
            <List
              to={`/tv/list/${currentPageTv}`}
              title={t("header.tv")}
              onClick={handleCloseMenu}
            />
            <List
              to={`/top-rated/list/${currentPageTopRated}`}
              title={t("header.topRated")}
              onClick={handleCloseMenu}
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
