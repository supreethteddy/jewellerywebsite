import React, { useState } from "react";
import { useQuery } from "react-query";
import { getSalesTrends } from "../services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
} from "recharts";
import LoadingSpinner from "./LoadingSpinner.jsx";

const SalesTrends = () => {
  const [period, setPeriod] = useState("monthly");

  const { data, isLoading, error } = useQuery(["salesTrends", period], () =>
    getSalesTrends({
      period,
      startDate: getLastSixMonthsDate(),
      endDate: new Date().toISOString(),
    })
  );

  const getLastSixMonthsDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 6);
    return date.toISOString();
  };

  if (isLoading)
    return (
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Sales Trends</h2>
        </div>
        <LoadingSpinner size="large" />
      </div>
    );

  if (error)
    return (
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Sales Trends</h2>
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
          <p>Error loading sales trends data</p>
        </div>
      </div>
    );

  const trends = data?.data || [];

  // Check if we have data
  if (trends.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Sales Trends</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Period:</span>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
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
          <p>No sales data available for this period</p>
        </div>
      </div>
    );
  }

  // Format the data for the chart
  const chartData = trends.map((item) => {
    let label;
    if (period === "daily") {
      label = `${item._id.month}/${item._id.day}`;
    } else if (period === "weekly") {
      label = `Week ${item._id.week}`;
    } else {
      label = `${item._id.year}-${String(item._id.month).padStart(2, "0")}`;
    }

    return {
      name: label,
      revenue: item.revenue,
      orders: item.orders,
    };
  });

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-lg rounded-md">
          <p className="font-medium text-gray-800 mb-2">{label}</p>
          <p className="text-blue-600 font-semibold flex items-center">
            <span className="w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
            {`Revenue: ${formatCurrency(payload[0].value)}`}
          </p>
          <p className="text-green-600 font-semibold flex items-center">
            <span className="w-3 h-3 bg-green-600 rounded-full mr-2"></span>
            {`Orders: ${payload[1].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 transition-shadow duration-300">
      <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">Sales Trends</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Period:</span>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickLine={{ stroke: "#e5e7eb" }}
              axisLine={{ stroke: "#e5e7eb" }}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              stroke="#3b82f6"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickLine={{ stroke: "#e5e7eb" }}
              axisLine={{ stroke: "#e5e7eb" }}
              tickFormatter={(value) => `₹${value / 1000}k`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#10b981"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickLine={{ stroke: "#e5e7eb" }}
              axisLine={{ stroke: "#e5e7eb" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: "10px" }} iconType="circle" />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
              name="Revenue"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="orders"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
              name="Orders"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesTrends;
