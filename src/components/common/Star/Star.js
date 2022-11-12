import { memo } from "react";
import { useState } from "react";
import images from "../../../assets/image";
import "./Star.scss";
const STARS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const MESSAGES = {
//   0: "",
//   1: "Dở Tệ",
//   2: "Dở",
//   3: "Không hay",
//   4: "Rất hay",
//   5: "Hay tuyệt",
// };

const Star = ({ value = 0, onClickStar = () => {} }) => {
  const [selected, setSelected] = useState(value);
  const [starHovered, setStarHovered] = useState(0);

  const applyClasses = (star) => {
    if (selected >= star || starHovered >= star) {
      return images.starActive;
    }
    return images.starNoActive;
  };
  return (
    <div>
      <div className={"star-block"}>
        {STARS.map((star, index) => {
          return (
            <img
              key={index}
              src={applyClasses(star)}
              alt=""
              onClick={() => {
                onClickStar(star);
                setSelected(star);
              }}
              onMouseOver={() => {
                setSelected(star);
                setStarHovered(star);
              }}
              onMouseOut={() => setStarHovered(0)}
            />
          );
        })}
      </div>
      {/* <p className={"star_message"}>{messages[selected]}</p> */}
    </div>
  );
};

export default memo(Star);
