import { useState, useCallback } from "react";
import { useGetMyCategories } from "./useGetMyCategories";
import { useCategoryUpsertHandler } from "./useCategoryUpsertHandler";
import { useCategoryDeleteHandler } from "./useCategoryDeleteHandler";

export const useCategoryPageController = ({
  onOpenMessage,
  onShowConfirmModal,
  onCloseModal,
}) => {
  const { data: responseData, isLoading, refetch } = useGetMyCategories();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const categories = responseData || [];

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingRecord(null);
    onCloseModal?.();
  }, [onCloseModal]);

  const upsertHandler = useCategoryUpsertHandler({
    onOpenMessage,
    onRefetch: refetch,
    onCloseModal: handleCloseModal,
  });

  const deleteHandler = useCategoryDeleteHandler({
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

  const handleUpsertSubmit = useCallback(
    (values) => {
      upsertHandler.handleUpsert(values, editingRecord);
    },
    [editingRecord, upsertHandler],
  );

  return {
    isModalOpen,
    editingRecord,
    categories,
    isLoading,
    isUpsertLoading: upsertHandler.isLoading,
    handlers: {
      handleOpenCreate,
      handleOpenEdit,
      handleCloseModal,
      handleUpsertSubmit,
      handleDelete: deleteHandler.handleDelete,
      handleRefetch: refetch,
    },
  };
};
