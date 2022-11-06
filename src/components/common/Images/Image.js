import { memo } from "react";
import { useState, forwardRef } from "react";
import images from "../../../assets/image";

const Image = forwardRef(
  ({ src, debounce, alt, configImage = "", ...props }, ref) => {
    const [fallback, setFallback] = useState("");

    const handleError = (e) => {
      setFallback(configImage ? configImage : images.noImage);
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
  }
);

// http://haiphongtours.vn/wp-content/uploads/2016/10/no-image-available.jpg

export default memo(Image);
