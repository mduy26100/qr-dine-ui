import { axiosClient } from "../../../../infrastructure";
import { ENDPOINTS } from "../../../../shared/constants";

export const getMenu = (merchantId) => {
  return axiosClient.get(
    `${ENDPOINTS.STOREFRONT.CATALOG.CATEGORIES(merchantId)}/menu`,
  );
};
