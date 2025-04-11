import axios from "axios";
import { clsx } from "clsx";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL + "api/",
  timeout: 50000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "x-Requested-With": "XMLHttpRequest",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("key");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // else {
    //   delete config.headers.Authorization;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    if (res?.data?.token) {
      localStorage.setItem("key", res?.data?.token);
      localStorage.setItem("user", JSON.stringify(res?.data?.user));
    }
    // res?.data?.message && toast.success(res?.data?.message);
    return res?.data;
  },
  (error) => {
    const { response, message } = error || {};
    const errMsg = response?.data?.message || message;
    const status = response?.status;
    if (status === 401) {
      localStorage.removeItem("key");
      localStorage.removeItem("user");
      toast.error("Session is expired you need to log in again.");

      // Check if the URL includes 'admin' and redirect accordingly
      if (window.location.pathname.includes("admin")) {
        window.location.href = "/admin/login";
      } else {
        window.location.href = "/login";
      }
    } else {
      console.log(errMsg);
      // toast.error(errMsg);
    }
    return Promise.reject(error);
  }
);

class APIClient {
  get(config) {
    return this.request({ ...config, method: "GET" });
  }

  post(config) {
    return this.request({ ...config, method: "POST" });
  }

  put(config) {
    return this.request({ ...config, method: "PUT" });
  }

  delete(config) {
    return this.request({ ...config, method: "DELETE" });
  }

  request(config) {
    return new Promise((resolve, reject) => {
      // Check if showToast is not provided and set it to true by default
      const showToast =
        config.showToast !== undefined ? config.showToast : false;

      if (config.guestUser) {
        config.headers = {
          ...config.headers,
          "X-Guest-User": "true",
        };
      }
      axiosInstance
        .request(config)
        .then((res) => {
          // Conditionally show toast if showToast is true
          if (showToast && res?.message) {
            toast.success(res?.message);
          }
          resolve(res);
          return res;
        })
        .catch((e) => {
          if (showToast && e?.response?.data?.message) {
            toast.error(e?.response?.data?.message);
          }
          reject(e);
        });
    });
  }
}
const apiClient = new APIClient();
export default apiClient;

export const generateLabels = (range) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // Get current month (0 = Jan, 1 = Feb, ..., 11 = Dec)
  const currentDay = currentDate.getDate(); // Get current day (used for 7d range)

  let labels = [];

  if (range === "12") {
    // For 12 months, generate the last 12 months in reverse order
    for (let i = 0; i < 12; i++) {
      const month = new Date(currentDate);
      month.setMonth(currentMonth - i);
      const monthName = month.toLocaleString("default", { month: "short" });
      labels.push(monthName);
    }
  } else if (range === "6") {
    // For 6 months, generate the last 6 months
    for (let i = 0; i < 6; i++) {
      const month = new Date(currentDate);
      month.setMonth(currentMonth - i);
      const monthName = month.toLocaleString("default", { month: "short" });
      labels.push(monthName);
    }
  } else if (range === "3") {
    // For 3 months, generate the last 3 months
    for (let i = 0; i < 3; i++) {
      const month = new Date(currentDate);
      month.setMonth(currentMonth - i);
      const monthName = month.toLocaleString("default", { month: "short" });
      labels.push(monthName);
    }
  } else if (range === "7d") {
    // For 7 days, generate the names of the last 7 days
    for (let i = 0; i < 7; i++) {
      const day = new Date(currentDate);
      day.setDate(currentDay - i);
      const dayName = day.toLocaleString("default", { weekday: "short" });
      const dayNumber = day.getDate().toString().padStart(2, "0"); // Ensure day is 2 digits, e.g., "01"

      labels.push(`${dayNumber}-${dayName}`);
    }
  } else if (range === "30d") {
    // For 7 days, generate the names of the last 30 days
    for (let i = 0; i < 30; i++) {
      const day = new Date(currentDate);
      day.setDate(currentDay - i);
      const dayName = day.toLocaleString("default", { weekday: "short" });
      const dayNumber = day.getDate().toString().padStart(2, "0"); // Ensure day is 2 digits, e.g., "01"

      labels.push(`${dayNumber}-${dayName}`);
    }
  }

  return labels.reverse(); // For months, we need to reverse to have the correct order from past to present
};
