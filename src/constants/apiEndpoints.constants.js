export const ENDPOINTS = {
    IDENTITY: {
        LOGIN: "/auth/login",
        REGISTER_MERCHANT: "/users/register-merchant",
        REGISTER_STAFF: "/users/register-staff"
    },
    MANAGEMENT: {
        CATAGLOG: {
            CATEGORIES: "/management/categories",
            PRODUCTS: "/management/products",
            TABLES: "/management/tables"
        }
    },
    STOREFRONT: {
        CATALOG: {
            CATEGORIRES: (merchantId) => `/storefront/merchants/${merchantId}/categories`,
            PRODUCTS: (merchantId, categoryId) => `/storefront/merchants/${merchantId}/products?categoryId=${categoryId}`
        }
    }
};