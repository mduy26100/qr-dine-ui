import { useCallback } from "react";
import { useDeleteTable } from "./useDeleteTable";
import { TABLE_MESSAGES } from "../constants";

export const useTableDeleteHandler = ({
  onShowConfirmModal,
  onOpenMessage,
  onRefetch,
}) => {
  const { remove: deleteTable } = useDeleteTable();

  const handleDelete = useCallback(
    (record) => {
      onShowConfirmModal({
        title: TABLE_MESSAGES.DELETE_CONFIRM_TITLE,
        message: TABLE_MESSAGES.DELETE_CONFIRM_MESSAGE(record.name),
        description: TABLE_MESSAGES.DELETE_CONFIRM_DESCRIPTION,
        onConfirm: () => {
          return new Promise((resolve, reject) => {
            deleteTable(record.id, {
              onSuccess: () => {
                onOpenMessage({
                  type: "success",
                  content: TABLE_MESSAGES.DELETE_SUCCESS(record.name),
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
                    TABLE_MESSAGES.DELETE_ERROR,
                });
                reject();
              },
            });
          });
        },
      });
    },
    [deleteTable, onShowConfirmModal, onOpenMessage, onRefetch],
  );

  return { handleDelete };
};
