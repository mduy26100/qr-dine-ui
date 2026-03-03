import { axiosClient } from "../../../../infrastructure";
import { ENDPOINTS } from "../../../../shared/constants";

export const loginAPI = async (data) => {
  const response = await axiosClient.post(
    `${ENDPOINTS.MANAGEMENT.AUTH.LOGIN}`,
    {
      identifier: data.identifier,
      password: data.password,
    },
  );

  return response;
};

export const logoutAPI = async () => {
  const response = await axiosClient.post(
    `${ENDPOINTS.MANAGEMENT.AUTH.LOGOUT}`,
  );

  return response;
};
