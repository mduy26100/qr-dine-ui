import { useCallback } from "react";
import { useCreateTable } from "./useCreateTable";
import { useUpdateTable } from "./useUpdateTable";
import { TABLE_MESSAGES } from "../constants";

export const useTableUpsertHandler = ({
  onOpenMessage,
  onRefetch,
  onCloseModal,
}) => {
  const { create: createTable, isLoading: isCreating } = useCreateTable();
  const { update: updateTable, isUpdating } = useUpdateTable();

  const handleUpsert = useCallback(
    (values, editingRecord) => {
      const isEdit = !!editingRecord;
      const action = isEdit ? updateTable : createTable;
      const payload = isEdit ? { id: editingRecord.id, ...values } : values;

      action(payload, {
        onSuccess: () => {
          const message = isEdit
            ? TABLE_MESSAGES.UPDATE_SUCCESS(values.name)
            : TABLE_MESSAGES.CREATE_SUCCESS(values.name);

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
              TABLE_MESSAGES.ERROR_DEFAULT,
          });
        },
      });
    },
    [createTable, updateTable, onOpenMessage, onCloseModal, onRefetch],
  );

  return {
    handleUpsert,
    isLoading: isCreating || isUpdating,
  };
};
