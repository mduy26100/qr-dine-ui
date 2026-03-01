import { useQuery } from "../../../../core";
import { QUERY_KEYS } from "../../../../constants";
import { getMyProductsByPage } from "../../api";

export const useGetMyProductsByPage = (filters = {}, options = {}) => {
    const queryKey = `${QUERY_KEYS?.CATALOG?.PRODUCTS || 'products'}-page-${JSON.stringify(filters)}`;
    
    return useQuery(
        queryKey,
        async ({ signal }) => {
            const response = await getMyProductsByPage(filters, { signal });
            return response;
        },
        {
            ttl: 2 * 60 * 1000,
            ...options,
        }
    );
};