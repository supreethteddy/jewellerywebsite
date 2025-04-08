import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_URL
  ? `${process.env.REACT_APP_BASE_URL}api`
  : "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Sales & Revenue
export const getTotalSales = async (params) => {
  const response = await api.get("/analytics/sales/total", { params });
  return response.data;
};

export const getTopSellingProducts = async (params) => {
  const response = await api.get("/analytics/sales/top-products", { params });
  return response.data;
};

export const getSalesTrends = async (params) => {
  const response = await api.get("/analytics/sales/trends", { params });
  return response.data;
};

// Customers
export const getCustomerMetrics = async (params) => {
  const response = await api.get("/analytics/customers/metrics", { params });
  return response.data;
};

export const getTopCustomers = async (params) => {
  const response = await api.get("/analytics/customers/top", { params });
  return response.data;
};

export const getCustomerSpendingDistribution = async (params) => {
  const response = await api.get("/analytics/customers/spending-distribution", {
    params,
  });
  return response.data;
};

// Products
export const getMostViewedProducts = async (params) => {
  const response = await api.get("/analytics/products/most-viewed", { params });
  return response.data;
};

export const getMostPurchasedProducts = async (params) => {
  const response = await api.get("/analytics/products/most-purchased", {
    params,
  });
  return response.data;
};

export const getProductPerformance = async (productId, params) => {
  const response = await api.get(
    `/analytics/products/${productId}/performance`,
    { params }
  );
  return response.data;
};

// Repeat Customers
export const getRepeatCustomerMetrics = async (params) => {
  const response = await api.get("/analytics/repeat-customers/metrics", {
    params,
  });
  return response.data;
};

export const getLoyalCustomers = async (params) => {
  const response = await api.get("/analytics/repeat-customers/loyal", {
    params,
  });
  return response.data;
};

// Cart & Checkout
export const getAbandonedCartMetrics = async (params) => {
  const response = await api.get("/analytics/cart/abandoned", { params });
  return response.data;
};

export const getFailedPaymentMetrics = async (params) => {
  const response = await api.get("/analytics/checkout/failed-payments", {
    params,
  });
  return response.data;
};

export const getCheckoutFunnelMetrics = async (params) => {
  const response = await api.get("/analytics/checkout/funnel", { params });
  return response.data;
};
