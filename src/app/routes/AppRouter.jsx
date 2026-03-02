import { MainLayout } from "../../shared/layouts";
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom";
import { Dashboard, ErrorPage, LoginPage, CategoryPage, ProductPage } from "../../pages";
import { SYSTEM_ROLE } from "../../shared/constants";
import { useAuth } from "../providers";
import { getMenuItems } from "../config";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import RoleRoute from "./RoleRoute";

// Composition Root: Tiêm phụ thuộc vào dumb layout
const ConnectedLayout = () => {
    const { user, logout } = useAuth();
    const menuItems = getMenuItems(user?.roles || []);
    return <MainLayout menuItems={menuItems} user={user} onLogout={logout} />;
};

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

            <Route
                path="/"
                element={
                    <PrivateRoute
                        allowedRoles={[
                            SYSTEM_ROLE.SUPPER_ADMIN,
                            SYSTEM_ROLE.MERCHANT,
                            SYSTEM_ROLE.STAFF
                        ]}
                    >
                        <ConnectedLayout />
                    </PrivateRoute>
                }
            >
                <Route index element={<Navigate to="/dashboard" replace />} />

                <Route path="dashboard" element={<Dashboard />} />

                <Route
                    path="categories"
                    element={
                        <RoleRoute roles={[SYSTEM_ROLE.MERCHANT]}>
                            <CategoryPage />
                        </RoleRoute>
                    }
                />

                <Route
                    path="products"
                    element={
                        <RoleRoute roles={[SYSTEM_ROLE.MERCHANT]}>
                            <ProductPage />
                        </RoleRoute>
                    }
                />
            </Route>

            <Route path="*" element={<ErrorPage />} />

        </Route>
    )
);

const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;
