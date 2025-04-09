import React from "react";
import { useQuery } from "react-query";
import { getRepeatCustomerMetrics, getLoyalCustomers } from "../services/api";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import LoadingSpinner from "./LoadingSpinner.jsx";

const RepeatCustomers = () => {
  const {
    data: metricsData,
    isLoading: metricsLoading,
    error: metricsError,
  } = useQuery("repeatCustomerMetrics", () => getRepeatCustomerMetrics());

  const {
    data: loyalData,
    isLoading: loyalLoading,
    error: loyalError,
  } = useQuery("loyalCustomers", () =>
    getLoyalCustomers({ limit: 5, minOrders: 2 })
  );

  if (metricsLoading || loyalLoading)
    return (
      <div className="bg-white p-6 rounded-xl  border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
          Repeat Customers
        </h2>
        <LoadingSpinner />
      </div>
    );

  if (metricsError || loyalError)
    return (
      <div className="bg-white p-6 rounded-xl  border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
          Repeat Customers
        </h2>
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
          <p>Error loading repeat customer data</p>
        </div>
      </div>
    );

  const metrics = metricsData?.data || {};
  const loyalCustomers = loyalData?.data || [];

  // Check if we have data
  const hasMetricsData =
    metrics.repeatCustomers !== undefined ||
    metrics.oneTimeCustomers !== undefined;
  const hasLoyalCustomers = loyalCustomers.length > 0;

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value || 0);
  };

  // Colors for the pie chart
  const COLORS = ["#3b82f6", "#ef4444"];

  // Customer type data for pie chart
  const customerTypeData = [
    { name: "Repeat Customers", value: metrics.repeatCustomers || 0 },
    { name: "One-Time Customers", value: metrics.oneTimeCustomers || 0 },
  ];

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md">
          <p className="font-medium text-gray-800">{payload[0].name}</p>
          <p className="text-blue-600 font-semibold">
            {`${payload[0].value} customers`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 transition-shadow duration-300">
      <h2 className="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
        Repeat Customers
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Repeat Customer Metrics */}
        <div>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
              <span className="text-3xl font-bold text-blue-600 mb-2">
                {metrics.repeatCustomers || 0}
              </span>
              <span className="text-sm text-gray-500">Repeat Customers</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-red-50 rounded-lg">
              <span className="text-3xl font-bold text-gray-800 mb-2">
                {metrics.oneTimeCustomers || 0}
              </span>
              <span className="text-sm text-gray-500">One-Time Customers</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
              <span className="text-3xl font-bold text-green-600 mb-2">
                {(metrics.repeatPurchaseRate || 0).toFixed(1)}%
              </span>
              <span className="text-sm text-gray-500">
                Repeat Purchase Rate
              </span>
            </div>
            <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg">
              <span className="text-3xl font-bold text-gray-800 mb-2">
                {(metrics.averageOrdersPerCustomer || 0).toFixed(1)}
              </span>
              <span className="text-sm text-gray-500">
                Avg. Orders/Customer
              </span>
            </div>
          </div>

          {/* Customer Type Pie Chart */}
          <div className="h-64 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-base font-medium text-gray-700 mb-4 text-center">
              Customer Loyalty Breakdown
            </h3>
            {!hasMetricsData ? (
              <div className="flex flex-col items-center justify-center h-48 text-gray-500">
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
                <p>No customer loyalty data</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    paddingAngle={5}
                  >
                    {customerTypeData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Loyal Customers */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-base font-medium text-gray-700 mb-4 text-center">
            Top Loyal Customers
          </h3>
          {!hasLoyalCustomers ? (
            <div className="flex flex-col items-center justify-center h-48 text-gray-500">
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
              <p>No loyal customer data available</p>
            </div>
          ) : (
            <div className="overflow-y-auto max-h-80 rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Customer
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Orders
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Total Spent
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loyalCustomers.map((customer) => (
                    <tr key={customer._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {customer.name}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                        {customer.orderCount}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-600 font-semibold text-right">
                        {formatCurrency(customer.totalSpent)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepeatCustomers;
