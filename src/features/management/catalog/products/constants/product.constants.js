export const PRODUCT_VIEW_MODE = {
  TABLE: "table",
  LIST: "list",
};

export const PRODUCT_SEARCH_PARAMS = {
  VIEW: "view",
  SEARCH: "search",
  CATEGORY: "category",
  AVAILABLE: "available",
};

export const PRODUCT_PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  CURSOR_LIMIT: 10,
};

export const PRODUCT_MESSAGES = {
  CREATE_SUCCESS: (name) => `Thêm sản phẩm "${name}" thành công!`,
  UPDATE_SUCCESS: (name) => `Cập nhật sản phẩm "${name}" thành công!`,
  DELETE_SUCCESS: (name) => `Xóa sản phẩm "${name}" thành công!`,
  DELETE_CONFIRM_TITLE: "Xóa sản phẩm",
  DELETE_CONFIRM_MESSAGE: (name) =>
    `Bạn có chắc chắn muốn xóa sản phẩm "${name}"?`,
  DELETE_BTN: "Xóa",
  CANCEL_BTN: "Hủy",
  ERROR_DEFAULT: "Có lỗi xảy ra",
};

export const PRODUCT_STATUS = {
  AVAILABLE: "true",
  NOT_AVAILABLE: "false",
};

export const PRODUCT_STATUS_LABEL = {
  true: "Có sẵn",
  false: "Hết hàng",
};
