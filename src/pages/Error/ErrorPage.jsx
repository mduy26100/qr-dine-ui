import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ errorStatus = 404, errorMessage = null }) => {
  const navigate = useNavigate();

  const getErrorContent = () => {
    let status = "404";
    let title = "404";
    let subTitle = "Sorry, the page you visited does not exist.";

    // If errorStatus is provided, use it
    if (errorStatus) {
      switch (errorStatus) {
        case 404:
          status = "404";
          title = "404";
          subTitle = "Sorry, the page you visited does not exist.";
          break;
        case 403:
          status = "403";
          title = "403 Access Denied";
          subTitle = "Sorry, you are not authorized to access this page.";
          break;
        case 401:
          status = "401";
          title = "401";
          subTitle = "Sorry, you need to login to access this page.";
          break;
        case 500:
          status = "500";
          title = "500";
          subTitle = "Sorry, something went wrong on our server.";
          break;
        default:
          status = "error";
          title = errorStatus.toString();
          subTitle = errorMessage || "Unknown Error";
      }
    }

    return { status, title, subTitle };
  };

  const { status, title, subTitle } = getErrorContent();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Result
        status={status}
        title={title}
        subTitle={subTitle}
        extra={[
          <Button key="back" onClick={() => navigate("/management/dashboard")}>
            Back to Dashboard
          </Button>,
        ]}
      />
    </div>
  );
};

export default ErrorPage;
