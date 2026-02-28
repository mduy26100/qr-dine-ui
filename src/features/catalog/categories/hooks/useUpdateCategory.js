import { QUERY_KEYS } from "../../../../constants";
import { invalidateCache, useMutation } from "../../../../core";
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