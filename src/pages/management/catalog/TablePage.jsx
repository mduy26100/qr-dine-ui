import React, { useCallback, useMemo } from "react";
import {
  Button,
  Card,
  Typography,
  Space,
  message,
  Modal,
  Spin,
  Empty,
} from "antd";
import { PlusIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { ExclamationCircleFilled } from "@ant-design/icons";
import TableCard from "../../../features/management/catalog/tables/components/TableCard";
import UpsertTableModal from "../../../features/management/catalog/tables/components/UpsertTableModal";
import { useTablePageController } from "../../../features/management/catalog/tables/hooks/useTablePageController";
import { useAuth } from "../../../app/providers";
import { SYSTEM_ROLE } from "../../../shared/constants";

const { Title, Text } = Typography;

const TablePage = () => {
  const { user } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();
  const [modal, modalContextHolder] = Modal.useModal();

  const hasManagePermission = useMemo(() => {
    if (!user?.roles) return false;
    return (
      user.roles.includes(SYSTEM_ROLE.MERCHANT) ||
      user.roles.includes(SYSTEM_ROLE.SUPPER_ADMIN)
    );
  }, [user?.roles]);

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

  const controller = useTablePageController({
    onOpenMessage: (config) => messageApi.open(config),
    onShowConfirmModal: handleConfirmDelete,
    onCloseModal: () => {},
  });

  const {
    isModalOpen,
    editingRecord,
    tables,
    isLoading,
    isUpsertLoading,
    handlers,
  } = controller;

  return (
    <div className="animate-fade-in space-y-6">
      {contextHolder}
      {modalContextHolder}

      <UpsertTableModal
        open={isModalOpen}
        onCancel={handlers.handleCloseModal}
        onSubmit={handlers.handleUpsertSubmit}
        confirmLoading={isUpsertLoading}
        initialValues={editingRecord}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Title level={2} className="!mb-1">
            Quản lý bàn
          </Title>
          <Text type="secondary">Quản lý bàn phục vụ và trạng thái bàn</Text>
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
            {hasManagePermission && (
              <Button
                type="primary"
                icon={<PlusIcon className="w-4 h-4" />}
                className="bg-blue-600 hover:!bg-blue-700 border-none h-10 rounded-xl flex items-center shadow-lg shadow-blue-100"
                onClick={handlers.handleOpenCreate}
              >
                Thêm bàn
              </Button>
            )}
          </Space>
        </div>
      </div>

      <Card className="shadow-sm border-gray-100 rounded-2xl overflow-hidden">
        <Spin spinning={isLoading}>
          {tables && tables.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {tables.map((table) => (
                <TableCard
                  key={table.id}
                  item={table}
                  hasManagePermission={hasManagePermission}
                  onEdit={handlers.handleOpenEdit}
                  onDelete={handlers.handleDelete}
                  onViewQr={handlers.handleViewQr}
                />
              ))}
            </div>
          ) : (
            <Empty
              description="Không có bàn nào"
              style={{ padding: "40px 0" }}
            />
          )}
        </Spin>
      </Card>
    </div>
  );
};

export default TablePage;
