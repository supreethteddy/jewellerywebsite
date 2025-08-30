"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSearchQuerys } from "../services/api";
// Import specific functions from date-fns to avoid conflicts
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import subDays from "date-fns/subDays";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import LoadingSpinner from "./LoadingSpinner.jsx";

const ITEMS_PER_PAGE = 10;

const SearchQueries = () => {
  // Date range state
  const [dateRange, setDateRange] = useState({
    from: format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd"),
    to: format(endOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd"),
  });

  // Custom date range state
  const [customDateRange, setCustomDateRange] = useState({
    from: format(subDays(new Date(), 7), "yyyy-MM-dd"),
    to: format(new Date(), "yyyy-MM-dd"),
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("week");

  // Fetch search queries
  const {
    data: queriesData,
    isLoading,
    error,
    refetch,
  } = useQuery(["searchQueries", dateRange.from, dateRange.to], () =>
    getSearchQuerys(dateRange.from, dateRange.to)
  );

  // Calculate total pages
  const totalQueries = queriesData?.count || 0;
  const totalPages = Math.ceil(totalQueries / ITEMS_PER_PAGE);

  // Handle date filter changes
  const handleFilterChange = (filter) => {
    const today = new Date();
    let from = "";
    let to = format(today, "yyyy-MM-dd");

    switch (filter) {
      case "week":
        from = format(startOfWeek(today, { weekStartsOn: 1 }), "yyyy-MM-dd");
        to = format(endOfWeek(today, { weekStartsOn: 1 }), "yyyy-MM-dd");
        break;
      case "month":
        from = format(startOfMonth(today), "yyyy-MM-dd");
        to = format(endOfMonth(today), "yyyy-MM-dd");
        break;
      case "custom":
        // Keep the current custom date range
        from = customDateRange.from;
        to = customDateRange.to;
        break;
    }

    setDateRange({ from, to });
    setActiveFilter(filter);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Handle custom date range changes
  const handleCustomDateChange = (e, field) => {
    const newCustomRange = { ...customDateRange, [field]: e.target.value };
    setCustomDateRange(newCustomRange);

    if (activeFilter === "custom") {
      setDateRange(newCustomRange);
      setCurrentPage(1); // Reset to first page when date changes
    }
  };

  // Apply custom date range
  const applyCustomDateRange = () => {
    setDateRange(customDateRange);
    setActiveFilter("custom");
    setCurrentPage(1); // Reset to first page when date changes
  };

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Format date for display
  const formatDate = (dateString) => {
    try {
      const date = parseISO(dateString);
      return format(date, "MMM dd, yyyy HH:mm");
    } catch (error) {
      return dateString;
    }
  };

  // Get current page queries
  const getCurrentPageQueries = () => {
    if (!queriesData?.queries) return [];
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return queriesData.queries.slice(startIndex, endIndex);
  };

  // Generate pagination buttons
  const getPaginationButtons = () => {
    const buttons = [];
    const maxButtonsToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

    if (endPage - startPage + 1 < maxButtonsToShow) {
      startPage = Math.max(1, endPage - maxButtonsToShow + 1);
    }

    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1 || totalPages === 0}
        className="px-3 py-1 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
    );

    // First page button if not starting from page 1
    if (startPage > 1) {
      buttons.push(
        <button
          key="1"
          onClick={() => handlePageChange(1)}
          className="px-3 py-1 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <span key="ellipsis1" className="px-2 py-1 text-gray-500">
            ...
          </span>
        );
      }
    }

    // Page buttons
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            currentPage === i
              ? "bg-blue-600 text-white border border-blue-600"
              : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
          }`}
        >
          {i}
        </button>
      );
    }

    // Last page button if not ending at the last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="ellipsis2" className="px-2 py-1 text-gray-500">
            ...
          </span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-1 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages || totalPages === 0}
        className="px-3 py-1 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    );

    return buttons;
  };

  // Analyze query data to get insights
  const getQueryAnalytics = () => {
    if (!queriesData?.queries || queriesData.queries.length === 0) {
      return {
        uniqueQueries: 0,
        mostFrequentQuery: { query: "N/A", count: 0 },
        mostRecent: "N/A",
        averageLength: 0,
      };
    }

    // Count query frequencies
    const queryFrequency = {};
    let totalLength = 0;

    queriesData.queries.forEach((item) => {
      const query = item.query.toLowerCase();
      queryFrequency[query] = (queryFrequency[query] || 0) + 1;
      totalLength += query.length;
    });

    // Find most frequent query
    let mostFrequentQuery = { query: "", count: 0 };
    Object.entries(queryFrequency).forEach(([query, count]) => {
      if (count > mostFrequentQuery.count) {
        mostFrequentQuery = { query, count };
      }
    });

    return {
      uniqueQueries: Object.keys(queryFrequency).length,
      mostFrequentQuery,
      mostRecent: queriesData.queries[0]?.query || "N/A",
      averageLength: Math.round(totalLength / queriesData.queries.length),
    };
  };

  const queryAnalytics = getQueryAnalytics();

  // Main content rendering
  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner text="Loading search queries..." />;
    }

    if (error) {
      return (
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
          <p>Error loading search queries</p>
        </div>
      );
    }

    if (!queriesData?.queries || queriesData.queries.length === 0) {
      return (
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
          <p>No search queries found for the selected date range</p>
        </div>
      );
    }

    const currentQueries = getCurrentPageQueries();

    return (
      <>
        {/* Stats summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center justify-center">
            <p className="text-sm text-blue-600 mb-1">Total Searches</p>
            <p className="text-3xl font-bold text-blue-700">
              {queriesData.count}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center justify-center">
            <p className="text-sm text-green-600 mb-1">Unique Queries</p>
            <p className="text-3xl font-bold text-green-700">
              {queryAnalytics.uniqueQueries}
            </p>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg flex flex-col items-center justify-center">
            <p className="text-sm text-amber-600 mb-1">Most Frequent</p>
            <p className="text-xl font-bold text-amber-700 truncate max-w-full">
              {queryAnalytics.mostFrequentQuery.query}
            </p>
            <p className="text-sm text-amber-600">
              {queryAnalytics.mostFrequentQuery.count} times
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg flex flex-col items-center justify-center">
            <p className="text-sm text-purple-600 mb-1">Avg. Query Length</p>
            <p className="text-3xl font-bold text-purple-700">
              {queryAnalytics.averageLength}
            </p>
            <p className="text-sm text-purple-600">characters</p>
          </div>
        </div>

        {/* Search queries table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Search Query
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date & Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentQueries.map((query, index) => (
                <tr
                  key={query._id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {query.query}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(query.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-700">
            {queriesData.count > 0 ? (
              <>
                Showing{" "}
                <span className="font-medium">
                  {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(currentPage * ITEMS_PER_PAGE, queriesData.count)}
                </span>{" "}
                of <span className="font-medium">{queriesData.count}</span>{" "}
                results
              </>
            ) : (
              "No results to display"
            )}
          </div>
          <div className="flex space-x-1">{getPaginationButtons()}</div>
        </div>
      </>
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100">
      <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">
          User Search Queries
        </h2>
      </div>

      {/* Date filters - always visible */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => handleFilterChange("week")}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeFilter === "week"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => handleFilterChange("month")}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeFilter === "month"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            This Month
          </button>
          <button
            onClick={() => handleFilterChange("custom")}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeFilter === "custom"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Custom Range
          </button>
        </div>

        {/* Custom date range inputs */}
        <div className="flex flex-wrap items-end gap-4 mb-2">
          <div>
            <label
              htmlFor="from-date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              From
            </label>
            <input
              type="date"
              id="from-date"
              value={customDateRange.from}
              onChange={(e) => handleCustomDateChange(e, "from")}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="to-date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              To
            </label>
            <input
              type="date"
              id="to-date"
              value={customDateRange.to}
              onChange={(e) => handleCustomDateChange(e, "to")}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={applyCustomDateRange}
            className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Apply
          </button>
        </div>

        <div className="text-sm text-gray-500">
          Showing search queries from{" "}
          {format(parseISO(dateRange.from), "MMMM d, yyyy")} to{" "}
          {format(parseISO(dateRange.to), "MMMM d, yyyy")}
        </div>
      </div>

      {/* Main content area */}
      {renderContent()}
    </div>
  );
};

export default SearchQueries;
