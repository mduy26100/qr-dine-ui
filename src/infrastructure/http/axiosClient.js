import axios from "axios";
import { clearAuth, getToken } from "../storage";
import { tokenManager } from "./tokenManager";

const API_URL = import.meta.env.VITE_API_URL;

const axiosClient = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

const requestQueue = [];

const addRequestToQueue = (callback) => {
  return new Promise((resolve, reject) => {
    requestQueue.push({ callback, resolve, reject });
  });
};

const processQueue = () => {
  let request;
  while ((request = requestQueue.shift())) {
    try {
      request.resolve();
    } catch (error) {
      request.reject(error);
    }
  }
};

const refreshAccessToken = async () => {
  if (tokenManager.isTokenRefreshing()) {
    return addRequestToQueue(() => {});
  }

  tokenManager.setRefreshing(true);

  try {
    const response = await axiosClient.post("/auth/refresh-token");

    const newAccessToken = response?.accessToken;
    const expiresInMinutes = response?.expiresInMinutes || 15;

    tokenManager.setToken(newAccessToken, expiresInMinutes);

    tokenManager.notifyRefreshSubscribers(newAccessToken);

    processQueue();

    return newAccessToken;
  } catch (error) {
    tokenManager.setRefreshing(false);
    tokenManager.failRefreshSubscribers();
    clearAuth();

    if (
      !window.location.pathname.includes("login") &&
      !window.location.pathname.includes("auth") &&
      !window.location.pathname.includes("register")
    ) {
      window.location.href = "/management/login";
    }

    return Promise.reject(error);
  }
};

axiosClient.interceptors.response.use(
  (response) => {
    if (response.status === 204) {
      return null;
    }

    const apiResponse = response.data;

    if (apiResponse && apiResponse.error) {
      return Promise.reject(apiResponse);
    }

    return apiResponse.data ?? apiResponse;
  },
  async (error) => {
    if (error.code === "ECONNABORTED") {
      return Promise.reject({
        error: {
          type: "timeout",
          message:
            "Connection timed out. Please check your network or try again later.",
          details: null,
        },
        meta: { timestamp: new Date().toISOString() },
      });
    }

    if (error.response) {
      const apiResponse = error.response.data;

      if (error.response.status === 401) {
        const isAuthPage =
          window.location.pathname.includes("login") ||
          window.location.pathname.includes("auth") ||
          window.location.pathname.includes("register");

        if (isAuthPage) {
          return Promise.reject(apiResponse);
        }

        try {
          const originalRequest = error.config;

          if (originalRequest._retry) {
            clearAuth();
            window.location.href = "/management/login";
            return Promise.reject(apiResponse);
          }

          originalRequest._retry = true;

          if (tokenManager.isTokenRefreshing()) {
            return new Promise((resolve, reject) => {
              tokenManager.addRefreshSubscriber((newToken) => {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                resolve(axiosClient(originalRequest));
              });
            });
          } else {
            await refreshAccessToken();

            const newToken = tokenManager.getToken();
            originalRequest.headers.Authorization = `Bearer ${newToken}`;

            return axiosClient(originalRequest);
          }
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(apiResponse);
    }

    return Promise.reject({
      error: {
        type: "network-error",
        message:
          "Unable to connect to the server. Please check your internet connection.",
        details: null,
      },
      meta: { timestamp: new Date().toISOString() },
    });
  },
);

export default axiosClient;
