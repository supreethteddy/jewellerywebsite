import React, { useState } from "react";
import { useQuery } from "react-query";
import {
  getCustomerMetrics,
  getCustomerSpendingDistribution,
} from "../services/api";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import LoadingSpinner from "./LoadingSpinner.jsx";

const CustomerMetrics = () => {
  const [period, setPeriod] = useState(30);

  const {
    data: metricsData,
    isLoading: metricsLoading,
    error: metricsError,
  } = useQuery(["customerMetrics", period], () =>
    getCustomerMetrics({ period })
  );

  const {
    data: distributionData,
    isLoading: distributionLoading,
    error: distributionError,
  } = useQuery("customerSpendingDistribution", () =>
    getCustomerSpendingDistribution()
  );

  if (metricsLoading || distributionLoading)
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
          Customer Analytics
        </h2>
        <LoadingSpinner text="Loading customer analytics data..." />
      </div>
    );

  if (metricsError || distributionError)
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
          Customer Analytics
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
          <p>Error loading customer data</p>
        </div>
      </div>
    );

  const metrics = metricsData?.data || {};
  const distribution = distributionData?.data || [];
  const totalCustomers = metrics.totalCustomers || 0;

  // Check if we have distribution data
  const hasDistributionData = distribution.length > 0;

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value || 0);
  };

  // Colors for the pie chart
  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  // Customer type data for pie chart
  const customerTypeData = [
    { name: "New Customers", value: metrics.newCustomers || 0 },
    { name: "Returning Customers", value: metrics.returningCustomers || 0 },
  ];

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md">
          <p className="font-medium text-gray-800">{payload[0].name}</p>
          <p className="text-blue-600 font-semibold">
            {`${payload[0].value} customers (${(
              payload[0].percent * 100
            ).toFixed(1)}%)`}
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for distribution
  const DistributionTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md">
          <p className="font-medium text-gray-800">
            {payload[0].payload.range}
          </p>
          <p className="text-blue-600 font-semibold">
            {`${payload[0].value} customers`}
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
          Customer Analytics
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
            <option value={365}>Last year</option>
          </select>
        </div>
      </div>

      <div className="text-sm text-gray-500 mb-4">
        Total Customers: {totalCustomers}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Customer Metrics */}
        <div>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
              <span className="text-3xl font-bold text-gray-800 mb-2">
                {metrics.totalCustomers || 0}
              </span>
              <span className="text-sm text-gray-500">Total Customers</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
              <span className="text-3xl font-bold text-blue-600 mb-2">
                {metrics.newCustomers || 0}
              </span>
              <span className="text-sm text-gray-500">New Customers</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-yellow-50 rounded-lg">
              <span className="text-3xl font-bold text-green-600 mb-2">
                {metrics.returningCustomers || 0}
              </span>
              <span className="text-sm text-gray-500">Returning Customers</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg">
              <span className="text-3xl font-bold text-gray-800 mb-2">
                {formatCurrency(metrics.averageSpending)}
              </span>
              <span className="text-sm text-gray-500">Avg. Spending</span>
            </div>
          </div>

          {/* Customer Type Pie Chart */}
          <div className="h-64 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-base font-medium text-gray-700 mb-4 text-center">
              Customer Composition
            </h3>
            {customerTypeData[0].value === 0 &&
            customerTypeData[1].value === 0 ? (
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
                <p>No customer composition data</p>
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
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Spending Distribution */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-base font-medium text-gray-700 mb-4 text-center">
            Customer Spending Distribution
          </h3>
          {!hasDistributionData ? (
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
              <p>No spending distribution data</p>
            </div>
          ) : (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="customerCount"
                  >
                    {distribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<DistributionTooltip />} />
                  <Legend
                    layout="vertical"
                    verticalAlign="bottom"
                    align="center"
                    iconType="circle"
                    formatter={(value, entry) => entry.payload.range}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerMetrics;
