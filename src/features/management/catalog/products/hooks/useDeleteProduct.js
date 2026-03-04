import { QUERY_KEYS } from "../../../../../shared/constants";
import { invalidateCache, useMutation } from "../../../../../infrastructure";
import { deleteProduct } from "../../api";

export const useDeleteProduct = (options = {}) => {
  const { mutate, isLoading, error, mutatingVariables, reset } = useMutation(
    deleteProduct,
    {
      ...options,
      onSuccess: (result, variables) => {
        invalidateCache(QUERY_KEYS.CATALOG.PRODUCTS);
        options.onSuccess?.(result, variables);
      },
    },
  );

  return {
    remove: mutate,
    isLoading,
    error,
    mutatingVariables,
    reset,
  };
};
