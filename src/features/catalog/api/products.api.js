import { axiosClient } from "../../../config";
import { ENDPOINTS } from "../../../constants";

const CATALOG_PRODUCT_ENDPOINT = ENDPOINTS.MANAGEMENT.CATALOG.PRODUCTS;

const buildParams = (params = {}) => {
    return Object.fromEntries(
        Object.entries(params).filter(
            ([_, value]) =>
                value !== null &&
                value !== undefined &&
                value !== ""
        )
    );
};

export const getMyProductsByPage = (filters = {}, config = {}) => {
    const params = buildParams(filters);
    return axiosClient.get(`${CATALOG_PRODUCT_ENDPOINT}/page`, { params, ...config });
};

export const getMyProductsByCursor = (filters = {}, config = {}) => {
    const params = buildParams(filters);
    return axiosClient.get(`${CATALOG_PRODUCT_ENDPOINT}/cursor`, { params, ...config });
};