import { QUERY_KEYS } from "../../../../constants";
import { invalidateCache, useMutation } from "../../../../core";
import { createCategory } from "../../api";

export const useCreateCategory = (options = {}) => {
    const { mutate, isLoading, error, mutatingVariables, reset } = useMutation(createCategory, {
        ...options,
        onSuccess: (result, variables) => {
            invalidateCache(QUERY_KEYS.CATALOG.CATEGORIES);
            
            options.onSuccess?.(result, variables);
        },
    });

    return { 
        create: mutate, 
        isLoading, 
        error, 
        mutatingVariables, 
        reset
    };
};