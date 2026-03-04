import { useState, useCallback, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetMyCategories } from "../../categories/hooks/useGetMyCategories";
import { useProductTableMode } from "./useProductTableMode";
import { useProductListMode } from "./useProductListMode";
import { useProductUpsertHandler } from "./useProductUpsertHandler";
import { useProductDeleteHandler } from "./useProductDeleteHandler";
import { PRODUCT_VIEW_MODE, PRODUCT_SEARCH_PARAMS } from "../constants";

const buildCategoryTreeData = (categories = []) => {
  return categories.map((cat) => {
    const hasChildren = cat.children && cat.children.length > 0;
    const node = {
      title: cat.name,
      value: cat.id,
      key: cat.id,
      selectable: !hasChildren,
    };
    if (hasChildren) {
      node.children = cat.children.map((child) => ({
        title: child.name,
        value: child.id,
        key: child.id,
        selectable: !child.children || child.children.length === 0,
      }));
    }
    return node;
  });
};

export const useProductPageController = ({
  onOpenMessage,
  onShowConfirmModal,
  onCloseModal,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isUpsertModalOpen, setIsUpsertModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const viewMode =
    searchParams.get(PRODUCT_SEARCH_PARAMS.VIEW) === PRODUCT_VIEW_MODE.LIST
      ? PRODUCT_VIEW_MODE.LIST
      : PRODUCT_VIEW_MODE.TABLE;

  const searchTermParam = searchParams.get(PRODUCT_SEARCH_PARAMS.SEARCH) || "";
  const categoryIdParam =
    searchParams.get(PRODUCT_SEARCH_PARAMS.CATEGORY) || "";
  const isAvailableParam =
    searchParams.get(PRODUCT_SEARCH_PARAMS.AVAILABLE) || "";

  useEffect(() => {
    setSearchInput(searchTermParam);
  }, [searchTermParam]);

  const { data: categoriesResponse } = useGetMyCategories();
  const categoryTreeData = useMemo(() => {
    const cats = categoriesResponse?.data || categoriesResponse || [];
    return buildCategoryTreeData(Array.isArray(cats) ? cats : []);
  }, [categoriesResponse]);

  const filters = useMemo(
    () => ({
      searchTerm: searchTermParam,
      categoryId: categoryIdParam,
      isAvailable: isAvailableParam,
    }),
    [searchTermParam, categoryIdParam, isAvailableParam],
  );

  const tableMode = useProductTableMode(
    filters,
    viewMode === PRODUCT_VIEW_MODE.TABLE,
  );
  const listMode = useProductListMode(
    filters,
    viewMode === PRODUCT_VIEW_MODE.LIST,
  );

  const handleCloseUpsertModal = useCallback(() => {
    setIsUpsertModalOpen(false);
    setEditingProduct(null);
    onCloseModal?.();
  }, [onCloseModal]);

  const upsertHandler = useProductUpsertHandler({
    onOpenMessage,
    onRefetchPage: tableMode.refetch,
    onRefetchCursor: listMode.refetch,
    onCloseModal: handleCloseUpsertModal,
  });

  const deleteHandler = useProductDeleteHandler({
    onShowConfirmModal,
    onOpenMessage,
    onRefetchPage: tableMode.refetch,
    onRefetchCursor: listMode.refetch,
  });

  const handleViewModeChange = useCallback(
    (value) => {
      setSearchParams(
        (params) => {
          params.set(PRODUCT_SEARCH_PARAMS.VIEW, value);
          return params;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const handleSearchInputChange = useCallback((value) => {
    setSearchInput(value);
  }, []);

  const handleSearchSubmit = useCallback(() => {
    const trimmed = searchInput.trim();
    setSearchParams(
      (params) => {
        if (trimmed) params.set(PRODUCT_SEARCH_PARAMS.SEARCH, trimmed);
        else params.delete(PRODUCT_SEARCH_PARAMS.SEARCH);
        return params;
      },
      { replace: true },
    );
  }, [searchInput, setSearchParams]);

  const handleCategoryChange = useCallback(
    (value) => {
      setSearchParams(
        (params) => {
          if (value) params.set(PRODUCT_SEARCH_PARAMS.CATEGORY, value);
          else params.delete(PRODUCT_SEARCH_PARAMS.CATEGORY);
          return params;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const handleAvailableChange = useCallback(
    (value) => {
      setSearchParams(
        (params) => {
          if (value !== "") params.set(PRODUCT_SEARCH_PARAMS.AVAILABLE, value);
          else params.delete(PRODUCT_SEARCH_PARAMS.AVAILABLE);
          return params;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const handleResetFilters = useCallback(() => {
    setSearchInput("");
    setSearchParams(
      (params) => {
        params.delete(PRODUCT_SEARCH_PARAMS.SEARCH);
        params.delete(PRODUCT_SEARCH_PARAMS.CATEGORY);
        params.delete(PRODUCT_SEARCH_PARAMS.AVAILABLE);
        return params;
      },
      { replace: true },
    );
  }, [setSearchParams]);

  const hasActiveFilters =
    searchTermParam || categoryIdParam || isAvailableParam;

  const handleOpenCreate = useCallback(() => {
    setEditingProduct(null);
    setIsUpsertModalOpen(true);
  }, []);

  const handleOpenEdit = useCallback((record) => {
    setEditingProduct(record);
    setIsUpsertModalOpen(true);
  }, []);

  const handleRefetch = useCallback(() => {
    if (viewMode === PRODUCT_VIEW_MODE.TABLE) {
      tableMode.refetch();
    } else {
      listMode.refetch();
    }
  }, [viewMode, tableMode, listMode]);

  const handleUpsertSubmit = useCallback(
    (payload) => {
      upsertHandler.handleUpsert(payload, editingProduct);
    },
    [editingProduct, upsertHandler],
  );

  const getDisplayMode = () => {
    if (viewMode === PRODUCT_VIEW_MODE.TABLE) {
      return {
        type: "table",
        data: tableMode.products,
        isLoading: tableMode.isLoading,
        pagination: tableMode.pagination,
        onChange: tableMode.handleTableChange,
      };
    }
    return {
      type: "list",
      data: listMode.products,
      isLoading: listMode.isLoading,
      hasNextPage: listMode.hasNextPage,
      onLoadMore: listMode.handleLoadMore,
    };
  };

  return {
    viewMode,
    isUpsertModalOpen,
    editingProduct,
    searchInput,
    searchTermParam,
    categoryIdParam,
    isAvailableParam,
    hasActiveFilters,
    categoryTreeData,
    displayMode: getDisplayMode(),
    isUpsertLoading: upsertHandler.isLoading,
    handlers: {
      handleViewModeChange,
      handleSearchInputChange,
      handleSearchSubmit,
      handleCategoryChange,
      handleAvailableChange,
      handleResetFilters,
      handleOpenCreate,
      handleOpenEdit,
      handleCloseUpsertModal,
      handleRefetch,
      handleUpsertSubmit,
      handleDelete: deleteHandler.handleDelete,
    },
  };
};
