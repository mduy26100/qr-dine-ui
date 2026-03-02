import { Navigate } from "react-router-dom";
import { Spin } from "antd";
import { useAuth } from "../providers";

const PublicRoute = ({ children }) => {
    const { isAuthenticated, isInitialized } = useAuth();

    if (!isInitialized) {
         return (
             <div className="h-screen flex items-center justify-center bg-gray-100">
                 <Spin size="large"/>
             </div>
         );
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default PublicRoute;
