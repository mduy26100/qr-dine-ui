import { axiosClient } from "../../../../infrastructure";
import { ENDPOINTS } from "../../../../shared/constants";

export const getTableInfo = (merchantId, qrCodeToken) => {
  return axiosClient.get(
    `${ENDPOINTS.STOREFRONT.CATALOG.TABLES(merchantId)}/info?qrCodeToken=${qrCodeToken}`,
  );
};
