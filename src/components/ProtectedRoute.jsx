import React from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "../utils/auth";

export default function ProtectedRoute({ children, requiredRole }) {
  const user = getUser();

  if (!user) return <Navigate to="/login" replace />;

  if (requiredRole && user.role !== requiredRole) {
    return <div className="p-6 bg-yellow-100 rounded">Not authorized to view this page.</div>;
  }

  return children;
}
