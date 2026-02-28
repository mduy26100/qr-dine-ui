import { axiosClient } from "../../../config";
import { ENDPOINTS } from "../../../constants";

const CATALOG_CATEGORY_ENDPOINT = ENDPOINTS.MANAGEMENT.CATAGLOG.CATEGORIES

export const getMyCategories = () => {
    return axiosClient.get(CATALOG_CATEGORY_ENDPOINT);
};