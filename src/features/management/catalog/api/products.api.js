import { axiosClient } from "../../../../infrastructure";
import { ENDPOINTS } from "../../../../shared/constants";

const CATALOG_PRODUCT_ENDPOINT = ENDPOINTS.MANAGEMENT.CATALOG.PRODUCTS;

const buildParams = (params = {}) => {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) => value !== null && value !== undefined && value !== "",
    ),
  );
};

export const getMyProductsByPage = (filters = {}, config = {}) => {
  const params = buildParams(filters);
  return axiosClient.get(`${CATALOG_PRODUCT_ENDPOINT}/page`, {
    params,
    ...config,
  });
};

export const getMyProductsByCursor = (filters = {}, config = {}) => {
  const params = buildParams(filters);
  return axiosClient.get(`${CATALOG_PRODUCT_ENDPOINT}/cursor`, {
    params,
    ...config,
  });
};

export const createProduct = (data) => {
  const formData = new FormData();

  formData.append("Name", data.name?.trim() || "");
  formData.append("Description", data.description?.trim() || "");
  formData.append("Price", data.price);
  formData.append("IsAvailable", data.isAvailable);
  formData.append("CategoryId", data.categoryId);
  formData.append("ImageFile", data.imageFile);

  return axiosClient.post(CATALOG_PRODUCT_ENDPOINT, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateProduct = ({ id, ...data }) => {
  const formData = new FormData();
  formData.append("Name", data.name?.trim() || "");
  formData.append("Description", data.description?.trim() || "");
  formData.append("Price", data.price);
  formData.append("IsAvailable", data.isAvailable);
  formData.append("CategoryId", data.categoryId);
  formData.append("ImageFile", data.imageFile);

  return axiosClient.put(`${CATALOG_PRODUCT_ENDPOINT}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteProduct = (id) => {
  return axiosClient.delete(`${CATALOG_PRODUCT_ENDPOINT}/${id}`);
};
