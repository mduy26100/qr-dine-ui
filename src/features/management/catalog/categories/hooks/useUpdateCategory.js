import { QUERY_KEYS } from "../../../../../shared/constants";
import { invalidateCache, useMutation } from "../../../../../infrastructure";
import { updateCategory } from "../../api";

export const useUpdateCategory = (options = {}) => {
    const { mutate, isLoading, error, mutatingVariables, reset } = useMutation(updateCategory, {
        ...options,
        onSuccess: (result, variables) => {
            invalidateCache(QUERY_KEYS.CATALOG.CATEGORIES);
            
            options.onSuccess?.(result, variables);
        },
    });

    return { 
        update: mutate, 
        isUpdating: isLoading, 
        error, 
        mutatingVariables, 
        reset
    };
};