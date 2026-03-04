import { STORAGE_KEYS } from "./storage.constants";
import { tokenManager } from "../http/tokenManager";

/**
 * Token Management - In-Memory Storage
 * AccessToken is stored in memory only (not persistent)
 * RefreshToken is stored in HttpOnly cookie (managed by server)
 */

export const setToken = (token, expiresInMinutes = 15) => {
  tokenManager.setToken(token, expiresInMinutes);
};

export const getToken = () => {
  return tokenManager.getToken();
};

export const removeToken = () => {
  tokenManager.clearToken();
};

/**
 * User Management - LocalStorage
 * User info is stored in localStorage for persistence during session
 */

export const setUser = (user) => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem(STORAGE_KEYS.USER);
  if (!user) return null;

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
};

export const removeUser = () => {
  localStorage.removeItem(STORAGE_KEYS.USER);
};

export const clearAuth = () => {
  removeToken();
  removeUser();
  localStorage.removeItem(STORAGE_KEYS.HAS_LOGGED_IN);
};

export const setHasLoggedIn = () => {
  localStorage.setItem(STORAGE_KEYS.HAS_LOGGED_IN, "true");
};

export const hasLoggedInBefore = () => {
  return localStorage.getItem(STORAGE_KEYS.HAS_LOGGED_IN) === "true";
};
