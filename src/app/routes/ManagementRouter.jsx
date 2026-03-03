import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "../../shared/layouts";
import {
  Dashboard,
  ErrorPage,
  LoginPage,
  CategoryPage,
  ProductPage,
} from "../../pages";
import { SYSTEM_ROLE } from "../../shared/constants";
import { useAuth } from "../providers";
import { getMenuItems } from "../config";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import RoleRoute from "./RoleRoute";

// Composition Root: Tiêm phụ thuộc vào dumb layout
const ConnectedLayout = () => {
  const { user } = useAuth();
  const menuItems = getMenuItems(user?.roles || []);
  return <MainLayout menuItems={menuItems} user={user} />;
};

const ManagementRouter = () => {
  return (
    <Routes>
      <Route
        path="login"
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
              SYSTEM_ROLE.STAFF,
            ]}
          >
            <ConnectedLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
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
    </Routes>
  );
};

export default ManagementRouter;
