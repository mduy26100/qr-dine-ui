import React, { useCallback } from "react";
import { Button, Card, Typography, Space, message, Modal } from "antd";
import { PlusIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { ExclamationCircleFilled } from "@ant-design/icons";
import {
  UpsertCategoryModal,
  CategoryTable,
} from "../../../features/management/catalog/categories/components";
import { useCategoryPageController } from "../../../features/management/catalog/categories/hooks/useCategoryPageController";

const { Title, Text } = Typography;

const CategoryPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [modal, modalContextHolder] = Modal.useModal();

  const handleConfirmDelete = useCallback(
    ({ title, message: messageText, description, onConfirm }) => {
      modal.confirm({
        title,
        icon: <ExclamationCircleFilled />,
        content: (
          <div className="pt-2">
            <Text>{messageText}</Text>
            {description && (
              <>
                <br />
                <Text type="secondary" className="text-xs">
                  {description}
                </Text>
              </>
            )}
          </div>
        ),
        okText: "Xóa",
        okType: "danger",
        cancelText: "Hủy",
        centered: true,
        maskClosable: true,
        onOk: onConfirm,
      });
    },
    [modal],
  );

  const controller = useCategoryPageController({
    onOpenMessage: (config) => messageApi.open(config),
    onShowConfirmModal: handleConfirmDelete,
    onCloseModal: () => {},
  });

  const {
    isModalOpen,
    editingRecord,
    categories,
    isLoading,
    isUpsertLoading,
    handlers,
  } = controller;

  return (
    <div className="animate-fade-in space-y-6">
      {contextHolder}
      {modalContextHolder}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Title level={2} className="!mb-1">
            Danh mục thực đơn
          </Title>
          <Text type="secondary">
            Quản lý các nhóm món ăn và đồ uống của nhà hàng
          </Text>
        </div>
        <div className="flex justify-end">
          <Space size="small">
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
              Thêm danh mục
            </Button>
          </Space>
        </div>
      </div>

      <Card className="shadow-sm border-gray-100 rounded-2xl overflow-hidden">
        <CategoryTable
          data={categories}
          loading={isLoading}
          onEdit={handlers.handleOpenEdit}
          onDelete={handlers.handleDelete}
        />
      </Card>

      <UpsertCategoryModal
        open={isModalOpen}
        onCancel={handlers.handleCloseModal}
        onSubmit={handlers.handleUpsertSubmit}
        confirmLoading={isUpsertLoading}
        categoryList={categories}
        initialValues={editingRecord}
      />
    </div>
  );
};

export default CategoryPage;
