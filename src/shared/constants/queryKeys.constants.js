export const QUERY_KEYS = {
  CATALOG: {
    CATEGORIES: "catalog-categories",
    PRODUCTS: "catalog-products",
    TABLES: "catalog-tables",

    CATEGORY_DETAIL: (id) => `catalog-category-${id}`,
  },
  MANAGEMENT: {
    TABLES: "management-tables",
    STAFF: "management-staff",
  },
};
