import React, { memo, useState } from "react";
import Select from "react-select";
import RangeSlider from "react-range-slider-input";

import Button from "../../../components/common/Button/Button";
import { ArrowRightIconV2 } from "../../../components/common/Icons";
import { GENRE, LANGUEGE } from "../../../consts/Select";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";

const Filter = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="grid-system wide">
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-[20px] py-20 items-end px-[10px] text-[var(--white-color)]">
        <div className="wrapper-select w-full  relative z-10">
          <span className="mb-[10px] block">GENRE</span>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={GENRE}
            className="text-[#5f5f5f]"
            classNamePrefix={"custom-select"}
          />
        </div>
        <div className="wrapper-select w-full relative z-[9]">
          <span className="mb-[10px] block">LANGUAGE</span>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={LANGUEGE}
            className="text-[#5f5f5f]"
            classNamePrefix="custom-select"
          />
        </div>
        <div className="w-full flex flex-col justify-between relative min-h-[72px]">
          <div className="mb-[10px]">
            <span className="block">RATING</span>
            <span className="text-[1.6rem] flex items-end gap-[3px] flex-wrap">
              <span>User Rating:</span>
              <span className="text-[#f9ab00] text-[1.4rem]">5-10</span>
            </span>
          </div>
          <RangeSlider className="h-[2px] wrapper-range" />
        </div>
        <div className="wrapper-select w-full relative z-[8]">
          <span className="mb-[10px] block">From</span>

          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            isSearchable={true}
            options={LANGUEGE}
            className="text-[#5f5f5f]"
            classNamePrefix="custom-select"
            contenteditable
          />
          {/* <DateRange
        editableDateInputs={true}
        moveRangeOnFirstSelection={false}
        ranges={state}
        onChange={(item) => setState([item.selection])}
        className="absolute top-[100%] left-0"
      /> */}
        </div>
        <div className="wrapper-select w-full relative z-[7]">
          <span className="mb-[10px] block">to</span>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={GENRE}
            className="text-[#5f5f5f]"
            classNamePrefix="custom-select"
          />
        </div>
        <div className="md:ml-[16px]">
          <Button
            className={
              " bg-[#3f51b5] flex items-center justify-center gap-[8px] hover:bg-[#303f9f] ml-auto py-[12px] sm:py-[8px] text-[var(--white-color)] w-full"
            }
            iconRight={<ArrowRightIconV2 />}
          >
            <span>FILTER</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(Filter);
