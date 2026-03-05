import { axiosClient } from "../../../../infrastructure";
import { ENDPOINTS } from "../../../../shared/constants";

const CATALOG_TABLE_ENDPOINT = ENDPOINTS.MANAGEMENT.CATALOG.TABLES;

export const getMyTables = () => {
  return axiosClient.get(CATALOG_TABLE_ENDPOINT);
};
