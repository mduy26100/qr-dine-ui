import { QUERY_KEYS } from "../../../../../shared/constants";
import { invalidateCache, useMutation } from "../../../../../infrastructure";
import { createProduct } from "../../api";

export const useCreateProduct = (options = {}) => {
  const { mutate, isLoading, error, mutatingVariables, reset } = useMutation(
    createProduct,
    {
      ...options,
      onSuccess: (result, variables) => {
        invalidateCache(QUERY_KEYS.CATALOG.PRODUCTS);

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
