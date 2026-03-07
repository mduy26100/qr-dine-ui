import React, { createContext, useCallback, useMemo, useState } from "react";
import { STORAGE_KEYS } from "../../infrastructure/storage/storage.constants";

const StorefrontTableContext = createContext(null);

export { StorefrontTableContext };

export const StorefrontTableProvider = ({ children }) => {
  const [tableInfo, setTableInfo] = useState({
    sessionId: null,
    tableId: null,
    tableName: null,
    merchantId: null,
    merchantName: null,
    merchantAddress: null,
    merchantLogoUrl: null,
    isOccupied: false,
  });

  const setSessionInfo = useCallback((info) => {
    const {
      sessionId,
      tableId,
      tableName,
      merchantId,
      merchantName,
      merchantAddress,
      merchantLogoUrl,
      isOccupied,
    } = info;

    setTableInfo({
      sessionId,
      tableId,
      tableName,
      merchantId,
      merchantName,
      merchantAddress,
      merchantLogoUrl,
      isOccupied,
    });

    if (sessionId) {
      localStorage.setItem(STORAGE_KEYS.STOREFRONT_SESSION_ID, sessionId);
    } else {
      localStorage.removeItem(STORAGE_KEYS.STOREFRONT_SESSION_ID);
    }
  }, []);

  const clearSessionInfo = useCallback(() => {
    setTableInfo({
      sessionId: null,
      tableId: null,
      tableName: null,
      merchantId: null,
      merchantName: null,
      merchantAddress: null,
      merchantLogoUrl: null,
      isOccupied: false,
    });
    localStorage.removeItem(STORAGE_KEYS.STOREFRONT_SESSION_ID);
  }, []);

  const value = useMemo(
    () => ({
      ...tableInfo,
      setSessionInfo,
      clearSessionInfo,
    }),
    [tableInfo, setSessionInfo, clearSessionInfo],
  );

  return (
    <StorefrontTableContext.Provider value={value}>
      {children}
    </StorefrontTableContext.Provider>
  );
};
