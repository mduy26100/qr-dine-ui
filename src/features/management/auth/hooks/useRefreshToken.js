import { useCallback } from "react";
import { refreshTokenAPI } from "../api";
import { tokenManager } from "../../../../infrastructure/http/tokenManager";

export const useRefreshToken = () => {
  const refreshToken = useCallback(async () => {
    const existingPromise = tokenManager.getRefreshPromise();
    if (existingPromise) {
      return existingPromise;
    }

    const refreshPromise = (async () => {
      try {
        const response = await refreshTokenAPI();
        return {
          accessToken: response?.accessToken,
          expiresInMinutes: response?.expiresInMinutes || 15,
        };
      } finally {
        tokenManager.clearRefreshPromise();
      }
    })();

    tokenManager.setRefreshPromise(refreshPromise);

    return refreshPromise;
  }, []);

  return { refreshToken };
};
