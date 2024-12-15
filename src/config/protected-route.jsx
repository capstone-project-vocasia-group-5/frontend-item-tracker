import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import Preloader from "../components/templates/preloader/preloader";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <Preloader />;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role === "admin" && !allowedRoles.includes("admin")) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/not-found" replace />;
  }

  return children;
};

export default ProtectedRoute;
