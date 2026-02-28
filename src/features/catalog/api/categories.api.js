import { axiosClient } from "../../../config";
import { ENDPOINTS } from "../../../constants";

const CATALOG_CATEGORY_ENDPOINT = ENDPOINTS.MANAGEMENT.CATALOG.CATEGORIES

export const getMyCategories = () => {
    return axiosClient.get(CATALOG_CATEGORY_ENDPOINT);
};

export const createCategory = (data) => {
    return axiosClient.post(CATALOG_CATEGORY_ENDPOINT, data);
};