export const QUERY_KEYS = {
  CATALOG: {
    CATEGORIES: "catalog-categories",
    PRODUCTS: "catalog-products",
    TABLES: "catalog-tables",

    CATEGORY_DETAIL: (id) => `catalog-category-${id}`,
    MENU: (merchantId) => ["storefront", "menu", merchantId],

    TABLE_INFO: (merchantId, qrCodeToken) => [
      "storefront",
      "table-info",
      merchantId,
      qrCodeToken,
    ],
  },
  MANAGEMENT: {
    TABLES: "management-tables",
    STAFF: "management-staff",
  },
};
