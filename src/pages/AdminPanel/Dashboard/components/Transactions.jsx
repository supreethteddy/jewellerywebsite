import { ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import apiClient from "../../../../lib/utils";
import dayjs from "dayjs";

const transactions = [
  {
    id: 1,
    date: "2022-01-01",
    amount: 100,
    upiId: "1234567890",
    isCompleted: true,
  },
  {
    id: 2,
    date: "2022-01-02",
    amount: 200,
    upiId: "1234567890",
    isCompleted: false,
  },
  {
    id: 2,
    date: "2022-01-02",
    amount: 200,
    upiId: "1234567890",
    isCompleted: false,
  },
  {
    id: 2,
    date: "2022-01-02",
    amount: 200,
    upiId: "1234567890",
    isCompleted: true,
  },
];

const Transactions = () => {
  const [allOrders, setAllOrders] =useState()

  const getAllCategories = async () => {
    try {
      const res = await apiClient.get({ url: `/shipping/getAll`,});
      setAllOrders(res?.data)
    } catch (error) {
      console.log(error?.data?.message || "error");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <div className="w-full border rounded-lg">
      <div className="w-full">
        <div className="flex items-center justify-between gap-5 pb-3">
          <p className="font-semibold pt-3 pb-2 px-3">Transactions</p>
          <button className="text-secondary hover:text-primary flex items-center gap-1 p-2 text-sm">
            See All Transactions <ChevronRight size={14} />
          </button>
        </div>
        <hr />
        <div className="space-y-4">
          <div className="w-full">
            {allOrders?.map((item) => (
              <div
                key={item._id}
                className="p-5 sm:p-3 flex flex-col-reverse flex-wrap sm:grid grid-cols-3 gap-4 text-[.8rem] items-center odd:bg-gray-100"
              >
                <div className="">
                  {/* {item.isDelivered ? ( */}
                    <span className="min-w-[6rem] w-fit flex justify-center items-center gap-2 rounded-lg px-2 py-1 bg-green-100 text-green-600">
                      <div className="h-2 w-2 bg-green-600 rounded-full"></div>
                      <span>Completed</span>
                    </span>
                  {/* ) : (
                    <span className="min-w-[6rem] w-fit flex justify-center items-center gap-2 rounded-lg px-2 py-1 bg-red-100 text-red-600">
                      <div className="h-2 w-2 bg-red-600 rounded-full"></div>
                      <span>Failed</span>
                    </span>
                  )} */}
                </div>
                <div className="space-y-1 text-center">
                  <p>UPI ID : {item._id}</p>
                </div>
                <div className="space-y-1 sm:place-self-end text-center">
                  <p className="font-semibold leading-none">
                    {dayjs(item.createdAt).format('DD-MM-YYYY')}
                  </p>
                  <p className="leading-none">₹{item?.totalPrice}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
