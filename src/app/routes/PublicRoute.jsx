import { Navigate } from "react-router-dom";
import { Spin } from "antd";
import { useAuth } from "../providers";
import { AUTH_STATUS } from "../../shared/constants";

const PublicRoute = ({ children }) => {
  const { authStatus } = useAuth();

  if (authStatus === AUTH_STATUS.CHECKING) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <Spin size="large" />
      </div>
    );
  }

  if (authStatus === AUTH_STATUS.AUTHENTICATED) {
    return <Navigate to="/management/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
