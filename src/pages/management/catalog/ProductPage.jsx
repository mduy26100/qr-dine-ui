import React, { useCallback } from "react";
import { Button, Card, Typography, message, Modal, Segmented } from "antd";
import {
  PlusIcon,
  ArrowPathIcon,
  TableCellsIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { ExclamationCircleFilled } from "@ant-design/icons";

import ProductTable from "../../../features/management/catalog/products/components/ProductTable";
import ProductList from "../../../features/management/catalog/products/components/ProductList";
import UpsertProductModal from "../../../features/management/catalog/products/components/UpsertProductModal";
import ProductFilters from "../../../features/management/catalog/products/components/ProductFilters";
import { useProductPageController } from "../../../features/management/catalog/products/hooks/useProductPageController";
import { PRODUCT_VIEW_MODE } from "../../../features/management/catalog/products/constants";

const { Title, Text } = Typography;

export const ProductPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [modal, modalContextHolder] = Modal.useModal();

  const handleConfirmDelete = useCallback(
    ({ title, message: messageText, onConfirm }) => {
      modal.confirm({
        title,
        icon: <ExclamationCircleFilled />,
        content: (
          <div className="pt-2">
            <Text>{messageText}</Text>
          </div>
        ),
        okText: "Xóa",
        okType: "danger",
        cancelText: "Hủy",
        centered: true,
        onOk: onConfirm,
      });
    },
    [modal],
  );

  const controller = useProductPageController({
    onOpenMessage: (config) => messageApi.open(config),
    onShowConfirmModal: handleConfirmDelete,
    onCloseModal: () => {},
  });

  const {
    viewMode,
    isUpsertModalOpen,
    editingProduct,
    searchInput,
    categoryIdParam,
    isAvailableParam,
    hasActiveFilters,
    categoryTreeData,
    displayMode,
    isUpsertLoading,
    handlers,
  } = controller;

  const isLoading = displayMode.isLoading;

  return (
    <div className="animate-fade-in space-y-6">
      {contextHolder}
      {modalContextHolder}

      <UpsertProductModal
        open={isUpsertModalOpen}
        onCancel={handlers.handleCloseUpsertModal}
        onSubmit={handlers.handleUpsertSubmit}
        confirmLoading={isUpsertLoading}
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
              {
                value: PRODUCT_VIEW_MODE.TABLE,
                icon: <TableCellsIcon className="w-5 h-5" />,
              },
              {
                value: PRODUCT_VIEW_MODE.LIST,
                icon: <Squares2X2Icon className="w-5 h-5" />,
              },
            ]}
            value={viewMode}
            onChange={handlers.handleViewModeChange}
            className="p-1 rounded-xl"
          />

          <Button
            icon={
              <ArrowPathIcon
                className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
              />
            }
            onClick={handlers.handleRefetch}
            className="flex items-center rounded-xl h-10"
          >
            Làm mới
          </Button>
          <Button
            type="primary"
            icon={<PlusIcon className="w-4 h-4" />}
            className="bg-blue-600 hover:!bg-blue-700 border-none h-10 rounded-xl flex items-center shadow-lg shadow-blue-100"
            onClick={handlers.handleOpenCreate}
          >
            Thêm sản phẩm
          </Button>
        </div>
      </div>

      <Card className="shadow-sm border-gray-100 rounded-2xl p-0 overflow-hidden">
        <ProductFilters
          searchInput={searchInput}
          onSearchInputChange={handlers.handleSearchInputChange}
          onSearchSubmit={handlers.handleSearchSubmit}
          categoryIdParam={categoryIdParam}
          onCategoryChange={handlers.handleCategoryChange}
          isAvailableParam={isAvailableParam}
          onAvailableChange={handlers.handleAvailableChange}
          onResetFilters={handlers.handleResetFilters}
          hasActiveFilters={hasActiveFilters}
          categoryTreeData={categoryTreeData}
        />

        {displayMode.type === PRODUCT_VIEW_MODE.TABLE ? (
          <ProductTable
            data={displayMode.data}
            loading={displayMode.isLoading}
            pagination={displayMode.pagination}
            onChange={displayMode.onChange}
            onEdit={handlers.handleOpenEdit}
            onDelete={handlers.handleDelete}
          />
        ) : (
          <ProductList
            data={displayMode.data}
            loading={displayMode.isLoading}
            hasNextPage={displayMode.hasNextPage}
            onLoadMore={displayMode.onLoadMore}
          />
        )}
      </Card>
    </div>
  );
};

export default ProductPage;
