import { useCallback } from "react";
import { useCreateCategory } from "./useCreateCategory";
import { useUpdateCategory } from "./useUpdateCategory";
import { CATEGORY_MESSAGES, CATEGORY_MODAL } from "../constants";

export const useCategoryUpsertHandler = ({
  onOpenMessage,
  onRefetch,
  onCloseModal,
}) => {
  const { create: createCategory, isLoading: isCreating } = useCreateCategory();
  const { update: updateCategory, isUpdating } = useUpdateCategory();

  const handleUpsert = useCallback(
    (values, editingRecord) => {
      const isEdit = !!editingRecord;
      const action = isEdit ? updateCategory : createCategory;
      const payload = isEdit ? { id: editingRecord.id, ...values } : values;

      action(payload, {
        onSuccess: () => {
          const actionType = isEdit
            ? CATEGORY_MESSAGES.ACTION_UPDATE
            : CATEGORY_MESSAGES.ACTION_CREATE;
          const message = isEdit
            ? CATEGORY_MESSAGES.UPDATE_SUCCESS(values.name)
            : CATEGORY_MESSAGES.CREATE_SUCCESS(values.name);

          onOpenMessage({
            type: "success",
            content: message,
          });
          onCloseModal();
          onRefetch();
        },
        onError: (error) => {
          onOpenMessage({
            type: "error",
            content:
              error?.error?.message ||
              error?.message ||
              CATEGORY_MESSAGES.ERROR_DEFAULT,
          });
        },
      });
    },
    [createCategory, updateCategory, onOpenMessage, onCloseModal, onRefetch],
  );

  return {
    handleUpsert,
    isLoading: isCreating || isUpdating,
  };
};
