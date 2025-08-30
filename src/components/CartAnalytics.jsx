"use client";

import { useQuery } from "@tanstack/react-query";
import { getAbandonedCartMetrics } from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import LoadingSpinner from "./LoadingSpinner.jsx";

const CartAnalytics = () => {
  // Only use the getAbandonedCartMetrics API without period parameter
  const {
    data: cartData,
    isLoading,
    error,
  } = useQuery("abandonedCartMetrics", getAbandonedCartMetrics);

  if (isLoading)
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
          Abandoned Cart Analytics
        </h2>
        <LoadingSpinner text="Loading abandoned cart data..." />
      </div>
    );

  if (error)
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
          Abandoned Cart Analytics
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
          <p>Error loading abandoned cart data</p>
        </div>
      </div>
    );

  // Get abandoned cart items from the response
  const abandonedItems = cartData || [];

  // Check if we have data
  if (!abandonedItems || abandonedItems.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
          Abandoned Cart Analytics
        </h2>
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
          <p>No abandoned cart data available</p>
        </div>
      </div>
    );
  }

  // Calculate total abandoned items
  const totalAbandonedItems = abandonedItems.reduce(
    (sum, item) => sum + item.totalQuantity,
    0
  );

  // Prepare data for charts
  const barChartData = [...abandonedItems].sort(
    (a, b) => b.totalQuantity - a.totalQuantity
  );

  // Prepare data for pie chart
  const pieChartData = abandonedItems.map((item) => ({
    name: item.productName,
    value: item.totalQuantity,
  }));

  // Custom colors for the charts
  const COLORS = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
  ];

  // Custom tooltip for bar chart
  const BarTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md">
          <p className="font-medium text-gray-800 mb-1">
            {payload[0].payload.productName}
          </p>
          <p className="text-blue-600 font-semibold flex items-center">
            <span className="w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
            {`Quantity: ${payload[0].value}`}
          </p>
          <p className="text-gray-600 text-sm mt-1">
            {((payload[0].value / totalAbandonedItems) * 100).toFixed(1)}% of
            total abandoned items
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for pie chart
  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md">
          <p className="font-medium text-gray-800">{payload[0].name}</p>
          <p className="text-blue-600 font-semibold">
            {`${payload[0].value} items (${(
              (payload[0].value / totalAbandonedItems) *
              100
            ).toFixed(1)}%)`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100">
      <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">
          Abandoned Cart Analytics
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center justify-center">
          <p className="text-sm text-blue-600 mb-1">Total Abandoned Items</p>
          <p className="text-3xl font-bold text-blue-700">
            {totalAbandonedItems}
          </p>
        </div>
        <div className="bg-amber-50 p-4 rounded-lg flex flex-col items-center justify-center">
          <p className="text-sm text-amber-600 mb-1">Unique Products</p>
          <p className="text-3xl font-bold text-amber-700">
            {abandonedItems.length}
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg flex flex-col items-center justify-center">
          <p className="text-sm text-purple-600 mb-1">Most Abandoned</p>
          <p className="text-3xl font-bold text-purple-700">
            {barChartData[0]?.totalQuantity || 0}
          </p>
          <p className="text-sm text-purple-500 mt-1">
            {barChartData[0]?.productName}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div>
          <h3 className="text-base font-medium text-gray-700 mb-4">
            Abandoned Items by Product
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barChartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="productName"
                  tick={false}
                  axisLine={{ stroke: "#e5e7eb" }}
                  height={10}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  tickLine={{ stroke: "#e5e7eb" }}
                  axisLine={{ stroke: "#e5e7eb" }}
                />
                <Tooltip content={<BarTooltip />} />
                <Bar
                  dataKey="totalQuantity"
                  name="Abandoned Items"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                >
                  {barChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div>
          <h3 className="text-base font-medium text-gray-700 mb-4">
            Distribution of Abandoned Items
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Abandoned Items Table */}
      <div className="mt-8">
        <h3 className="text-base font-medium text-gray-700 mb-4">
          Abandoned Items Details
        </h3>
        <div className="overflow-x-auto overflow-y-auto max-h-[300px]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
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
                  Quantity
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {barChartData.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.productName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.totalQuantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {((item.totalQuantity / totalAbandonedItems) * 100).toFixed(
                      1
                    )}
                    %
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

export default CartAnalytics;
