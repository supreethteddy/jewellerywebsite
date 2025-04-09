"use client";

import { useQuery } from "react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";
import { getDeviceStats } from "../services/api";

const DeviceStats = () => {
  // Using React Query to fetch data
  const { data, isLoading, isError } = useQuery("deviceStats", getDeviceStats);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-100 h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 border-4 border-t-blue-500 border-b-blue-500 border-l-transparent border-r-transparent rounded-full animate-spin"></div>
          <p className="mt-2 text-sm text-gray-500">
            Loading device statistics...
          </p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-100 h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center text-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
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
          <p className="mt-2">Unable to load device statistics</p>
        </div>
      </div>
    );
  }

  // Handle empty data state
  if (!data || (data.mobile === 0 && data.desktop === 0)) {
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-100 h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
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
          <p className="mt-2">No device data available</p>
        </div>
      </div>
    );
  }

  // Calculate total and percentages
  const total = data.mobile + data.desktop;
  const mobilePercentage = Math.round((data.mobile / total) * 100);
  const desktopPercentage = Math.round((data.desktop / total) * 100);

  // Prepare the data for the charts
  const chartData = [
    { name: "Mobile", value: data.mobile, color: "#3b82f6" },
    { name: "Desktop", value: data.desktop, color: "#10b981" },
  ];

  // Custom tooltip for the charts
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md">
          <p className="font-medium text-gray-800">{data.name}</p>
          <p className="text-gray-600">
            {data.value} requests ({Math.round((data.value / total) * 100)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100">
      <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">Device Usage</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                animationDuration={1000}
                animationEasing="ease-out"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                labelLine={false}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: "20px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
            >
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={60}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 gap-4 mt-6 text-center">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600 font-medium">Mobile</p>
          <p className="text-2xl font-bold text-blue-700">{data.mobile}</p>
          <p className="text-sm text-blue-500">
            {mobilePercentage}% of requests
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600 font-medium">Desktop</p>
          <p className="text-2xl font-bold text-green-700">{data.desktop}</p>
          <p className="text-sm text-green-500">
            {desktopPercentage}% of requests
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeviceStats;
