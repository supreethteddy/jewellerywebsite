import React, { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { Star } from "lucide-react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      data-aos="fade-up"
      ref={containerRef}
      className={cn("scroller relative z-20 overflow-hidden", className)}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item) => (
          <li
            className="w-[350px] backdrop-blur-md max-w-full relative border border-primary flex-shrink-0 mx-2 px-6 rounded-2xl py-6 md:w-[450px]"
            key={item.review}
          >
            <div className="flex flex-col gap-4 text-start">
              <div className="pb-4 border-b border-primary">
                <div className="flex items-center justify-between gap-4">
                  <h6 className="">{item.reviewer}</h6>
                  <div className="flex">
                    {Array(item.rating)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} fill="#DEA821" size={15} stroke="0" />
                      ))}
                  </div>
                </div>
              </div>
              <p className="desc text-center">"{item.review}"</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
