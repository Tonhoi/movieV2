import React, { memo } from "react";
import { NavLink } from "react-router-dom";

import "./List.scss";
const List = ({ onClick, to, title }) => {
  const className = (nav) => {
    return `item ${nav.isActive ? "active" : ""}`;
  };
  return (
    <NavLink className={className} onClick={onClick} to={to} end>
      {title}
    </NavLink>
  );
};

export default memo(List);
