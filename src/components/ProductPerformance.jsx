"use client";

import { useState } from "react";
import { useQuery } from "react-query";
import { getMostViewedProducts } from "../services/api";
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
  const [limit, setLimit] = useState(10);

  // Only use the getMostViewedProducts API
  const {
    data: productsData,
    isLoading,
    error,
  } = useQuery(["mostViewedProducts", period, limit], () =>
    getMostViewedProducts({ limit, period })
  );

  if (isLoading)
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

  if (error)
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

  // Get products from the response
  const products = productsData?.data || [];

  // Check if we have data
  if (products.length === 0) {
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

  // Format data for chart - sort by views in descending order
  const sortedProducts = [...products].sort((a, b) => b.views - a.views);
  const chartData = sortedProducts.slice(0, limit).map((product, index) => {
    return {
      index: index + 1,
      name: product.name,
      views: product.views,
      quantity: product.quantity,
      price: product.price,
      totalNetSale: product.totalNetSale,
    };
  });

  // Custom tooltip for hover info
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md">
          <p className="font-medium text-gray-800 mb-2">
            {payload[0].payload.name}
          </p>
          <p className="text-blue-600 font-semibold flex items-center">
            <span className="w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
            {`Views: ${payload[0].value}`}
          </p>
          <p className="text-green-600 font-semibold flex items-center">
            <span className="w-3 h-3 bg-green-600 rounded-full mr-2"></span>
            {`Quantity Sold: ${payload[0].payload.quantity}`}
          </p>
          <p className="text-gray-600 flex items-center mt-2">
            <span className="w-3 h-3 bg-gray-400 rounded-full mr-2"></span>
            {`Price: ₹${payload[0].payload.price}`}
          </p>
          <p className="text-purple-600 flex items-center mt-2">
            <span className="w-3 h-3 bg-purple-600 rounded-full mr-2"></span>
            {`Total Sales: ₹${payload[0].payload.totalNetSale}`}
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
        Showing top {chartData.length} products by views
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="index"
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
              barSize={35}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6">
        <h3 className="text-md font-medium text-gray-700 mb-3">
          Product Details
        </h3>
        <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Product
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Views
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Quantity Sold
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total Sales
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {chartData.map((product, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.views}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{product.totalNetSale}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductPerformance;
