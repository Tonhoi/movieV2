import { memo } from "react";
import { useState, forwardRef } from "react";
import images from "../../../assets/image";

const Image = forwardRef(({ src, debounce, alt, ...props }, ref) => {
  const [fallback, setFallback] = useState("");

  const handleError = (e) => {
    setFallback(images.noImage);
  };

  return (
    <img
      src={fallback || src}
      alt={alt}
      ref={ref}
      {...props}
      onError={handleError}
    />
  );
});

export default memo(Image);
