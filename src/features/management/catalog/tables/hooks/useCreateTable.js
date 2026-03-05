import { QUERY_KEYS } from "../../../../../shared/constants";
import { invalidateCache, useMutation } from "../../../../../infrastructure";
import { createTable } from "../../api";

export const useCreateTable = (options = {}) => {
  const { mutate, isLoading, error, mutatingVariables, reset } = useMutation(
    createTable,
    {
      ...options,
      onSuccess: (result, variables) => {
        invalidateCache(QUERY_KEYS.CATALOG.TABLES);

        options.onSuccess?.(result, variables);
      },
    },
  );

  return {
    create: mutate,
    isLoading,
    error,
    mutatingVariables,
    reset,
  };
};
