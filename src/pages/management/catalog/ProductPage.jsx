import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  Button,
  Card,
  Typography,
  message,
  Modal,
  Segmented,
  Input,
  Select,
  TreeSelect,
  Divider,
} from "antd";
import {
  PlusIcon,
  ArrowPathIcon,
  TableCellsIcon,
  Squares2X2Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";

import ProductTable from "../../../features/management/catalog/products/components/ProductTable";
import ProductList from "../../../features/management/catalog/products/components/ProductList";
import UpsertProductModal from "../../../features/management/catalog/products/components/UpsertProductModal";

import { useGetMyProductsByPage } from "../../../features/management/catalog/products/hooks/useGetMyProductsByPage";
import { useGetMyProductsByCursor } from "../../../features/management/catalog/products/hooks/useGetMyProductsByCursor";
import { useCreateProduct } from "../../../features/management/catalog/products/hooks/useCreateProduct";
import { useUpdateProduct } from "../../../features/management/catalog/products/hooks/useUpdateProduct";
import { useGetMyCategories } from "../../../features/management/catalog/categories/hooks/useGetMyCategories";

const { Title, Text } = Typography;

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

export const ProductPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [modal, modalContextHolder] = Modal.useModal();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isUpsertModalOpen, setIsUpsertModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const { create: createProduct, isLoading: isCreating } = useCreateProduct();
  const { update: updateProduct, isLoading: isUpdating } = useUpdateProduct();

  const viewMode = searchParams.get("view") === "list" ? "list" : "table";
  const searchTermParam = searchParams.get("search") || "";
  const categoryIdParam = searchParams.get("category") || "";
  const isAvailableParam = searchParams.get("available") || "";

  const [searchInput, setSearchInput] = useState(searchTermParam);

  useEffect(() => {
    setSearchInput(searchTermParam);
  }, [searchTermParam]);

  const { data: categoriesResponse } = useGetMyCategories();
  const categoryTreeData = useMemo(() => {
    const cats = categoriesResponse?.data || categoriesResponse || [];
    return buildCategoryTreeData(Array.isArray(cats) ? cats : []);
  }, [categoriesResponse]);

  const handleViewModeChange = useCallback(
    (value) => {
      setSearchParams(
        (params) => {
          params.set("view", value);
          return params;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const handleSearchSubmit = useCallback(() => {
    const trimmed = searchInput.trim();
    setSearchParams(
      (params) => {
        if (trimmed) params.set("search", trimmed);
        else params.delete("search");
        return params;
      },
      { replace: true },
    );
  }, [searchInput, setSearchParams]);

  const handleCategoryChange = useCallback(
    (value) => {
      setSearchParams(
        (params) => {
          if (value) params.set("category", value);
          else params.delete("category");
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
          if (value !== "") params.set("available", value);
          else params.delete("available");
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
        params.delete("search");
        params.delete("category");
        params.delete("available");
        return params;
      },
      { replace: true },
    );
  }, [setSearchParams]);

  const hasActiveFilters =
    searchTermParam || categoryIdParam || isAvailableParam;

  const [tableState, setTableState] = useState({ pageNumber: 1, pageSize: 10 });
  useEffect(() => {
    setTableState((prev) => ({ ...prev, pageNumber: 1 }));
  }, [searchTermParam, categoryIdParam, isAvailableParam]);

  const memoizedTableParams = useMemo(() => {
    const params = {
      pageNumber: tableState.pageNumber,
      pageSize: tableState.pageSize,
    };
    if (searchTermParam) params.searchTerm = searchTermParam;
    if (categoryIdParam) params.categoryId = categoryIdParam;
    if (isAvailableParam !== "") params.isAvailable = isAvailableParam;
    return params;
  }, [
    tableState.pageNumber,
    tableState.pageSize,
    searchTermParam,
    categoryIdParam,
    isAvailableParam,
  ]);

  const {
    data: pageResponse,
    isLoading: isPageLoading,
    refetch: refetchPage,
  } = useGetMyProductsByPage(memoizedTableParams, {
    enabled: viewMode === "table",
  });

  const [cursorState, setCursorState] = useState({
    limit: 10,
    cursorCreatedAt: null,
    cursorId: null,
  });
  const [accumulatedList, setAccumulatedList] = useState([]);

  useEffect(() => {
    setCursorState({ limit: 10, cursorCreatedAt: null, cursorId: null });
    setAccumulatedList([]);
  }, [searchTermParam, categoryIdParam, isAvailableParam]);

  const memoizedCursorParams = useMemo(() => {
    const params = { limit: cursorState.limit };
    if (cursorState.cursorCreatedAt)
      params.cursorCreatedAt = cursorState.cursorCreatedAt;
    if (cursorState.cursorId) params.cursorId = cursorState.cursorId;
    if (searchTermParam) params.searchTerm = searchTermParam;
    if (categoryIdParam) params.categoryId = categoryIdParam;
    if (isAvailableParam !== "") params.isAvailable = isAvailableParam;
    return params;
  }, [
    cursorState.limit,
    cursorState.cursorCreatedAt,
    cursorState.cursorId,
    searchTermParam,
    categoryIdParam,
    isAvailableParam,
  ]);

  const {
    data: cursorResponse,
    isLoading: isCursorLoading,
    refetch: refetchCursor,
  } = useGetMyProductsByCursor(memoizedCursorParams, {
    enabled: viewMode === "list",
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

  const safePageData = pageResponse?.items
    ? pageResponse
    : pageResponse?.data || {};
  const tableProducts = safePageData.items || [];
  const tablePagination = {
    current: safePageData.pageNumber || tableState.pageNumber,
    pageSize: safePageData.pageSize || tableState.pageSize,
    total: safePageData.totalCount || 0,
  };

  const handleTableChange = useCallback((pagination) => {
    setTableState({
      pageNumber: pagination.current,
      pageSize: pagination.pageSize,
    });
  }, []);

  const handleLoadMore = useCallback(() => {
    if (cursorResponse?.hasNextPage) {
      setCursorState({
        limit: 10,
        cursorCreatedAt: cursorResponse.nextCursorCreatedAt,
        cursorId: cursorResponse.nextCursorId,
      });
    }
  }, [cursorResponse]);

  const handleRefetch = useCallback(() => {
    if (viewMode === "table") {
      refetchPage();
    } else {
      setCursorState({ limit: 10, cursorCreatedAt: null, cursorId: null });
      refetchCursor();
    }
  }, [viewMode, refetchPage, refetchCursor]);

  const handleOpenCreate = useCallback(() => {
    setEditingProduct(null);
    setIsUpsertModalOpen(true);
  }, []);

  const handleOpenEdit = useCallback((record) => {
    setEditingProduct(record);
    setIsUpsertModalOpen(true);
  }, []);

  const handleCloseUpsertModal = useCallback(() => {
    setIsUpsertModalOpen(false);
    setEditingProduct(null);
  }, []);

  const handleUpsertSubmit = useCallback(
    (payload, formInstance) => {
      if (editingProduct) {
        updateProduct(
          { id: editingProduct.id, ...payload },
          {
            onSuccess: () => {
              messageApi.open({
                type: "success",
                content: `Cập nhật sản phẩm "${payload.name}" thành công!`,
              });
              handleCloseUpsertModal();
              refetchPage();
              refetchCursor();
            },
            onError: (error) => {
              messageApi.open({
                type: "error",
                content:
                  error?.error?.message || error?.message || "Có lỗi xảy ra",
              });
            },
          },
        );
      } else {
        createProduct(payload, {
          onSuccess: () => {
            messageApi.open({
              type: "success",
              content: `Thêm sản phẩm "${payload.name}" thành công!`,
            });
            handleCloseUpsertModal();
            refetchPage();
            refetchCursor();
          },
          onError: (error) => {
            messageApi.open({
              type: "error",
              content:
                error?.error?.message || error?.message || "Có lỗi xảy ra",
            });
          },
        });
      }
    },
    [
      editingProduct,
      createProduct,
      updateProduct,
      messageApi,
      handleCloseUpsertModal,
      refetchPage,
      refetchCursor,
    ],
  );

  const handleDelete = useCallback(
    (record) => {
      modal.confirm({
        title: "Xóa sản phẩm",
        icon: <ExclamationCircleFilled />,
        content: (
          <div className="pt-2">
            <Text>Bạn có chắc chắn muốn xóa sản phẩm </Text>
            <Text strong>"{record.name}"</Text>?
          </div>
        ),
        okText: "Xóa",
        okType: "danger",
        cancelText: "Hủy",
        centered: true,
        onOk: async () => {
          messageApi.open({
            type: "info",
            content: "Tính năng xóa đang được phát triển",
          });
        },
      });
    },
    [modal, messageApi],
  );

  return (
    <div className="animate-fade-in space-y-6">
      {contextHolder}
      {modalContextHolder}

      <UpsertProductModal
        open={isUpsertModalOpen}
        onCancel={handleCloseUpsertModal}
        onSubmit={handleUpsertSubmit}
        confirmLoading={isCreating || isUpdating}
        categoryTreeData={categoryTreeData}
        initialValues={editingProduct}
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Title level={2} className="!mb-1">
            Danh sách sản phẩm
          </Title>
          <Text type="secondary">Quản lý món ăn, đồ uống và giá cả</Text>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-3">
          <Segmented
            options={[
              { value: "table", icon: <TableCellsIcon className="w-5 h-5" /> },
              { value: "list", icon: <Squares2X2Icon className="w-5 h-5" /> },
            ]}
            value={viewMode}
            onChange={handleViewModeChange}
            className="p-1 rounded-xl"
          />

          <Button
            icon={
              <ArrowPathIcon
                className={`w-4 h-4 ${isPageLoading || isCursorLoading ? "animate-spin" : ""}`}
              />
            }
            onClick={handleRefetch}
            className="flex items-center rounded-xl h-10"
          >
            Làm mới
          </Button>
          <Button
            type="primary"
            icon={<PlusIcon className="w-4 h-4" />}
            className="bg-blue-600 hover:!bg-blue-700 border-none h-10 rounded-xl flex items-center shadow-lg shadow-blue-100"
            onClick={handleOpenCreate}
          >
            Thêm sản phẩm
          </Button>
        </div>
      </div>

      <Card className="shadow-sm border-gray-100 rounded-2xl p-0 overflow-hidden">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 p-4 pb-0">
          <Input
            placeholder="Tìm kiếm sản phẩm..."
            prefix={<MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onPressEnter={handleSearchSubmit}
            allowClear
            className="md:max-w-xs rounded-lg"
            suffix={
              <Button
                type="text"
                size="small"
                className="flex items-center justify-center -mr-1 text-blue-600 hover:!text-blue-700"
                onClick={handleSearchSubmit}
              >
                Tìm
              </Button>
            }
          />
          <TreeSelect
            placeholder="Lọc theo danh mục"
            treeData={categoryTreeData}
            value={categoryIdParam || undefined}
            onChange={handleCategoryChange}
            allowClear
            treeDefaultExpandAll
            className="md:min-w-[200px] rounded-lg"
            popupClassName="rounded-lg"
          />
          <Select
            placeholder="Trạng thái"
            value={isAvailableParam || undefined}
            onChange={handleAvailableChange}
            allowClear
            onClear={() => handleAvailableChange("")}
            className="md:min-w-[140px] rounded-lg"
            options={[
              { value: "true", label: "Có sẵn" },
              { value: "false", label: "Hết hàng" },
            ]}
          />
          {hasActiveFilters && (
            <Button
              type="text"
              icon={<XMarkIcon className="w-4 h-4" />}
              onClick={handleResetFilters}
              className="flex items-center text-gray-500 hover:!text-red-500"
            >
              Thiết lập lại
            </Button>
          )}
        </div>
        <Divider className="!mb-0 !mt-3" />

        {viewMode === "table" ? (
          <ProductTable
            data={tableProducts}
            loading={isPageLoading}
            pagination={tablePagination}
            onChange={handleTableChange}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
          />
        ) : (
          <ProductList
            data={accumulatedList}
            loading={isCursorLoading}
            hasNextPage={cursorResponse?.hasNextPage}
            onLoadMore={handleLoadMore}
          />
        )}
      </Card>
    </div>
  );
};

export default ProductPage;
