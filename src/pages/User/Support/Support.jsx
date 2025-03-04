import React from "react";

const Support = () => {
  return (
    <div className="border border-primary">
      <div className="w-full h-[2.5rem] bg-primary"></div>
      <div className="p-5">
        <p className="text-xl">Customer Support</p>

        <div className="w-full pt-3 space-y-3">
          <div className="">
            <div className="grid gap-2 sm:gap-0 sm:grid-cols-[15rem_1rem_auto] items-center p-2">
              <p>Contact Number</p>
              <div className="sm:block hidden">:</div>
              <div className="">
                <p className="font-light">040-10201-10201</p>
              </div>
            </div>
            <div className="grid gap-2 sm:gap-0 sm:grid-cols-[15rem_1rem_auto] items-center p-2">
              <p>Email Address</p>
              <div className="sm:block hidden">:</div>
              <div className="">
                <p className="font-light">Support@domain.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
