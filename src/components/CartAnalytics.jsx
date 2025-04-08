import React, { useState } from "react";
import { useQuery } from "react-query";
import {
  getAbandonedCartMetrics,
  getFailedPaymentMetrics,
  getCheckoutFunnelMetrics,
} from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import LoadingSpinner from "./LoadingSpinner.jsx";

const CartAnalytics = () => {
  const [period, setPeriod] = useState(30);

  const {
    data: cartData,
    isLoading: cartLoading,
    error: cartError,
  } = useQuery(["abandonedCartMetrics", period], () =>
    getAbandonedCartMetrics({ period })
  );

  const {
    data: paymentData,
    isLoading: paymentLoading,
    error: paymentError,
  } = useQuery(["failedPaymentMetrics", period], () =>
    getFailedPaymentMetrics({ period })
  );

  const {
    data: funnelData,
    isLoading: funnelLoading,
    error: funnelError,
  } = useQuery(["checkoutFunnelMetrics", period], () =>
    getCheckoutFunnelMetrics({ period })
  );

  if (cartLoading || paymentLoading || funnelLoading)
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
          Cart & Checkout Analytics
        </h2>
        <LoadingSpinner text="Loading cart analytics data..." />
      </div>
    );

  if (cartError || paymentError || funnelError)
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
          Cart & Checkout Analytics
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
          <p>Error loading cart analytics data</p>
        </div>
      </div>
    );

  const cartMetrics = cartData?.data || {};
  const paymentMetrics = paymentData?.data || {};
  const funnelMetrics = funnelData?.data || {};

  // Check if we have data
  const hasCartData = cartMetrics.totalAbandonedCarts !== undefined;
  const hasPaymentData =
    paymentMetrics.successfulAttempts !== undefined ||
    paymentMetrics.failedAttempts !== undefined;
  const hasFunnelData = funnelMetrics.cartViews !== undefined;

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value || 0);
  };

  // Prepare funnel data
  const funnelChartData = [
    { name: "Cart Views", value: funnelMetrics.cartViews || 0 },
    {
      name: "Checkout Initiations",
      value: funnelMetrics.checkoutInitiations || 0,
    },
    { name: "Successful Orders", value: funnelMetrics.successfulOrders || 0 },
  ];

  // Prepare payment data
  const paymentChartData = [
    { name: "Successful", value: paymentMetrics.successfulAttempts || 0 },
    { name: "Failed", value: paymentMetrics.failedAttempts || 0 },
  ];

  // Custom tooltip for funnel
  const FunnelTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md">
          <p className="font-medium text-gray-800">{label}</p>
          <p className="text-blue-600 font-semibold">
            {`${payload[0].value} users`}
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for payment
  const PaymentTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md">
          <p className="font-medium text-gray-800">{payload[0].name}</p>
          <p
            className={`font-semibold ${
              payload[0].name === "Successful"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {`${payload[0].value} attempts (${(
              payload[0].percent * 100
            ).toFixed(1)}%)`}
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
          Cart & Checkout Analytics
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Abandoned Cart Metrics */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-base font-medium text-gray-700 mb-4 text-center">
            Abandoned Carts
          </h3>
          {!hasCartData ? (
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
              <p>No abandoned cart data</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col items-center p-4 bg-red-50 rounded-lg">
                <span className="text-3xl font-bold text-red-500 mb-2">
                  {cartMetrics.totalAbandonedCarts || 0}
                </span>
                <span className="text-sm text-gray-500">Abandoned Carts</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                <span className="text-3xl font-bold text-gray-800 mb-2">
                  {formatCurrency(cartMetrics.totalValue)}
                </span>
                <span className="text-sm text-gray-500">Total Value</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg">
                <span className="text-3xl font-bold text-gray-800 mb-2">
                  {formatCurrency(cartMetrics.averageCartValue)}
                </span>
                <span className="text-sm text-gray-500">Avg. Cart Value</span>
              </div>
            </div>
          )}
        </div>

        {/* Failed Payment Metrics */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-base font-medium text-gray-700 mb-4 text-center">
            Payment Status
          </h3>
          {!hasPaymentData ? (
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
              <p>No payment data available</p>
            </div>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    paddingAngle={5}
                  >
                    {paymentChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === 0 ? "#10b981" : "#ef4444"}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<PaymentTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Checkout Funnel */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-base font-medium text-gray-700 mb-4 text-center">
            Checkout Funnel
          </h3>
          {!hasFunnelData ? (
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
              <p>No funnel data available</p>
            </div>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={funnelChartData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    tickLine={{ stroke: "#e5e7eb" }}
                    axisLine={{ stroke: "#e5e7eb" }}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={150}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    tickLine={{ stroke: "#e5e7eb" }}
                    axisLine={{ stroke: "#e5e7eb" }}
                  />
                  <Tooltip content={<FunnelTooltip />} />
                  <Bar
                    dataKey="value"
                    fill="#3b82f6"
                    radius={[0, 4, 4, 0]}
                    barSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartAnalytics;
