import { useCallback } from "react";
import { useDeleteProduct } from "./useDeleteProduct";
import { PRODUCT_MESSAGES } from "../constants";

export const useProductDeleteHandler = ({
  onShowConfirmModal,
  onOpenMessage,
  onRefetchPage,
  onRefetchCursor,
}) => {
  const { remove: deleteProduct } = useDeleteProduct();

  const handleDelete = useCallback(
    (record) => {
      onShowConfirmModal({
        title: PRODUCT_MESSAGES.DELETE_CONFIRM_TITLE,
        message: PRODUCT_MESSAGES.DELETE_CONFIRM_MESSAGE(record.name),
        onConfirm: () => {
          return new Promise((resolve, reject) => {
            deleteProduct(record.id, {
              onSuccess: () => {
                onOpenMessage({
                  type: "success",
                  content: PRODUCT_MESSAGES.DELETE_SUCCESS(record.name),
                });
                onRefetchPage();
                onRefetchCursor();
                resolve();
              },
              onError: (error) => {
                onOpenMessage({
                  type: "error",
                  content:
                    error?.error?.message ||
                    error?.message ||
                    PRODUCT_MESSAGES.ERROR_DEFAULT,
                });
                reject();
              },
            });
          });
        },
      });
    },
    [
      deleteProduct,
      onShowConfirmModal,
      onOpenMessage,
      onRefetchPage,
      onRefetchCursor,
    ],
  );

  return { handleDelete };
};
