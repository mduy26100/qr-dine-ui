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
  getUser,
  clearAuth,
  clearGlobalCache,
  setHasLoggedIn,
  hasLoggedInBefore,
} from "../../infrastructure";
import { tokenManager } from "../../infrastructure/http/tokenManager";
import { useRefreshToken } from "../../features/management/auth/hooks";
import { AUTH_STATUS, TOKEN_REFRESH_CONFIG } from "../../shared/constants";
const AuthContext = createContext(null);
export { AuthContext };
export const AuthProvider = ({ children }) => {
  const [user, setCurrentUser] = useState(null);
  const [authStatus, setAuthStatus] = useState(AUTH_STATUS.CHECKING);
  const refreshIntervalRef = useRef(null);
  const { refreshToken } = useRefreshToken();
  const clearAutoRefresh = () => {
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
      refreshIntervalRef.current = null;
    }
  };
  const setupAutoRefresh = (expiresInMinutes) => {
    if (!tokenManager.hasToken()) {
      return;
    }

    clearAutoRefresh();

    const refreshInterval =
      expiresInMinutes *
      (1 - TOKEN_REFRESH_CONFIG.REFRESH_BEFORE_EXPIRY_PERCENTAGE) *
      60 *
      1000;
    const safeInterval = Math.max(refreshInterval, 30 * 1000);

    refreshIntervalRef.current = setInterval(async () => {
      if (!tokenManager.hasToken()) {
        clearAutoRefresh();
        return;
      }
      try {
        const tokenData = await refreshToken();
        if (tokenData?.accessToken) {
          setToken(tokenData.accessToken, tokenData.expiresInMinutes);
          const newRefreshInterval =
            tokenData.expiresInMinutes *
            (1 - TOKEN_REFRESH_CONFIG.REFRESH_BEFORE_EXPIRY_PERCENTAGE) *
            60 *
            1000;
          const newSafeInterval = Math.max(newRefreshInterval, 30 * 1000);

          clearAutoRefresh();
          if (newSafeInterval > 0) {
            setTimeout(() => {
              setupAutoRefresh(tokenData.expiresInMinutes);
            }, 0);
          }
        }
      } catch (error) {
        clearAutoRefresh();
      }
    }, safeInterval);
  };
  const handleLogout = () => {
    clearGlobalCache();
    clearAuth();
    tokenManager.clearToken();
    setCurrentUser(null);
    setAuthStatus(AUTH_STATUS.UNAUTHENTICATED);
    clearAutoRefresh();
  };
  const handleLogin = (accessToken, userPayload, expiresInMinutes = 15) => {
    setHasLoggedIn();
    setToken(accessToken, expiresInMinutes);
    setStorageUser(userPayload);
    setCurrentUser(userPayload);
    setAuthStatus(AUTH_STATUS.AUTHENTICATED);
    setupAutoRefresh(expiresInMinutes);
  };
  useEffect(() => {
    const initAuth = async () => {
      if (!hasLoggedInBefore()) {
        setAuthStatus(AUTH_STATUS.UNAUTHENTICATED);
        return;
      }

      try {
        const tokenData = await refreshToken();
        if (tokenData?.accessToken) {
          setToken(tokenData.accessToken, tokenData.expiresInMinutes);
          setupAutoRefresh(tokenData.expiresInMinutes);

          const savedUser = getUser();
          if (savedUser) {
            setCurrentUser(savedUser);
          }

          setAuthStatus(AUTH_STATUS.AUTHENTICATED);
        } else {
          setAuthStatus(AUTH_STATUS.UNAUTHENTICATED);
          clearGlobalCache();
          clearAuth();
          tokenManager.clearToken();
          setCurrentUser(null);
        }
      } catch (error) {
        setAuthStatus(AUTH_STATUS.UNAUTHENTICATED);
        clearGlobalCache();
        clearAuth();
        tokenManager.clearToken();
        setCurrentUser(null);
      }
    };
    initAuth();
  }, [refreshToken]);
  useEffect(() => {
    return () => {
      clearAutoRefresh();
    };
  }, []);
  const value = useMemo(
    () => ({
      user,
      authStatus,
      isAuthenticated: authStatus === "authenticated",
      login: handleLogin,
      logout: handleLogout,
      hasRole: (roleName) => user?.roles?.includes(roleName) || false,
    }),
    [user, authStatus],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
