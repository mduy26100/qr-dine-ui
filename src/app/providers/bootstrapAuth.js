import {
  getToken,
  getUser,
  setToken,
  isTokenExpired,
  getUserRoles,
} from "../../infrastructure";
import { tokenManager } from "../../infrastructure/http/tokenManager";
import { refreshTokenAPI } from "../../features/management/auth/api";
import { SYSTEM_ROLE } from "../../shared/constants";

const ALLOWED_ROLES = [
  SYSTEM_ROLE.SUPPER_ADMIN,
  SYSTEM_ROLE.MERCHANT,
  SYSTEM_ROLE.STAFF,
];

export const bootstrapAuth = async () => {
  const token = getToken();
  const savedUser = getUser();
  const roles = getUserRoles();

  const hasPermission = roles.some((role) => ALLOWED_ROLES.includes(role));

  if (token && savedUser && !isTokenExpired(token) && hasPermission) {
    return {
      isAuthenticated: true,
      user: savedUser,
      expiresInMinutes: 15,
    };
  }

  if (savedUser && !token && hasPermission) {
    try {
      const response = await refreshTokenAPI();
      const newToken = response?.data?.accessToken || response?.accessToken;
      const expiresInMinutes =
        response?.data?.expiresInMinutes || response?.expiresInMinutes || 15;

      if (newToken) {
        setToken(newToken, expiresInMinutes);

        return {
          isAuthenticated: true,
          user: savedUser,
          expiresInMinutes,
        };
      }
    } catch (error) {
      return {
        isAuthenticated: false,
        user: null,
        expiresInMinutes: null,
      };
    }
  }

  return {
    isAuthenticated: false,
    user: null,
    expiresInMinutes: null,
  };
};
