import React, { useEffect, useState } from "react";
import OrdersTable from "./components/OrdersTable";
// Icons removed for simplicity
import Dropdown from "./components/Dropdown";
import apiClient from "../../../lib/utils";

const Orders = () => {
  const [sortBy, setSortBy] = React.useState("Date");
  const [allOrders, setAllOrders] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const getAllCategories = async () => {
    try {
      setIsLoading(true);
      const res = await apiClient.get({
        url: `/shipping/getAll?page=${pageNumber}`,
      });
      setAllOrders(res);
    } catch (error) {
      console.log(error?.data?.message || "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, [pageNumber]);

  const handleNext = () => {
    if (allOrders?.pagination?.hasNextPage) {
      setPageNumber((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full relative">
      <div className="pb-[3rem] sm:py-[2rem] sm:px-4">
        <div className="space-y-4 md:ml-[12rem] sm:fixed left-0 top-0 w-full bg-white md:max-w-[calc(100%-12rem)] z-20 p-4">
          <div className="flex sm:flex-row flex-col justify-between sm:items-center gap-4">
            <h4 className="heading-2">Orders</h4>
          </div>
          <hr />

          <div className="flex sm:flex-row flex-col sm:items-center gap-3">
            <div className="flex items-center gap-2 p-2 rounded border">
                              <span className="text-gray-500">🔍</span>
              <input
                type="text"
                placeholder="Search Order..."
                className="outline-none w-full border-none"
              />
            </div>
            <div className="sm:w-[13rem]">
              <Dropdown
                label="Sort By"
                options={["Date", "Order", "Customer", "Order Status"]}
                onChange={(item) => {
                  setSortBy(item);
                }}
                selected={sortBy}
              />
            </div>

          </div>
        </div>

        <div className="pt-5 px-4 sm:px-0">
          <OrdersTable
            allorders={allOrders?.data}
            getAllCategories={getAllCategories}
            isLoading={isLoading}
          />
        </div>
        <div>
          Page {pageNumber} of {allOrders?.pagination?.totalPages}(
          {(pageNumber - 1) * 10 + 1} -
          {Math.min(pageNumber * 10, allOrders?.pagination?.totalOrders)}
          of {allOrders?.pagination?.totalOrders} results)
        </div>

        <div className="px-4 flex justify-between gap-4 mt-5">
          <button
            className={`btn1 w-[7rem] bg-white border border-gray-300 h-fit ${
              pageNumber === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-200"
            }`}
            onClick={handlePrevious}
          >
                            <span className="text-sm">←</span>
            Previous
          </button>
          <button
            className={`btn1 w-[7rem] bg-white border border-gray-300 h-fit ${
              !allOrders?.pagination?.hasNextPage
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-200"
            }`}
            F
            onClick={handleNext}
            disabled={!allOrders?.pagination?.hasNextPage}
          >
                          Next
              <span className="text-sm">→</span>
          </button>
        </div>
      </div>
     
    </div>
  );
};

export default Orders;
