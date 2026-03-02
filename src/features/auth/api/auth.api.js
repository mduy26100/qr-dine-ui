import { axiosClient } from "../../../infrastructure";
import { ENDPOINTS } from "../../../shared/constants";

export const loginAPI = async (data) => {
    const response = await axiosClient.post(`${ENDPOINTS.IDENTITY.LOGIN}`, {
        identifier: data.identifier,
        password: data.password
    });
    
    return response;
}