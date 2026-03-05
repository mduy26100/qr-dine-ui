import { axiosClient } from "../../../../infrastructure";
import { ENDPOINTS } from "../../../../shared/constants";

const CATALOG_TABLE_ENDPOINT = ENDPOINTS.MANAGEMENT.CATALOG.TABLES;

export const getMyTables = () => {
  return axiosClient.get(CATALOG_TABLE_ENDPOINT);
};

export const createTable = (data) => {
  return axiosClient.post(CATALOG_TABLE_ENDPOINT, data);
};

export const updateTable = ({ id, ...data }) => {
  return axiosClient.put(`${CATALOG_TABLE_ENDPOINT}/${id}`, data);
};

export const deleteTable = (id) => {
  return axiosClient.delete(`${CATALOG_TABLE_ENDPOINT}/${id}`);
};
