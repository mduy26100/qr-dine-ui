import React from "react";
import { Routes, Route } from "react-router-dom";
import { StorefrontLayout } from "../../shared/layouts";
import { HomePage, ErrorPage, TableInfoPage, MenuPage } from "../../pages";

const StorefrontRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<StorefrontLayout />}>
        <Route index element={<HomePage />} />
      </Route>

      <Route
        path="storefront/:merchantId/table/:qrCodeToken"
        element={<TableInfoPage />}
      />

      <Route
        path="storefront/:merchantId/table/:qrCodeToken/menu"
        element={<MenuPage />}
      />

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default StorefrontRouter;
