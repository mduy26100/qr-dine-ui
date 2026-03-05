import { QUERY_KEYS } from "../../../../../shared/constants";
import { invalidateCache, useMutation } from "../../../../../infrastructure";
import { updateTable } from "../../api";

export const useUpdateTable = (options = {}) => {
  const { mutate, isLoading, error, mutatingVariables, reset } = useMutation(
    updateTable,
    {
      ...options,
      onSuccess: (result, variables) => {
        invalidateCache(QUERY_KEYS.CATALOG.TABLES);

        options.onSuccess?.(result, variables);
      },
    },
  );

  return {
    update: mutate,
    isUpdating: isLoading,
    error,
    mutatingVariables,
    reset,
  };
};
