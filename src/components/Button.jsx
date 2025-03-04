import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// link button to navigate
export const LinkButton = ({ children: label, path, className }) => {
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let timer;

    if (isHovered) {
      // Increase progress while hovered
      timer = setInterval(() => {
        setProgress((prev) => Math.min(prev + 1, 100));
      }, 10);
    } else {
      // Decrease progress when not hovered
      timer = setInterval(() => {
        setProgress((prev) => Math.max(prev - 1, 0));
      }, 10);
    }

    return () => {
      clearInterval(timer); // Clear interval when `isHovered` changes
    };
  }, [isHovered]);

  return (
    <Link
      to={path}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${className} mt-3 relative shadow-large shadow-transparent hover:shadow-primary/30 text-[.8rem] overflow-hidden border-x border-y-2 border-primary px-6 py-3 uppercase tracking-widest hover:-translate-y-1 transition-all duration-300`}
    >
      <div
        style={{ width: `${progress}%` }}
        className={`absolute top-0 left-0 h-full bg-gradient-to-b transition-colors from-[#fff7e6] to-[#956520]`}
      ></div>
      <span className="relative z-10">{label}</span>
    </Link>
  );
};

// action button
export const ActionButton = ({ children: label, type, className }) => {
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let timer;

    if (isHovered) {
      // Increase progress while hovered
      timer = setInterval(() => {
        setProgress((prev) => Math.min(prev + 1, 100));
      }, 10);
    } else {
      // Decrease progress when not hovered
      timer = setInterval(() => {
        setProgress((prev) => Math.max(prev - 1, 0));
      }, 10);
    }

    return () => {
      clearInterval(timer); // Clear interval when `isHovered` changes
    };
  }, [isHovered]);

  return (
    <button
      type={type}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${className} mt-3 relative shadow-large shadow-transparent hover:shadow-primary/30 text-[.8rem] overflow-hidden border-x border-y-2 border-primary px-6 py-3 uppercase tracking-widest hover:-translate-y-1 transition-all duration-300`}
    >
      <div
        style={{ width: `${progress}%` }}
        className={`absolute top-0 left-0 h-full bg-gradient-to-b transition-colors from-[#fff7e6] to-[#956520]`}
      ></div>
      <span className="relative z-10">{label}</span>
    </button>
  );
};
