import { useState, useCallback, useEffect, useMemo } from "react";
import { useGetMyProductsByCursor } from "./useGetMyProductsByCursor";
import { PRODUCT_PAGINATION } from "../constants";

export const useProductListMode = (filters = {}, enabled = true) => {
  const [cursorState, setCursorState] = useState({
    limit: PRODUCT_PAGINATION.CURSOR_LIMIT,
    cursorCreatedAt: null,
    cursorId: null,
  });

  const [accumulatedList, setAccumulatedList] = useState([]);

  useEffect(() => {
    setCursorState({
      limit: PRODUCT_PAGINATION.CURSOR_LIMIT,
      cursorCreatedAt: null,
      cursorId: null,
    });
    setAccumulatedList([]);
  }, [filters.searchTerm, filters.categoryId, filters.isAvailable]);

  const memoizedCursorParams = useMemo(() => {
    const params = { limit: cursorState.limit };
    if (cursorState.cursorCreatedAt) {
      params.cursorCreatedAt = cursorState.cursorCreatedAt;
    }
    if (cursorState.cursorId) {
      params.cursorId = cursorState.cursorId;
    }
    if (filters.searchTerm) params.searchTerm = filters.searchTerm;
    if (filters.categoryId) params.categoryId = filters.categoryId;
    if (filters.isAvailable !== undefined && filters.isAvailable !== "") {
      params.isAvailable = filters.isAvailable;
    }
    return params;
  }, [
    cursorState.limit,
    cursorState.cursorCreatedAt,
    cursorState.cursorId,
    filters,
  ]);

  const {
    data: cursorResponse,
    isLoading,
    refetch,
  } = useGetMyProductsByCursor(memoizedCursorParams, {
    enabled,
  });

  useEffect(() => {
    if (!cursorResponse) return;
    const incomingData = cursorResponse.data || [];
    if (incomingData.length > 0) {
      setAccumulatedList((prev) => {
        if (!cursorState.cursorId) return incomingData;
        const newItems = incomingData.filter(
          (item) => !prev.some((p) => p.id === item.id),
        );
        return [...prev, ...newItems];
      });
    } else if (!cursorState.cursorId) {
      setAccumulatedList([]);
    }
  }, [cursorResponse, cursorState.cursorId]);

  const handleLoadMore = useCallback(() => {
    if (cursorResponse?.hasNextPage) {
      setCursorState({
        limit: PRODUCT_PAGINATION.CURSOR_LIMIT,
        cursorCreatedAt: cursorResponse.nextCursorCreatedAt,
        cursorId: cursorResponse.nextCursorId,
      });
    }
  }, [cursorResponse]);

  return {
    products: accumulatedList,
    isLoading,
    hasNextPage: cursorResponse?.hasNextPage,
    handleLoadMore,
    refetch,
  };
};
