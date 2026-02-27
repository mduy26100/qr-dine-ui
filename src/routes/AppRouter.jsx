import { MainLayout } from "../layouts";
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom";
import { Dashboard, ErrorPage } from "../pages";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route path="/" 
            element={
                <MainLayout /> 
            }
            errorElement={<ErrorPage />}
        >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
        </Route>
        </>
    )
)

const AppRouter = () => {
    return <RouterProvider router={router} />;
}

export default AppRouter;