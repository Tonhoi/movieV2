import React, { memo, useState } from "react";
import Select from "react-select";
import RangeSlider from "react-range-slider-input";
import { useTranslation } from "react-i18next";
import moment from "moment";
// DatePicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Button from "../../../components/common/Button/Button";
import { ArrowRightIconV2 } from "../../../components/common/Icons";
import { GENREMOVIE, GENRETV, LANGUEGE } from "../../../consts/Select";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import { useHref, useNavigate } from "react-router-dom";
import { setCounter } from "../../../store/callDiscoverMovie/slice";
import { useDispatch } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch();
  const params = useHref();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [selectedOptionGender, setSelectedOptionGender] = useState(
    params.match("movie") !== null
      ? {
          value: "28",
          label: "Action",
        }
      : {
          value: "10759",
          label: "Action & Adventure",
        }
  );
  const [selectedOptionLanguage, setSelectedOptionLanguege] = useState({
    value: "en",
    label: "English",
  });

  const [fromDate, setFromDate] = useState(new Date("3/9/2002"));
  const [toDate, setToDate] = useState(new Date());

  const [valueRange, setValueRange] = useState([0, 10]);

  const handleChangeInputRange = (e) => {
    setValueRange(e);
  };

  const handleFilterMovie = () => {
    dispatch(setCounter(1));
    navigate(
      `?release_date.gte=${moment(fromDate).format(
        "YYYY-MM-DD"
      )}&release_date.lte=${moment(toDate).format(
        "YYYY-MM-DD"
      )}&vote_average.gte=${valueRange[0]}&vote_average.lte=${
        valueRange[1]
      }&with_genres=${selectedOptionGender.value}&with_original_language=${
        selectedOptionLanguage.value
      }`
    );
    // dispatch(setCounter(1))
  };

  return (
    <div className="grid-system wide">
      <div className="grid  md:grid-cols-3 lg:grid-cols-6 gap-[20px] py-20 items-end px-[10px] text-[var(--white-color)]">
        <div className="wrapper-select w-full  relative z-10">
          <span className="mb-[10px] block">{t("filter.gender")}</span>
          <Select
            defaultValue={selectedOptionGender}
            onChange={setSelectedOptionGender}
            options={params.match("movie") === null ? GENRETV : GENREMOVIE}
            className="text-[#5f5f5f]"
            classNamePrefix={"custom-select"}
          />
        </div>
        <div className="wrapper-select w-full relative z-[9]">
          <span className="mb-[10px] block">{t("filter.language")}</span>
          <Select
            defaultValue={selectedOptionLanguage}
            onChange={setSelectedOptionLanguege}
            options={LANGUEGE}
            className="text-[#5f5f5f]"
            classNamePrefix="custom-select"
          />
        </div>
        <div className="w-full flex flex-col justify-between relative min-h-[72px]">
          <div className="mb-[10px]">
            <span className="block">{t("filter.rating")}</span>
            <span className="text-[1.6rem] flex items-end gap-[3px] flex-wrap">
              <span>{t("filter.userRating")}:</span>
              <span className="text-[var(--color-text)] text-[1.4rem]">
                {valueRange[0]}-{valueRange[1]}
              </span>
            </span>
          </div>
          <RangeSlider
            className="h-[2px] wrapper-range"
            min={0}
            max={10}
            onInput={handleChangeInputRange}
            value={valueRange}
          />
        </div>
        <div className="wrapper-select w-full relative z-[8]">
          <span className="mb-[10px] block">{t("filter.from")}</span>

          <DatePicker
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
            withPortal
            portalId="root-portal"
            calendarClassName="text-[1.4rem]"
            className="border-b-2 border-b-[#1a5bb0] w-full bg-[transparent]"
          />
        </div>
        <div className="wrapper-select w-full relative z-[7]">
          <span className="mb-[10px] block">{t("filter.to")}</span>
          <DatePicker
            selected={toDate}
            onChange={(date) => setToDate(date)}
            calendarClassName="text-[1.4rem]"
            className="border-b-2 border-b-[#1a5bb0] w-full bg-[transparent]"
          />
        </div>
        <div className="md:ml-[16px]">
          <Button
            className={
              " bg-[#3f51b5] flex items-center justify-center gap-[8px] hover:bg-[#303f9f] ml-auto py-[12px] sm:py-[8px] text-[#fff] w-full"
            }
            iconRight={<ArrowRightIconV2 />}
            onClick={handleFilterMovie}
          >
            <span>{t("filter.button")}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(Filter);
