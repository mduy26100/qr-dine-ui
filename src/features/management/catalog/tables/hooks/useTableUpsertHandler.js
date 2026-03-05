import { useCallback } from "react";
import { useCreateTable } from "./useCreateTable";
import { TABLE_MESSAGES } from "../constants";

export const useTableUpsertHandler = ({
  onOpenMessage,
  onRefetch,
  onCloseModal,
}) => {
  const { create: createTable, isLoading: isCreating } = useCreateTable();

  const handleUpsert = useCallback(
    (values) => {
      createTable(values, {
        onSuccess: () => {
          onOpenMessage({
            type: "success",
            content: TABLE_MESSAGES.CREATE_SUCCESS(values.name),
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
    [createTable, onOpenMessage, onCloseModal, onRefetch],
  );

  return {
    handleUpsert,
    isLoading: isCreating,
  };
};
