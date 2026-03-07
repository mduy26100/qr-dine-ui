import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ManagementRouter from "./ManagementRouter";
import StorefrontRouter from "./StorefrontRouter";

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
