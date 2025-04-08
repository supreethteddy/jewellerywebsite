import React, { useState } from "react";
import { useQuery } from "react-query";
import { getTotalSales } from "../services/api";
import LoadingSpinner from "./LoadingSpinner.jsx";

const SalesOverview = () => {
  const [dateRange, setDateRange] = useState("last30days");

  const getDateRange = () => {
    const endDate = new Date().toISOString();
    let startDate;

    switch (dateRange) {
      case "last7days":
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        return { startDate: startDate.toISOString(), endDate };
      case "last30days":
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        return { startDate: startDate.toISOString(), endDate };
      case "last90days":
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 90);
        return { startDate: startDate.toISOString(), endDate };
      case "thisyear":
        startDate = new Date(new Date().getFullYear(), 0, 1);
        return { startDate: startDate.toISOString(), endDate };
      default:
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        return { startDate: startDate.toISOString(), endDate };
    }
  };

  const { startDate, endDate } = getDateRange();

  const { data, isLoading, error } = useQuery(["totalSales", dateRange], () =>
    getTotalSales({ startDate, endDate })
  );

  if (isLoading)
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
          Sales Overview
        </h2>
        <LoadingSpinner text="Loading sales overview..." />
      </div>
    );

  if (error)
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
          Sales Overview
        </h2>
        <div className="flex flex-col items-center justify-center h-48 text-red-500">
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
          <p>Error loading sales data</p>
        </div>
      </div>
    );

  const { totalOrders, totalRevenue, averageOrderValue } = data?.data || {};

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value || 0);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-2 border-b border-gray-100 gap-4">
        <h2 className="text-lg font-semibold text-gray-800">Sales Overview</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Period:</span>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="last7days">Last 7 Days</option>
            <option value="last30days">Last 30 Days</option>
            <option value="last90days">Last 90 Days</option>
            <option value="thisyear">This Year</option>
          </select>
        </div>
      </div>

      <div className="text-sm text-gray-500 mb-4">
        {formatDate(startDate)} - {formatDate(endDate)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
          <span className="text-3xl font-bold text-gray-800 mb-2">
            {totalOrders || 0}
          </span>
          <span className="text-sm text-gray-500">Total Orders</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
          <span className="text-3xl font-bold text-blue-600 mb-2">
            {formatCurrency(totalRevenue)}
          </span>
          <span className="text-sm text-gray-500">Total Revenue</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg">
          <span className="text-3xl font-bold text-gray-800 mb-2">
            {formatCurrency(averageOrderValue)}
          </span>
          <span className="text-sm text-gray-500">Avg. Order Value</span>
        </div>
      </div>
    </div>
  );
};

export default SalesOverview;
