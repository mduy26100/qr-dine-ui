import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers";
import { Spin } from "antd";
import { AUTH_STATUS } from "../../shared/constants";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { authStatus, user } = useAuth();

  if (authStatus === AUTH_STATUS.CHECKING) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <Spin size="large" />
      </div>
    );
  }

  if (authStatus === AUTH_STATUS.UNAUTHENTICATED) {
    return <Navigate to="/management/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const userRoles = user?.roles || [];
    const hasPermission = allowedRoles.some((role) => userRoles.includes(role));

    if (!hasPermission) {
      return <Navigate to="/" replace />;
    }
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;
