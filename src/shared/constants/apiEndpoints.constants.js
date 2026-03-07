export const ENDPOINTS = {
  MANAGEMENT: {
    AUTH: {
      LOGIN: "/auth/login",
      LOGOUT: "/users/logout",
      REFRESH_TOKEN: "/auth/refresh-token",
      REGISTER_MERCHANT: "/users/register-merchant",
      REGISTER_STAFF: "/users/register-staff",
    },
    CATALOG: {
      CATEGORIES: "/management/categories",
      PRODUCTS: "/management/products",
      TABLES: "/management/tables",
    },
  },
  STOREFRONT: {
    CATALOG: {
      CATEGORIES: (merchantId) =>
        `/storefront/merchants/${merchantId}/categories`,
      PRODUCTS: (merchantId, categoryId) =>
        `/storefront/merchants/${merchantId}/products?categoryId=${categoryId}`,
      TABLES: (merchantId) => `/storefront/merchants/${merchantId}/tables`,
    },
  },
};
