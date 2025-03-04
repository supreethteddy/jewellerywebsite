import React from "react";

const CustomImg = ({ src = "", alt = "image", className, ...props }) => {
  // Check if image is from Cloudinary or needs BASE_URL prefix
  const processedSrc = src.includes("res.cloudinary")
    ? src
    : new URL(src, process.env.REACT_APP_BASE_URL).href;

  return <img src={processedSrc} className={className} alt={alt} {...props} />;
};

export default React.memo(CustomImg);


// process.env.REACT_APP_BASE_URL.slice(0, -1) 