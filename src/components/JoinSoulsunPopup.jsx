import { X } from "lucide-react";
import React, { useState } from "react";

const JoinSoulsunPopup = ({ className }) => {
  const [show, setShow] = useState(true);
  if (!show) {
    return null;
  }
  return (
    <div
      className={`${className} hidden lg:block bg-[#1C1B1B] z-20 px-4 pt-7 pb-4 absolute text-white max-w-xs`}
    >
      <X
        onClick={() => setShow(false)}
        className="absolute top-2 right-2 cursor-pointer"
      />
      <h3 className="tracking-widest uppercase text-center">
        Join club <br />
        soulsun
      </h3>
      <p className="desc text-sm text-center mt-3">
        10% off + premium content, sneak peeks to new launches & arrivals when
        you join the club.
      </p>
      <form className="flex flex-col gap-1 mt-5">
        <div>
          <input
            type="email"
            required
            className="outline-none bg-transparent text-sm placeholder:text-sm border border-white/20 w-full p-2"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <input
            type="text"
            className="outline-none bg-transparent text-sm placeholder:text-sm border border-white/20 w-full p-2"
            placeholder="Your zodiac"
          />
        </div>
        <button type='button' className="btn bg-white text-black mt-4">Join now</button>
      </form>
    </div>
  );
};

export default JoinSoulsunPopup;
