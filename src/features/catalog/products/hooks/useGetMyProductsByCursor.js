import { useQuery } from "../../../../core";
import { QUERY_KEYS } from "../../../../constants";
import { getMyProductsByCursor } from "../../api";

export const useGetMyProductsByCursor = (filters = {}, options = {}) => {
    const queryKey = `${QUERY_KEYS.CATALOG.PRODUCTS}-cursor-${JSON.stringify(filters)}`;

    return useQuery(
        queryKey,
        async ({ signal }) => {
            const response = await getMyProductsByCursor(filters, { signal });
            return response;
        },
        {
            ttl: 2 * 60 * 1000,
            ...options,
        }
    );
};