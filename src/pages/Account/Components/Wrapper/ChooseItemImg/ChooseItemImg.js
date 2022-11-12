import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Overlay } from "../../../../../components/common/Overlay";
import Wrapper from "../Wrapper";

const ChooseItemImg = () => {
  const { id } = useParams();
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3//list/${id}?api_key=9568cdb91fe0c79af33b87e59bb90d25&language=en-US`
      );
      console.log(res.data.items);
      setDatas(res.data.items);
    };
    fetch();
  }, []);
  return (
    <Wrapper addItem="text-[#01b4e4]">
      <div className="md:ml-[30px] flex flex-col gap-[30px] mt-[30px] md:mt-[0]">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-[20px]">
          {datas?.length > 0 &&
            datas.map((data, index) => (
              <div key={data.id} className="truncate">
                <span className="text-[var(--white-color)] ">
                  {index + 1}. {data.title || data.original_name}
                </span>
                <div
                  className="relative w-full min-h-[200px] sm:min-h-[200px] rounded-[10px] overflow-hidden bg-cover bg-center mt-[10px] cursor-pointer group"
                  style={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/w300${data.poster_path}")`,
                  }}
                >
                  <Overlay configClassName="absolute hidden group-hover:block" />
                  <span className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-[19] text-center bg-[#01b4e4] text-[1.4rem] text-[#fff] py-[10px] w-full hidden group-hover:block ">
                    SELECT THIS IMAGE
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default ChooseItemImg;
