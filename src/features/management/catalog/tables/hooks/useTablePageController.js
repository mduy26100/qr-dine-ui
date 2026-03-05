import { useState, useCallback } from "react";
import { useGetMyTables } from "./useGetMyTables";

export const useTablePageController = ({
  onOpenMessage,
  onShowConfirmModal,
  onCloseModal,
}) => {
  const { data: responseData, isLoading, refetch } = useGetMyTables();
  const [editingRecord, setEditingRecord] = useState(null);

  const tables = responseData || [];

  const handleOpenCreate = useCallback(() => {
    setEditingRecord(null);
  }, []);

  const handleOpenEdit = useCallback((record) => {
    setEditingRecord(record);
  }, []);

  const handleViewQr = useCallback(
    (record) => {
      if (onOpenMessage) {
        onOpenMessage({
          type: "info",
          content: `Mã QR bàn ${record.name}`,
        });
      }
    },
    [onOpenMessage],
  );

  const handleDelete = useCallback(
    (record) => {
      onShowConfirmModal?.({
        title: "Xóa bàn",
        message: `Bạn có chắc chắn muốn xóa bàn "${record.name}"?`,
        description: "Hành động này không thể hoàn tác.",
        onConfirm: () => {
          return new Promise((resolve) => {
            resolve();
          });
        },
      });
    },
    [onShowConfirmModal],
  );

  return {
    editingRecord,
    tables,
    isLoading,
    handlers: {
      handleOpenCreate,
      handleOpenEdit,
      handleViewQr,
      handleDelete,
      handleRefetch: refetch,
    },
  };
};
