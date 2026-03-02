import { axiosClient } from "../../../infrastructure";
import { ENDPOINTS } from "../../../shared/constants";

const CATALOG_CATEGORY_ENDPOINT = ENDPOINTS.MANAGEMENT.CATALOG.CATEGORIES

export const getMyCategories = () => {
    return axiosClient.get(CATALOG_CATEGORY_ENDPOINT);
};

export const createCategory = (data) => {
    return axiosClient.post(CATALOG_CATEGORY_ENDPOINT, data);
};

export const updateCategory = ({ id, ...data }) => {
    return axiosClient.put(`${CATALOG_CATEGORY_ENDPOINT}/${id}`, data);
};

export const deleteCategory = (id) => {
    return axiosClient.delete(`${CATALOG_CATEGORY_ENDPOINT}/${id}`);
};