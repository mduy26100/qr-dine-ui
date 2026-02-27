import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Spin } from "antd";

const PrivateRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, isInitialized, user } = useAuth();

    if (!isInitialized) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-100">
                <Spin size="large"/>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && allowedRoles.length > 0) {
        const userRoles = user?.roles || [];
        const hasPermission = allowedRoles.some(role => userRoles.includes(role));
        
        if (!hasPermission) {
            throw new Response("Forbidden", { 
                status: 403, 
                statusText: "You are not authorized to access this page." 
            });
        }
    }

    return children ? children : <Outlet />;
};

export default PrivateRoute;