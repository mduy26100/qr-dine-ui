import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  setToken,
  setUser as setStorageUser,
  clearAuth,
  clearGlobalCache,
} from "../../infrastructure";
import { tokenManager } from "../../infrastructure/http/tokenManager";
import { refreshTokenAPI } from "../../features/management/auth/api";
import { bootstrapAuth } from "./bootstrapAuth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setCurrentUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const refreshIntervalRef = useRef(null);

  useEffect(() => {
    const initAuth = async () => {
      const result = await bootstrapAuth();

      if (result.isAuthenticated && result.user) {
        setCurrentUser(result.user);
        setupAutoRefresh(result.expiresInMinutes);
      } else {
        handleLogout();
      }

      setIsInitialized(true);
    };

    initAuth();
  }, []);

  const setupAutoRefresh = (expiresInMinutes) => {
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
    }

    const refreshBeforeExpiry = 1;
    const refreshInterval =
      (expiresInMinutes - refreshBeforeExpiry) * 60 * 1000;

    const safeInterval = Math.max(refreshInterval, 30 * 1000);

    refreshIntervalRef.current = setInterval(async () => {
      if (!tokenManager.hasToken()) {
        clearInterval(refreshIntervalRef.current);
        return;
      }

      try {
        const response = await refreshTokenAPI();
        const newToken = response?.data?.accessToken || response?.accessToken;
        const newExpiresInMinutes =
          response?.data?.expiresInMinutes || response?.expiresInMinutes || 15;

        if (newToken) {
          tokenManager.setToken(newToken, newExpiresInMinutes);
          setupAutoRefresh(newExpiresInMinutes);
        }
      } catch (error) {
        clearInterval(refreshIntervalRef.current);
      }
    }, safeInterval);
  };

  const clearAutoRefresh = () => {
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
      refreshIntervalRef.current = null;
    }
  };

  const handleLogin = (accessToken, userPayload, expiresInMinutes = 15) => {
    setToken(accessToken, expiresInMinutes);
    setStorageUser(userPayload);
    setCurrentUser(userPayload);
    setupAutoRefresh(expiresInMinutes);
  };

  const handleLogout = () => {
    clearGlobalCache();
    clearAuth();
    tokenManager.clearToken();
    setCurrentUser(null);
    clearAutoRefresh();
  };

  useEffect(() => {
    return () => {
      clearAutoRefresh();
    };
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isInitialized,
      login: handleLogin,
      logout: handleLogout,
      hasRole: (roleName) => user?.roles?.includes(roleName) || false,
    }),
    [user, isInitialized],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
