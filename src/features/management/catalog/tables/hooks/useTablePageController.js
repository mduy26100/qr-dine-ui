import { useState, useCallback } from "react";
import { useGetMyTables } from "./useGetMyTables";
import { useTableUpsertHandler } from "./useTableUpsertHandler";
import { useTableDeleteHandler } from "./useTableDeleteHandler";

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

  const deleteHandler = useTableDeleteHandler({
    onShowConfirmModal,
    onOpenMessage,
    onRefetch: refetch,
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
      deleteHandler.handleDelete(record);
    },
    [deleteHandler],
  );

  const handleUpsertSubmit = useCallback(
    (values) => {
      upsertHandler.handleUpsert(values, editingRecord);
    },
    [editingRecord, upsertHandler],
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
