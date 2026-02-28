import { useState, useCallback, useRef, useEffect } from 'react';

export const useMutation = (mutationFn, options = {}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [mutatingVariables, setMutatingVariables] = useState(null);
    
    const isMounted = useRef(true);
    const optionsRef = useRef(options);
    const mutationFnRef = useRef(mutationFn);

    useEffect(() => {
        optionsRef.current = options;
        mutationFnRef.current = mutationFn;
    });

    useEffect(() => {
        isMounted.current = true;
        return () => { isMounted.current = false; };
    }, []);

    const mutate = useCallback(async (variables, callOptions = {}) => {
        setError(null);
        setIsLoading(true);
        setMutatingVariables(variables);

        try {
            optionsRef.current.onMutate?.(variables);
            callOptions.onMutate?.(variables);
            
            const result = await mutationFnRef.current(variables);
            
            if (isMounted.current) {
                setIsLoading(false);
                setMutatingVariables(null);

                optionsRef.current.onSuccess?.(result, variables);
                callOptions.onSuccess?.(result, variables);

                optionsRef.current.onSettled?.();
                callOptions.onSettled?.();
            }
            return result;
        } catch (err) {
            if (isMounted.current) {
                setIsLoading(false);
                setMutatingVariables(null);
                setError(err);

                optionsRef.current.onError?.(err, variables);
                callOptions.onError?.(err, variables);

                optionsRef.current.onSettled?.();
                callOptions.onSettled?.();
            }
            throw err;
        }
    }, []);

    const reset = useCallback(() => {
        setIsLoading(false);
        setError(null);
        setMutatingVariables(null);
    }, []);

    return { mutate, isLoading, error, mutatingVariables, reset };
};