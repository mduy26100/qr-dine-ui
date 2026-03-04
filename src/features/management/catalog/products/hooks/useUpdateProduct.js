import { QUERY_KEYS } from "../../../../../shared/constants";
import { invalidateCache, useMutation } from "../../../../../infrastructure";
import { updateProduct } from "../../api";

export const useUpdateProduct = (options = {}) => {
  const { mutate, isLoading, error, mutatingVariables, reset } = useMutation(
    updateProduct,
    {
      ...options,
      onSuccess: (result, variables) => {
        invalidateCache(QUERY_KEYS.CATALOG.PRODUCTS);
        options.onSuccess?.(result, variables);
      },
    },
  );

  return {
    update: mutate,
    isLoading,
    error,
    mutatingVariables,
    reset,
  };
};
