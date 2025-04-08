import React, { useState } from "react";
import { useQuery } from "react-query";
import {
  getMostViewedProducts,
  getMostPurchasedProducts,
} from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import LoadingSpinner from "./LoadingSpinner.jsx";

const ProductPerformance = () => {
  const [period, setPeriod] = useState(30);
  const [limit, setLimit] = useState(5);

  const {
    data: viewedData,
    isLoading: viewedLoading,
    error: viewedError,
  } = useQuery(["mostViewedProducts", period, limit], () =>
    getMostViewedProducts({ limit, period })
  );

  const {
    data: purchasedData,
    isLoading: purchasedLoading,
    error: purchasedError,
  } = useQuery(["mostPurchasedProducts", period, limit], () =>
    getMostPurchasedProducts({ limit, period })
  );

  if (viewedLoading || purchasedLoading)
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-100">
        <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">
            Product Performance
          </h2>
        </div>
        <LoadingSpinner text="Loading product performance data..." />
      </div>
    );

  if (viewedError || purchasedError)
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-100">
        <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">
            Product Performance
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center h-80 text-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p>Error loading product data</p>
        </div>
      </div>
    );

  const viewedProducts = viewedData?.data || [];
  const purchasedProducts = purchasedData?.data || [];
  const totalViewedProducts = viewedData?.meta?.totalCount || 0;
  const totalPurchasedProducts = purchasedData?.meta?.totalCount || 0;

  // Check if we have data
  if (viewedProducts.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-2 border-b border-gray-100 gap-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Product Performance
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Period:</span>
            <select
              value={period}
              onChange={(e) => setPeriod(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
              <option value={90}>Last 90 days</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center h-80 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p>No product data available for this period</p>
        </div>
      </div>
    );
  }

  // Combine data for comparison chart
  const combinedData = viewedProducts.map((product) => {
    const purchased = purchasedProducts.find((p) => p._id === product._id);
    return {
      name: product.name,
      views: product.viewCount,
      purchases: purchased ? purchased.totalQuantity : 0,
    };
  });

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md">
          <p className="font-medium text-gray-800 mb-2">{label}</p>
          <p className="text-blue-600 font-semibold flex items-center">
            <span className="w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
            {`Views: ${payload[0].value}`}
          </p>
          <p className="text-green-600 font-semibold flex items-center">
            <span className="w-3 h-3 bg-green-600 rounded-full mr-2"></span>
            {`Purchases: ${payload[1].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-2 border-b border-gray-100 gap-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Product Performance
        </h2>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Period:</span>
            <select
              value={period}
              onChange={(e) => setPeriod(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
              <option value={90}>Last 90 days</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Show:</span>
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-500 mb-4">
        Showing {viewedProducts.length} of {totalViewedProducts} viewed products
        and {purchasedProducts.length} of {totalPurchasedProducts} purchased
        products
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={combinedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={70}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickLine={{ stroke: "#e5e7eb" }}
              axisLine={{ stroke: "#e5e7eb" }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickLine={{ stroke: "#e5e7eb" }}
              axisLine={{ stroke: "#e5e7eb" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: "10px" }} iconType="circle" />
            <Bar
              dataKey="views"
              fill="#3b82f6"
              name="Views"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
            <Bar
              dataKey="purchases"
              fill="#10b981"
              name="Purchases"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProductPerformance;
