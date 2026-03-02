import { QUERY_KEYS } from "../../../../shared/constants";
import { invalidateCache, useMutation } from "../../../../infrastructure";
import { deleteCategory } from "../../api";

export const useDeleteCategory = (options = {}) => {
    const { mutate, isLoading, error, mutatingVariables, reset } = useMutation(deleteCategory, {
        ...options,
        onSuccess: (result, variables) => {
            invalidateCache(QUERY_KEYS.CATALOG.CATEGORIES);
            options.onSuccess?.(result, variables);
        },
    });

    return { 
        remove: mutate, 
        isDeleting: isLoading, 
        error, 
        mutatingVariables, 
        reset
    };
};