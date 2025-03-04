import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("key"); // Check if the user is authenticated
  const user = JSON.parse(localStorage.getItem("user")); // Get the user data from localStorage

  // Check if the user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if the route includes "admin" and the user has an admin role
  const isAdminRoute = window.location.pathname.includes("admin")&&window.location.pathname !=='/admin/login';

  // If the route is an admin route and the user is not an admin, redirect to 404
  if (isAdminRoute && user?.role !== "admin") {
    return <Navigate to="/404" replace />;
  }

  // If the user is authenticated and the role matches, render the children
  return children;
};

export default ProtectedRoute;

