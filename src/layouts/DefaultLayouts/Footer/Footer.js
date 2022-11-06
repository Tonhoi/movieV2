import React from "react";
import { useTranslation } from "react-i18next";

import {
  EmailIcon,
  FacebookIcon,
  InstagramIcon,
} from "../../../components/common/Icons";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="mt-10 text-[#808080] px-[20px]">
      <div className="grid-system wide">
        <div className="flex flex-wrap sm:justify-between sm:flex-nowrap justify-between lg:flex-row gap-[30px] mt-5">
          <div className="flex flex-col basis-[100%] lg:basis-[22%]">
            <h3 className="mb-[20px] text-[var(--white-color)] font-bold">
              {t("footer.header.movieCategory")}
            </h3>
            <div className="flex gap-[40px] lg:justify-between lg:gap-[0]">
              <div className="flex flex-col gap-4">
                <div>{t("footer.content.action")}</div>
                <div>{t("footer.content.adventure")}</div>
                <div>{t("footer.content.animation")}</div>
                <div>{t("footer.content.comedy")}</div>
                <div>{t("footer.content.crime")}</div>
              </div>
              <div className="flex flex-col gap-4">
                <div>{t("footer.content.drama")}</div>
                <div>{t("footer.content.fantacy")}</div>
                <div>{t("footer.content.horror")}</div>
                <div>{t("footer.content.mystrey")}</div>
                <div>{t("footer.content.romance")}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col basis-[100%] lg:basis-[22%]">
            <h3 className="mb-[20px] text-[var(--white-color)] font-bold">
              {t("footer.header.tvShowCategory")}
            </h3>

            <div className="flex gap-[40px] lg:justify-between lg:gap-[0]">
              <div className="flex flex-col gap-4">
                <div>{t("footer.content.valentineDay")}</div>
                <div>{t("footer.content.comedies")}</div>
                <div>{t("footer.content.scaryTVSeries")}</div>
                <div>{t("footer.content.best2021")}</div>
                <div>{t("footer.content.crimeTV")}</div>
              </div>
              <div className="flex flex-col gap-4">
                <div>{t("footer.content.realityTV")}</div>
                <div>{t("footer.content.cartoon")}</div>
                <div>{t("footer.content.tVNews")}</div>
                <div>{t("footer.content.fantacy")}</div>
                <div>{t("footer.content.romance")}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col basis-[100%] lg:basis-[15%]">
            <h3 className="mb-[20px] text-[var(--white-color)] font-bold">
              {t("footer.header.contactWithMe")}
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
