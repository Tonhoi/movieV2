import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

// firebase
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebase-config";

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
import { Button } from "../../../components/common/Button";
import Toggle from "../../../components/common/Toggle/Toggle";
import axios from "axios";

const Header = () => {
  const url = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // select

  const [backgroundHeader, setBackgroundHeader] = useState(false);

  const currentPageTv = useSelector((prev) => prev.callTvMovies.counter);
  const currentPageMovie = useSelector(
    (prev) => prev.callDiscoverMovies.counter
  );
  const theme = useSelector((prev) => prev.common.theme);
  const currentPageTopRated = useSelector((prev) => prev.callTopRated.counter);

  const menuRef = useRef();
  const overlayRef = useRef();

  const currentUser = useSelector((prev) => prev.auth.infoUser);

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

  const handleChangLanguageEn = (e) => {
    localStorage.setItem("i18nextLng", "en");
    window.location.reload();
  };
  const handleChangLanguageVn = (e) => {
    localStorage.setItem("i18nextLng", "vi");
    window.location.reload();
  };

  const handleLogOut = async () => {
    if (localStorage.getItem("session_id") !== null) {
      await axios.delete(
        `https://api.themoviedb.org/3/authentication/session?api_key=9568cdb91fe0c79af33b87e59bb90d25&session_id=${localStorage.getItem(
          "session_id"
        )}`
      );
      localStorage.removeItem("session_id");
    }
    signOut(auth);
    navigate(`${routes.login}`);
  };

  return (
    <>
      <header
        className={`h-[60px] p-[10px] text-[var(--white-color)] font-semibold transition-all duration-300 ease-linear ${
          backgroundHeader && !theme
            ? "bg-[#fff]"
            : backgroundHeader && theme
            ? "bg-[var(--black-color)] shadow-[0,0,1px,0,rgb(0,0,0,/50%)]"
            : ""
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
              <ul
                className={`flex gap-5  ${
                  backgroundHeader && theme
                    ? "text-[#fff]"
                    : backgroundHeader && !theme
                    ? "text-[#000]"
                    : "text-[#fff]"
                }`}
              >
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

            <div className="option  flex items-center gap-[8px]">
              <div className="flex items-center gap-[8px] ">
                <div className="h-[40px] w-[40px] rounded-[20px] flex items-center justify-center bg-[var(--bg-options)] hover:opacity-70 cursor-pointer transition-all duration-300 ease-linear select-none">
                  {localStorage.getItem("i18nextLng") === "en" ? (
                    <img
                      src="https://portal.vietcombank.com.vn/Resources/v3/img/icon-VN.png"
                      alt=""
                      onClick={handleChangLanguageVn}
                      className="object-cover rounded-[4px] w-[25px]"
                    />
                  ) : (
                    <img
                      src="https://portal.vietcombank.com.vn/Resources/v3/img/icon-EN.png"
                      alt=""
                      onClick={handleChangLanguageEn}
                      className="object-cover rounded-[4px] w-[25px]"
                    />
                  )}
                </div>
                <Link
                  className={
                    "hover:opacity-70 px-0 py-0 cursor-pointer w-[40px] h-[40px] rounded-[20px] text-[var(--white-color)] bg-[var(--bg-options)] flex items-center justify-center transition-all duration-300 ease-linear"
                  }
                  to={routes.search}
                >
                  <SearchIcon />
                </Link>
                <Toggle />
                <div
                  onClick={handleOpenMenu}
                  className="w-[40px] h-[40px] rounded-[20px] text-[var(--white-color)]  bg-[var(--bg-options)] flex items-center justify-center md:hidden cursor-pointer transition-all duration-300 ease-linear"
                >
                  <MenuOutlineIcon
                    className={"w-[2.4rem] h-[2.4rem]  hover:opacity-70 "}
                  />
                </div>
              </div>
              {currentUser?.displayName ? (
                <div className="relative group cursor-pointer ">
                  <span
                    className="items-center gap-2 hidden md:flex justify-center hover:opacity-70 w-[40px] h-[40px] rounded-[20px] 
                  bg-[var(--bg-options)] text-[var(--white-color)] transition-all duration-300 ease-linear"
                  >
                    <AvatarIcon className={"w-[2.5rem] h-[2.5rem] "} />
                  </span>
                  <ul className="absolute pt-[12px]  scale-0 group-hover:scale-100 transition-all duration-[50ms] ease-linear top-[calc(100%+8px)] right-[0] w-[230px] bg-[var(--black-color)] rounded-[8px] shadow-[0_0_60px_4px_rgba(0,0,0,0.6)]">
                    <div className="absolute -top-[10px] left-0 w-[100%] h-[10px] bg-[transparent]"></div>
                    <li className="relative flex items-center pb-[20px] gap-[14px] px-[16px] cursor-default">
                      <div className="absolute top-[100%] left-[50%] -translate-x-[50%] w-[calc(100%-32px)] h-[1px] bg-[#fff]"></div>
                      <img
                        src="https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg"
                        alt=""
                        className="w-[50px] h-[50px] rounded-[50%] object-cover"
                      />
                      <div className="flex flex-col">
                        <span className="text-[#eee]">
                          {currentUser?.displayName}
                        </span>
                        <span className="mt-[4px] text-[#595959]">user</span>
                      </div>
                    </li>
                    <Link
                      to={`/account/${auth.currentUser.displayName}`}
                      className="block py-[12px] px-[16px] mt-[20px] text-[#fff] hover:bg-[#eca302] transition-all duration-300 ease-linear"
                    >
                      Account
                    </Link>
                    <li className="py-[12px] px-[16px]  text-[#fff] hover:bg-[#eca302] transition-all duration-300 ease-linear">
                      Settings
                    </li>
                    <li
                      className="py-[12px] px-[16px]  text-[#fff] hover:bg-[#eca302] transition-all duration-300 ease-linear rounded-b-[8px]"
                      onClick={handleLogOut}
                    >
                      Log out
                    </li>
                  </ul>
                </div>
              ) : (
                <Link
                  to={routes.login}
                  className="items-center gap-2 hidden md:flex justify-center hover:opacity-70 w-[40px] h-[40px] rounded-[20px] 
                  bg-[var(--bg-options)] text-[var(--white-color)] transition-all duration-300 ease-linear"
                >
                  <AvatarIcon className={"w-[2.5rem] h-[2.5rem] "} />
                </Link>
              )}
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
            {currentUser?.displayName ? (
              <span className="flex items-center gap-5 cursor-default">
                <AvatarIcon className={"w-[2.5rem] h-[2.5rem]"} />
                <span>{currentUser?.displayName}</span>
              </span>
            ) : (
              <Link
                to={routes.login}
                className="flex items-center gap-5 cursor-pointer hover:opacity-50"
              >
                <AvatarIcon className={"w-[2.5rem] h-[2.5rem]"} />
                <span>{t("header.option.login")}</span>
              </Link>
            )}

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
            {currentUser?.displayName && (
              <Button
                className={"logout text-left pt-[12px] pb-[12px]"}
                onClick={handleLogOut}
              >
                {t("header.option.logout")}
              </Button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
