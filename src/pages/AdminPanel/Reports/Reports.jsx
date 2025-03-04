import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";
import apiClient from "../../../lib/utils";

ChartJS.register(ArcElement, Tooltip, Legend);



const averageGrossSales = {
  labels: ["Product 1", "Product 2", "Product 3"],
  datasets: [
    {
      data: [5, 2, 3],
      backgroundColor: [
        "rgba(255, 206, 86)",
        "rgba(75, 192, 192)",
        "rgba(255, 159, 64)",
      ],
      borderColor: [
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const Reports = () => {

  const [allOrders, setAllOrders] =useState()

  const getAllCategories = async () => {
    try {
      const res = await apiClient.get({ url: `/shipping/getStats`,});
      setAllOrders(res)
    } catch (error) {
      console.log(error?.data?.message || "error");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);
  const soldItemsData = {
    labels: ["Delivered", "Pending"],
    datasets: [
      {
        data: [allOrders?.deliveredOrders||0, (allOrders?.deliveredOrders||0)-(allOrders?.totalOrders||0)],
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(153, 102, 255)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="w-full relative">
      <div className="pb-[3rem] sm:py-[2rem] sm:px-4">
        <div className="space-y-4 md:ml-[12rem] sm:fixed left-0 top-0 w-full bg-white md:max-w-[calc(100%-12rem)] z-20 p-4">
          <div className="flex sm:flex-row flex-col justify-between sm:items-center gap-4">
            <h4 className="heading-2">Reports</h4>
          </div>
          <hr />
        </div>

        <div className="sm:pt-[4rem] px-4 sm:px-0 max-w-4xl">
          <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              // {
              //   label: "gross sales in this period",
              //   value: "$10,562.00",
              // },
              {
                label: "Sales in this period",
                value: '₹'+(allOrders?.totalSales||0),
              },
              {
                label: "orders placed",
                value: allOrders?.totalOrders||0,
              },
              {
                label: "items purchased",
                value: allOrders?.totalPurchasedItems||0,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg border p-4 space-y-2 h-full"
              >
                <small className="text-gray-400 uppercase">{item.label}</small>
                <div className="w-full flex items-center gap-4">
                  <h5 className="font-semibold text-xl">{item.value}</h5>
                </div>
              </div>
            ))}
          </section>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-4 mt-8 max-w-3xl">
            <div className="rounded-lg shadow-lg border space-y-4 md:w-fit lg:w-full">
              <div className="space-y-2 border-b-2 p-4">
                <p className="text-gray-400 uppercase">Total Orders</p>
                <h3 className="text-3xl font-semibold">{allOrders?.totalOrders||0}</h3>
              </div>
              <div className="py-4 sm:p-4 max-h-[60vh]">
                <Pie data={soldItemsData} />
              </div>
            </div>
            <div className="rounded-lg shadow-lg border space-y-4 md:w-fit lg:w-full">
              <div className="space-y-2 border-b-2 p-4">
                <p className="text-gray-400 uppercase">
                  Average gross sales amount
                </p>
                <h3 className="text-3xl font-semibold">{"₹"+(allOrders?.totalSales||0)}</h3>
              </div>
              <div className="py-4 sm:p-4 max-h-[60vh]">
                <Doughnut data={averageGrossSales} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
