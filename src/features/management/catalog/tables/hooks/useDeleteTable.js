import { QUERY_KEYS } from "../../../../../shared/constants";
import { invalidateCache, useMutation } from "../../../../../infrastructure";
import { deleteTable } from "../../api";

export const useDeleteTable = (options = {}) => {
  const { mutate, isLoading, error, mutatingVariables, reset } = useMutation(
    deleteTable,
    {
      ...options,
      onSuccess: (result, variables) => {
        invalidateCache(QUERY_KEYS.CATALOG.TABLES);
        options.onSuccess?.(result, variables);
      },
    },
  );

  return {
    remove: mutate,
    isDeleting: isLoading,
    error,
    mutatingVariables,
    reset,
  };
};
