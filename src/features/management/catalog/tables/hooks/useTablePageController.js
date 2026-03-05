import { useState, useCallback } from "react";
import { useGetMyTables } from "./useGetMyTables";
import { useTableUpsertHandler } from "./useTableUpsertHandler";

export const useTablePageController = ({
  onOpenMessage,
  onShowConfirmModal,
  onCloseModal,
}) => {
  const { data: responseData, isLoading, refetch } = useGetMyTables();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const tables = responseData || [];

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingRecord(null);
    onCloseModal?.();
  }, [onCloseModal]);

  const upsertHandler = useTableUpsertHandler({
    onOpenMessage,
    onRefetch: refetch,
    onCloseModal: handleCloseModal,
  });

  const handleOpenCreate = useCallback(() => {
    setEditingRecord(null);
    setIsModalOpen(true);
  }, []);

  const handleOpenEdit = useCallback((record) => {
    setEditingRecord(record);
    setIsModalOpen(true);
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

  const handleUpsertSubmit = useCallback(
    (values) => {
      upsertHandler.handleUpsert(values);
    },
    [upsertHandler],
  );

  return {
    isModalOpen,
    editingRecord,
    tables,
    isLoading,
    isUpsertLoading: upsertHandler.isLoading,
    handlers: {
      handleOpenCreate,
      handleOpenEdit,
      handleViewQr,
      handleDelete,
      handleRefetch: refetch,
      handleCloseModal,
      handleUpsertSubmit,
    },
  };
};
