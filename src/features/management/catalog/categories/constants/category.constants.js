export const CATEGORY_MESSAGES = {
  CREATE_SUCCESS: (name) => `Thêm danh mục "${name}" thành công`,
  UPDATE_SUCCESS: (name) => `Cập nhật danh mục "${name}" thành công`,
  DELETE_SUCCESS: (name) => `Đã xóa danh mục "${name}"`,
  DELETE_CONFIRM_TITLE: "Xóa danh mục",
  DELETE_CONFIRM_MESSAGE: (name) =>
    `Bạn có chắc chắn muốn xóa danh mục "${name}"?`,
  DELETE_CONFIRM_DESCRIPTION: "Hành động này không thể hoàn tác.",
  DELETE_BTN: "Xóa",
  CANCEL_BTN: "Hủy",
  ERROR_DEFAULT: "Có lỗi xảy ra",
  DELETE_ERROR: "Không thể xóa danh mục này",
  ACTION_CREATE: "Thêm",
  ACTION_UPDATE: "Cập nhật",
};

export const CATEGORY_MODAL = {
  DEFAULT_DISPLAY_ORDER: 1,
  DEFAULT_IS_ACTIVE: true,
};
