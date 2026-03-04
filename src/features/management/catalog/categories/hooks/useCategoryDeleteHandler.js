import { useCallback } from "react";
import { useDeleteCategory } from "./useDeleteCategory";
import { CATEGORY_MESSAGES } from "../constants";

export const useCategoryDeleteHandler = ({
  onShowConfirmModal,
  onOpenMessage,
  onRefetch,
}) => {
  const { remove: deleteCategory } = useDeleteCategory();

  const handleDelete = useCallback(
    (record) => {
      onShowConfirmModal({
        title: CATEGORY_MESSAGES.DELETE_CONFIRM_TITLE,
        message: CATEGORY_MESSAGES.DELETE_CONFIRM_MESSAGE(record.name),
        description: CATEGORY_MESSAGES.DELETE_CONFIRM_DESCRIPTION,
        onConfirm: () => {
          return new Promise((resolve, reject) => {
            deleteCategory(record.id, {
              onSuccess: () => {
                onOpenMessage({
                  type: "success",
                  content: CATEGORY_MESSAGES.DELETE_SUCCESS(record.name),
                });
                onRefetch();
                resolve();
              },
              onError: (error) => {
                onOpenMessage({
                  type: "error",
                  content:
                    error?.error?.message ||
                    error?.message ||
                    CATEGORY_MESSAGES.DELETE_ERROR,
                });
                reject();
              },
            });
          });
        },
      });
    },
    [deleteCategory, onShowConfirmModal, onOpenMessage, onRefetch],
  );

  return { handleDelete };
};
