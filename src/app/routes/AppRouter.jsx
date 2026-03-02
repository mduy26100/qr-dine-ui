import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ManagementRouter from "./ManagementRouter";
import StorefrontRouter from "./StorefrontRouter";

// Create router with data router API (required for useRouteError)
const router = createBrowserRouter([
  {
    path: "/management/*",
    element: <ManagementRouter />,
  },
  {
    path: "/*",
    element: <StorefrontRouter />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
