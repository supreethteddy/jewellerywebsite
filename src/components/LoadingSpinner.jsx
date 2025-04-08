import React from "react";

const LoadingSpinner = ({ size = "default", text = "Loading data..." }) => {
  const sizeClasses = {
    small: "w-5 h-5 border-2",
    default: "w-8 h-8 border-3",
    large: "w-12 h-12 border-4",
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full min-h-[200px]">
      <div
        className={`${sizeClasses[size]} border-t-blue-500 border-blue-200 rounded-full animate-spin mb-3`}
      ></div>
      <p className="text-gray-500 text-sm">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
