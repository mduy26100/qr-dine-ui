import { useState, useCallback, useEffect, useMemo } from "react";
import { useGetMyProductsByPage } from "./useGetMyProductsByPage";
import { PRODUCT_PAGINATION } from "../constants";

export const useProductTableMode = (filters = {}, enabled = true) => {
  const [tableState, setTableState] = useState({
    pageNumber: PRODUCT_PAGINATION.DEFAULT_PAGE,
    pageSize: PRODUCT_PAGINATION.DEFAULT_PAGE_SIZE,
  });

  useEffect(() => {
    setTableState((prev) => ({
      ...prev,
      pageNumber: PRODUCT_PAGINATION.DEFAULT_PAGE,
    }));
  }, [filters.searchTerm, filters.categoryId, filters.isAvailable]);

  const memoizedTableParams = useMemo(() => {
    const params = {
      pageNumber: tableState.pageNumber,
      pageSize: tableState.pageSize,
    };
    if (filters.searchTerm) params.searchTerm = filters.searchTerm;
    if (filters.categoryId) params.categoryId = filters.categoryId;
    if (filters.isAvailable !== undefined && filters.isAvailable !== "") {
      params.isAvailable = filters.isAvailable;
    }
    return params;
  }, [tableState.pageNumber, tableState.pageSize, filters]);

  const {
    data: pageResponse,
    isLoading,
    refetch,
  } = useGetMyProductsByPage(memoizedTableParams, {
    enabled,
  });

  const handleTableChange = useCallback((pagination) => {
    setTableState({
      pageNumber: pagination.current,
      pageSize: pagination.pageSize,
    });
  }, []);

  const safePageData = pageResponse?.items
    ? pageResponse
    : pageResponse?.data || {};
  const products = safePageData.items || [];
  const pagination = {
    current: safePageData.pageNumber || tableState.pageNumber,
    pageSize: safePageData.pageSize || tableState.pageSize,
    total: safePageData.totalCount || 0,
  };

  return {
    products,
    pagination,
    isLoading,
    handleTableChange,
    refetch,
  };
};
