import { QUERY_KEYS } from "../../../../constants";
import { invalidateCache, useMutation } from "../../../../core";
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