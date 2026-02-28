import { MainLayout } from "../layouts";
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom";
import { Dashboard, ErrorPage, LoginPage } from "../pages";
import { SYSTEM_ROLE } from "../constants";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import CategoryPage from "../pages/Catalog/CategoryPage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route errorElement={<ErrorPage />}>
            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                }
            />

            <Route path="/" 
                element={
                    <PrivateRoute allowedRoles={[SYSTEM_ROLE.SUPPER_ADMIN, SYSTEM_ROLE.MERCHANT, SYSTEM_ROLE.STAFF]}>
                        <MainLayout /> 
                    </PrivateRoute>
                }
            >
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />

                <Route
                path="categories"
                element={
                    <PrivateRoute allowedRoles={[SYSTEM_ROLE.MERCHANT]}>
                        <CategoryPage />
                    </PrivateRoute>
                    }
                />
            </Route>

            <Route path="*" element={<ErrorPage />} />
        </Route>
    )
)

const AppRouter = () => {
    return <RouterProvider router={router} />;
}

export default AppRouter;