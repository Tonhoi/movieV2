import React, { memo } from "react";
import { Link } from "react-router-dom";

const Button = ({
  children,
  to,
  href,
  onClick,
  className,
  id,
  iconLeft,
  iconRight,
}) => {
  let Comp = "button";
  const prop = {
    onClick,
  };

  if (to) {
    prop.to = to;
    Comp = Link;
  } else if (href) {
    prop.href = href;
    Comp = "a";
  }

  const classes = `px-[16px] py-[6px] transition-all rounded-[10px]  ${className}`;

  return (
    <Comp className={classes} id={id} {...prop}>
      <span>{iconLeft && iconLeft}</span>
      {children}
      <span>{iconRight && iconRight}</span>
    </Comp>
  );
};

export default memo(Button);
