import { useCallback } from "react";
import { useCreateProduct } from "./useCreateProduct";
import { useUpdateProduct } from "./useUpdateProduct";
import { PRODUCT_MESSAGES } from "../constants";

export const useProductUpsertHandler = ({
  onOpenMessage,
  onRefetchPage,
  onRefetchCursor,
  onCloseModal,
}) => {
  const { create: createProduct, isLoading: isCreating } = useCreateProduct();
  const { update: updateProduct, isLoading: isUpdating } = useUpdateProduct();

  const handleUpsert = useCallback(
    (payload, editingProduct) => {
      if (editingProduct) {
        updateProduct(
          { id: editingProduct.id, ...payload },
          {
            onSuccess: () => {
              onOpenMessage({
                type: "success",
                content: PRODUCT_MESSAGES.UPDATE_SUCCESS(payload.name),
              });
              onCloseModal();
              onRefetchPage();
              onRefetchCursor();
            },
            onError: (error) => {
              onOpenMessage({
                type: "error",
                content:
                  error?.error?.message ||
                  error?.message ||
                  PRODUCT_MESSAGES.ERROR_DEFAULT,
              });
            },
          },
        );
      } else {
        createProduct(payload, {
          onSuccess: () => {
            onOpenMessage({
              type: "success",
              content: PRODUCT_MESSAGES.CREATE_SUCCESS(payload.name),
            });
            onCloseModal();
            onRefetchPage();
            onRefetchCursor();
          },
          onError: (error) => {
            onOpenMessage({
              type: "error",
              content:
                error?.error?.message ||
                error?.message ||
                PRODUCT_MESSAGES.ERROR_DEFAULT,
            });
          },
        });
      }
    },
    [
      createProduct,
      updateProduct,
      onOpenMessage,
      onCloseModal,
      onRefetchPage,
      onRefetchCursor,
    ],
  );

  return {
    handleUpsert,
    isLoading: isCreating || isUpdating,
  };
};
